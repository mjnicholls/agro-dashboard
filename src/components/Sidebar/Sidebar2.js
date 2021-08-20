import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav, Collapse } from "reactstrap";
import {setActivePoly, setSatelliteMode} from "../../features/state/actions";
var ps;

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

const Sidebar = (props) => {

  const activePolygon = useSelector(selectActivePoly);
  const dispatch = useDispatch();
  const polygons = useSelector(selectPolygons);
  const isSatelliteMode = useSelector(selectIsSatelliteMode);

  const [state, setState] = React.useState({});
  const sidebarRef = React.useRef(null);
  const location = useLocation();
  React.useEffect(() => {
    setState(getCollapseStates(props.routes));
  }, []);
  React.useEffect(() => {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      // we need to destroy the false scrollbar when we navigate
      // to a page that doesn't have this component rendered
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  // this creates the intial state of this component based on the collapse routes
  // that it gets through props.routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {

    const { rtlActive } = props;

    const onClickAction = (prop) => {
      /** Define actions for menu items without a page */
      if (prop.onclick) {
        if (prop.onclick === "all") {
          dispatch(setActivePoly(null))
          dispatch(setSatelliteMode(true))
          if (location.pathname !== prop.layout + prop.path) {
            props.history.push(prop.layout + prop.path)
          }
        }
        else if (prop.onclick === "satellite") {
          if (location.pathname !== prop.layout + prop.path) {
            props.history.push(prop.layout + prop.path)
          }
          if (!activePolygon && polygons.length) {
            dispatch(setActivePoly(polygons[0]))
          }
          if (!isSatelliteMode && polygons.length) {
            dispatch(setSatelliteMode(true))
          }
        }
        else if (prop.onclick === "weather") {
          if (location.pathname !== prop.layout + prop.path) {
            props.history.push(prop.layout + prop.path)
          }
          if (!activePolygon && polygons.length) {
            dispatch(setActivePoly(polygons[0]))
          }
          if (isSatelliteMode) {
            dispatch(setSatelliteMode(false))
          }
        }
      }
    }

    return routes.map((prop, key) => {

      if (prop.redirect || prop.hidden) {
        return null;
      }
      if (prop.collapse) {
        // pages
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <li
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, ...st });
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  {(typeof prop.icon === "string") ? <i className={prop.icon} /> : <i>{prop.icon}</i>}
                  <p>
                    {rtlActive ? prop.rtlName : prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">
                    {rtlActive ? prop.rtlMini : prop.mini}
                  </span>
                  <span className="sidebar-normal">
                    {rtlActive ? prop.rtlName : prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={state[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }

      return (
        <li
          // className={activeRoute(prop.layout + prop.path)}
          className={activeRouteCustom(prop)}

          key={key}>

          {prop.isFake ?
            (!polygons.length && (prop.onclick === "weather" || prop.onclick === "satellite")) ? null :
            <a onClick={() => {
              onClickAction(prop);
              props.closeSidebar();
            }}>
              {(typeof prop.icon === "string") ? <i className={prop.icon} /> : <i>{prop.icon}</i>}
              <p>{rtlActive ? prop.rtlName : prop.name}</p>
            </a>
            : <NavLink
                to={prop.layout + prop.path}
                activeClassName=""
                onClick={props.closeSidebar}
              >
            {prop.icon !== undefined ?
              (
              <>
                {(typeof prop.icon === "string") ? <i className={prop.icon} /> : <i>{prop.icon}</i>}
                <p>{rtlActive ? prop.rtlName : prop.name}</p>
              </>
            )
              : (
              <>
                <span className="sidebar-mini-icon">
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
                <span className="sidebar-normal">
                  {rtlActive ? prop.rtlName : prop.name}
                </span>
              </>
            )}
          </NavLink>

          }


        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  // const activeRoute = (routeName) => {
  //   return location.pathname === routeName ? "active" : "";
  // };

  const activeRouteCustom = (prop) => {
    let routeName = prop.layout + prop.path;
    if (location.pathname !== routeName) {
      return ""
    } else if (location.pathname === routeName && !prop.onclick) {
      return "active"
    }
    if (prop.onclick === "all") {
      return activePolygon ? "" : "active";
    }
    if (prop.onclick === "satellite") {
       return (activePolygon && isSatelliteMode) ? "active" : ""
    }
    if (prop.onclick === "weather") {
       return (activePolygon && !isSatelliteMode) ? "active" : ""
    }
  }

  const { activeColor, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          rel="noreferrer"
          onClick={props.closeSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          rel="noreferrer"
          onClick={props.closeSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.closeSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </NavLink>
      );
      logoText = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.closeSidebar}
        >
          {logo.text}
        </NavLink>
      );
    }
  }
  return (
    <div className="sidebar" data={activeColor}>
      <div className="sidebar-wrapper" ref={sidebarRef}>
        {logoImg !== null || logoText !== null ? (
          <div className="logo" style={{paddingLeft: "30px"}}>
            {/*{logoImg}*/}
            {logoText}
          </div>
        ) : null}
        <Nav>
          {createLinks(props.routes)}
           {/*<li>*/}
            {/*<a*/}
              {/*onClick={() => {*/}
                {/*props.closeSidebar();*/}
                {/*dispatch(setActivePoly(polygons[0]))*/}
              {/*} }*/}
            {/*>*/}
              {/*<>*/}
                {/*<i className="tim-icons icon-image-02"/>*/}
                {/*<p>Satellite data & Statistics</p>*/}
              {/*</>*/}
            {/*</a>*/}
          {/*</li>*/}
          {/*<li>*/}
            {/*<a*/}
              {/*onClick={() => {*/}
                {/*props.closeSidebar();*/}
                {/*dispatch(setActivePoly(polygons[0]))*/}
              {/*} }*/}
            {/*>*/}
              {/*<>*/}
                {/*<i className="tim-icons icon-chart-pie-36"/>*/}
                {/*<p>Weather data</p>*/}
              {/*</>*/}
            {/*</a>*/}
          {/*</li>*/}
        </Nav>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeColor: PropTypes.oneOf(["primary", "blue", "green", "orange", "red"]),
  rtlActive: PropTypes.bool,
  routes: PropTypes.array.isRequired,
  logo: PropTypes.oneOfType([
    PropTypes.shape({
      innerLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      outterLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ]),
  // this is used on responsive to close the sidebar on route navigation
  closeSidebar: PropTypes.func,
};

export default Sidebar;
