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
    exact: true,
    role: 'admin',
    layout: Layouts,
    component: Dashboard,
  },
  {
    path: '/report',
    name: 'Report',
    icon: <MailIcon />,
    exact: true,
    role: ['admin', 'member'],
    layout: Layouts,
    component: NotFoundPage,
  },
];
export default routes;
