import React from 'react'

import {
  faListUl,
  faMapMarkerAlt,
  faPlus,
  faSatellite,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CropMap from './views/CropMap'
import DashboardMain from './views/Dashboard'
import PolygonNew from './views/NewPolygon'
import Login from './views/pages/Login'
// import AccountSettings from './views/personal-account/AccountSettings'
// import ApiKeys from './views/personal-account/ApiKeys'
// import BillingPlans from './views/personal-account/BillingPlans'
// import InvoiceList from './views/personal-account/Payments'
// import RegisterForm from './views/personal-account/Registration'
// import ResetPass from './views/personal-account/ResetPassword'
// import Subscription from './views/personal-account/Subscription'
// import Subscription2 from './views/personal-account/Subscription2'

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
    path: '/map',
    name: 'Crop Map',
    rtlName: '',
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
    component: CropMap,
    layout: '/dashboard',
  },
  // {
  //   collapse: true,
  //   name: 'Personal account',
  //   rtlName: '',
  //   icon: 'tim-icons icon-image-02',
  //   state: 'pagesCollapse',
  //   // hidden: true,
  //   views: [
  //     {
  //       path: '/api-keys',
  //       name: 'Api Keys',
  //       rtlName: '',
  //       mini: 'A',
  //       rtlMini: '',
  //       component: ApiKeys,
  //       layout: '/dashboard',
  //     },
  //     {
  //       path: '/payments',
  //       name: 'Invoices',
  //       rtlName: '',
  //       mini: 'I',
  //       rtlMini: '',
  //       component: InvoiceList,
  //       layout: '/dashboard',
  //     },
  //     {
  //       path: '/account-settings',
  //       name: 'Account Settings',
  //       rtlName: '',
  //       mini: 'S',
  //       rtlMini: '',
  //       component: AccountSettings,
  //       layout: '/dashboard',
  //     },
  //     {
  //       path: '/billing-plans',
  //       name: 'Billing Plans',
  //       rtlName: '',
  //       mini: 'B',
  //       rtlMini: '',
  //       component: BillingPlans,
  //       layout: '/dashboard',
  //     },
  //     {
  //       path: '/home',
  //       name: 'Subscription',
  //       rtlName: '',
  //       mini: 'A',
  //       rtlMini: '',
  //       component: Subscription,
  //       layout: '/dashboard',
  //     },
  //     {
  //       path: '/subscription2',
  //       name: 'Subscription2',
  //       rtlName: '',
  //       mini: 'A',
  //       rtlMini: '',
  //       component: Subscription2,
  //       layout: '/dashboard',
  //     },
  //   ],
  // },

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
        rtlName: '',
        mini: 'L',
        rtlMini: 'هعذا',
        component: Login,
        layout: '/auth',
      },

      // {
      //   path: '/register',
      //   name: 'Register',
      //   rtlName: '',
      //   mini: 'L',
      //   rtlMini: 'هعذا',
      //   component: RegisterForm,
      //   layout: '/auth',
      // },
      //
      // {
      //   path: '/reset-password',
      //   name: 'Reset Password',
      //   rtlName: '',
      //   mini: 'R',
      //   rtlMini: '',
      //   component: ResetPass,
      //   layout: '/auth',
      // },
    ],
  },
]

export default routes
