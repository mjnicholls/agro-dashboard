import React from 'react'

import {
  faListUl,
  faMapMarkerAlt,
  faPlus,
  faSatellite,
  faTemperatureLow,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ResetPassword from './views/auth/ChangePassword'
import ConfirmEmail from './views/auth/ConfirmEmail'
import ForgotPassword from './views/auth/ForgotPassword'
import Login from './views/auth/Login'
import RegisterForm from './views/auth/Registration'
import CropMap from './views/CropMap'
import DashboardMain from './views/Dashboard'
import PolygonNew from './views/NewPolygon'
import ApiKeys from './views/personal-account/ApiKeys'
import BillingPlans from './views/personal-account/BillingPlans'
import InvoiceList from './views/personal-account/Payments'
import Settings from './views/personal-account/settings/Settings'
import FailurePage from './views/personal-account/subscription-form/FailurePage'
import SuccessPage from './views/personal-account/subscription-form/SuccessPage'
import Subscription from './views/personal-account/subscription/SubscriptionPage-2-1'

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
  {
    collapse: true,
    name: 'My account',
    rtlName: '',
    icon: <FontAwesomeIcon icon={faUser} />,
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
        layout: '/users',
      },
      {
        path: '/home',
        name: 'Subscription',
        rtlName: '',
        mini: 'S',
        rtlMini: '',
        component: Subscription,
        layout: '/users',
      },

      {
        path: '/billing-plans',
        name: 'Billing Plans',
        rtlName: '',
        mini: 'B',
        rtlMini: '',
        component: BillingPlans,
        layout: '/users',
      },
      {
        path: '/payments',
        name: 'Invoices',
        rtlName: '',
        mini: 'I',
        rtlMini: '',
        component: InvoiceList,
        layout: '/users',
      },
      {
        path: '/account-settings',
        name: 'Settings',
        rtlName: '',
        mini: 'S',
        rtlMini: '',
        component: Settings,
        layout: '/users',
      },
      {
        path: '/subscription/success',
        name: 'Success',
        rtlName: '',
        mini: 'I',
        rtlMini: '',
        component: SuccessPage,
        layout: '/users',
        hidden: true,
      },
      {
        path: '/subscription/failure',
        name: 'Failure',
        rtlName: '',
        mini: 'I',
        rtlMini: '',
        component: FailurePage,
        layout: '/users',
        hidden: true,
      },
    ],
  },
  {
    collapse: true,
    name: 'Pages',
    rtlName: '',
    icon: 'tim-icons icon-image-02',
    state: 'pagesCollapse',
    hidden: true,
    views: [
      {
        path: '/login',
        name: 'Login',
        rtlName: '',
        mini: 'L',
        rtlMini: '',
        component: Login,
        layout: '/auth',
      },

      {
        path: '/sign-up',
        name: 'Register',
        rtlName: '',
        mini: 'L',
        rtlMini: '',
        component: RegisterForm,
        layout: '/auth',
      },
      {
        path: '/forgot-password',
        name: 'Forgot Password',
        rtlName: '',
        mini: 'F',
        rtlMini: '',
        component: ForgotPassword,
        layout: '/auth',
      },
      {
        path: '/password/edit',
        name: 'Change Password',
        rtlName: '',
        mini: 'R',
        rtlMini: '',
        component: ResetPassword,
        layout: '/auth',
      },
      {
        path: '/confirmation',
        name: 'Confirm email',
        rtlName: '',
        mini: 'R',
        rtlMini: '',
        component: ConfirmEmail,
        layout: '/auth',
      },
    ],
  },
]

export default routes
