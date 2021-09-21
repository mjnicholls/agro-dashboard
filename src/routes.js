import React from "react";
import DashboardMain from "views/Dashboard.js";
// import Pricing from "views/pages/Pricing.js";
// import Register from "views/pages/Register.js";
// import User from "views/pages/User.js";
import Login from "views/pages/Login.js";
import PolygonNew from 'views/NewPolygon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faPlus, faSatellite, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import ApiKeys from 'views/personal-account/ApiKeys';

const routes = [
  {
    path: "/polygons",
    name: "Polygons",
    rtlName: "",
    icon: <FontAwesomeIcon icon={faListUl} />,
    component: DashboardMain,
    layout: "/dashboard",
    isFake: true,
    onclick: "all"
  },
  {
    path: "/polygons",
    name: "Satellite data & statistics",
    rtlName: "",
    icon: <FontAwesomeIcon icon={faSatellite} />,
    component: DashboardMain,
    layout: "/dashboard",
    isFake: true,
    onclick: "satellite"
  },
  {
    path: "/polygons",
    name: "Weather Data",
    rtlName: "",
    icon: <FontAwesomeIcon icon={faTemperatureLow} />,
    component: DashboardMain,
    layout: "/dashboard",
    isFake: true,
    onclick: "weather",
  },
  {
    path: "/new-polygon",
    name: "New Polygon",
    rtlName: "",
    icon: <FontAwesomeIcon icon={faPlus} />,
    component: PolygonNew,
    layout: "/dashboard",
  },
  {
    collapse: true,
    name: "Personal account",
    rtlName: "",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    // hidden: true,
    views: [
      {
        path: "/api-keys",
        name: "Api Keys",
        rtlName: "",
        mini: "A",
        rtlMini: "",
        component: ApiKeys,
        layout: "/dashboard",
      },
    ]
  },

  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    hidden: true,
    views: [
      // {
      //   path: "/pricing",
      //   name: "Pricing",
      //   rtlName: "عالتسعير",
      //   mini: "P",
      //   rtlMini: "ع",
      //   component: Pricing,
      //   layout: "/auth",
      // },
      {
        path: "/login",
        name: "Login",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: Login,
        layout: "/auth",
      },
      // {
      //   path: "/register",
      //   name: "Register",
      //   rtlName: "تسجيل",
      //   mini: "R",
      //   rtlMini: "صع",
      //   component: Register,
      //   layout: "/auth",
      // },
      // {
      //   path: "/user-profile",
      //   name: "User Profile",
      //   rtlName: "ملف تعريفي للمستخدم",
      //   mini: "UP",
      //   rtlMini: "شع",
      //   component: User,
      //   layout: "/admin",
      // },
    ],
  },
];

export default routes;
