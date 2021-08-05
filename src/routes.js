import DashboardMain from "views/DashboardInteractive.js";
import PolygonSatellite from "views/PolygonSatellite.js";
import Pricing from "views/pages/Pricing.js";
import Register from "views/pages/Register.js";
import User from "views/pages/User.js";
import Login from "views/pages/Login.js";
import Lock from "views/pages/Lock.js";
import PolygonNew from 'views/PolygonNew';

const routes = [
  // {
  //   path: "/polygons/:id",
  //   name: "Polygon Satellite",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-image-02",
  //   component: DashboardMain,
  //   layout: "/dashboard",
  //   hidden: true
  // },
  {
    path: "/polygons",
    name: "My polygons",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-bullet-list-67",
    component: DashboardMain,
    layout: "/dashboard",
    // onclick: "all"
  },
  {
    path: "/create",
    name: "Create Polygon",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-simple-add",
    component: PolygonNew,
    layout: "/dashboard",
  },
  // {
  //   path: "/polygons",
  //   name: "Satellite data & statistics",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-image-02",
  //   component: DashboardMain,
  //   layout: "/no-url",
  //   onclick: "satellite"
  // },
  // {
  //   path: "/polygons",
  //   name: "Weather Data",
  //   rtlName: "لوحة القيادة",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: DashboardMain,
  //   layout: "/dashboard",
  //   onclick: "weather"
  // },
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
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
      //   path: "/lock-screen",
      //   name: "Lock Screen",
      //   rtlName: "اقفل الشاشة",
      //   mini: "LS",
      //   rtlMini: "هذاع",
      //   component: Lock,
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
