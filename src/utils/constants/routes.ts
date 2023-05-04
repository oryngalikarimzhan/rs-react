import { About, Users, Home } from 'pages';

export const routes = [
  {
    path: '/',
    component: Home,
    title: 'movies',
  },
  {
    path: '/about',
    component: About,
    title: 'about us',
  },
  {
    path: '/userform',
    component: Users,
    title: 'user form & cards',
  },
];
