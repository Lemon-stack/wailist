import { lazy } from 'react';

const Signup = lazy(() => import('./Signup'));
const Login = lazy(() => import('./Login'));
const PasswordReset = lazy(() => import('./PasswordReset'));

export {
  Signup,
  Login,
  PasswordReset,
};
