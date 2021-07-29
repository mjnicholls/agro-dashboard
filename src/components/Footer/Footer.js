import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

const Footer = (props) => {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="https://agromonitoring.com/">
              AgroMonitoring
            </a>
          </li>{" "}
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://agromonitoring.com/api/get"
            >
              API
            </a>
          </li>{" "}
          <li className="nav-item">
            <a className="nav-link" href="https://home.agromonitoring.com/">
              Account
            </a>
          </li>
        </ul>

        <div className="copyright">
          2012 - {new Date().getFullYear()}{" "}
          <a href="https://agromonitoring.com/" target="_blank">
             AgroMonitoring ©
          </a>{" "}
          All rights reserved
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
