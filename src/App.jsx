import './App.css'
import { Suspense } from 'react';
import AuthProvider from './context/Authcontext';
import {Routes, Route} from 'react-router-dom';
import { Signup, Login, PasswordReset} from './auth/index'
import {
  Home,
  Container,
  Hero,
  PrivateRoutesContainer,
  Notfound,
  Lists,
} from './components';
import PrivateRoute from './context/PrivateRoute';
import Spinner from './components/sub-components/Spinner';
function App() {

  return (
    <>
    <AuthProvider>
        <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path="/" element={<Container />}>
         <Route index element={<Hero />}/>
         <Route path="signup" element={<Signup />}/>
         <Route path="login" element={<Login />}/>
         <Route path="password-reset" element={<PasswordReset />}/>
         <Route path="dashboard" element={<PrivateRoute element={<PrivateRoutesContainer/>}/>}>
           <Route path='' element={<Home/>}>
           <Route index element={<Lists/>}/>
           </Route>
         </Route>
         <Route path="*" element={<Notfound />}/>
        </Route>
      </Routes> 
        </Suspense>
    </AuthProvider>

    </>
  )
}

export default App
