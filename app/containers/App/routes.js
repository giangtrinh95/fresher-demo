import React from 'react';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Layouts from 'containers/Layouts/Loadable';
import Dashboard from 'containers/Dashboard';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const routes = [
  {
    path: '/dashboard',
    name: 'DashBoard',
    icon: <InboxIcon />,
    exact: false,
    role: 'admin',
    component: Dashboard,
  },
  {
    path: '/reports',
    name: 'reports',
    icon: <MailIcon />,
    exact: false,
    role: ['admin', 'member'],
    component: NotFoundPage,
  },
];
export default routes;
