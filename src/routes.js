import React from 'react'
// import Pricing from "views/pages/Pricing.js";
// import Register from "views/pages/Register.js";
// import User from "views/pages/User.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faListUl,
  faPlus,
  faSatellite,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons'
import DashboardMain from './views/Dashboard.js'
import Login from './views/pages/Login.js'
import PolygonNew from './views/NewPolygon'
import ApiKeys from './views/personal-account/ApiKeys'
import InvoiceList from './views/personal-account/Payments'

import AccountSettings from './views/personal-account/AccountSettings'
import AccountSettings2 from './views/personal-account/AccountSettings2'
import BillingPlans from './views/personal-account/BillingPlans'
import Subscription from './views/personal-account/Subscription'

const routes = [
  {
    path: '/polygons',
    name: 'Polygons',
    rtlName: '',
    icon: <FontAwesomeIcon icon={faListUl} />,
    component: DashboardMain,
    layout: '/dashboard',
    isFake: true,
    onclick: 'all',
  },
  {
    path: '/polygons',
    name: 'Satellite data & statistics',
    rtlName: '',
    icon: <FontAwesomeIcon icon={faSatellite} />,
    component: DashboardMain,
    layout: '/dashboard',
    isFake: true,
    onclick: 'satellite',
  },
  {
    path: '/polygons',
    name: 'Weather Data',
    rtlName: '',
    icon: <FontAwesomeIcon icon={faTemperatureLow} />,
    component: DashboardMain,
    layout: '/dashboard',
    isFake: true,
    onclick: 'weather',
  },
  {
    path: '/new-polygon',
    name: 'New Polygon',
    rtlName: '',
    icon: <FontAwesomeIcon icon={faPlus} />,
    component: PolygonNew,
    layout: '/dashboard',
  },
  {
    collapse: true,
    name: 'Personal account',
    rtlName: '',
    icon: 'tim-icons icon-image-02',
    state: 'pagesCollapse',
    // hidden: true,
    views: [
      {
        path: '/api-keys',
        name: 'Api Keys',
        rtlName: '',
        mini: 'A',
        rtlMini: '',
        component: ApiKeys,
        layout: '/account',
      },
      {
        path: '/payments',
        name: 'Invoices',
        rtlName: '',
        mini: 'I',
        rtlMini: '',
        component: InvoiceList,
        layout: '/account',
      },
      {
        path: '/account-settings',
        name: 'Account Settings',
        rtlName: '',
        mini: 'S',
        rtlMini: '',
        component: AccountSettings,
        layout: '/dashboard',
      },
      {
        path: '/account-settings-2',
        name: 'Account Settings 2',
        rtlName: '',
        mini: 'S',
        rtlMini: '',
        component: AccountSettings2,
        layout: '/account',
      },
      {
        path: '/billing-plans',
        name: 'Billing Plans',
        rtlName: '',
        mini: 'B',
        rtlMini: '',
        component: BillingPlans,
        layout: '/account',
      },
      {
        path: '/home',
        name: 'Subscription',
        rtlName: '',
        mini: 'A',
        rtlMini: '',
        component: Subscription,
        layout: '/account',
      },
    ],
  },

  {
    collapse: true,
    name: 'Pages',
    rtlName: 'صفحات',
    icon: 'tim-icons icon-image-02',
    state: 'pagesCollapse',
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
        path: '/login',
        name: 'Login',
        rtlName: 'هعذاتسجيل الدخول',
        mini: 'L',
        rtlMini: 'هعذا',
        component: Login,
        layout: '/auth',
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
]

export default routes
