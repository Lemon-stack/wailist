import { lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Container = lazy(() => import('./Container'));
const Hero = lazy(() => import('./Hero'));
const PrivateRoutesContainer = lazy(() => import('./PrivateRoutesContainer'));
const Notfound = lazy(() => import('./Notfound'));
const Lists = lazy(() => import('./Lists'));

export {
  Home,
  Container,
  Hero,
  PrivateRoutesContainer,
  Notfound,
  Lists,
};
