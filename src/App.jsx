import "./App.css"
import { Suspense, lazy } from "react"
import AuthProvider from "./context/Authcontext"
import { Routes, Route, Outlet } from "react-router-dom"
import { Signup, Login, PasswordReset } from "./auth/index"
import { Home, Container, Hero, Notfound, Lists, ListPrev } from "./components"
import PrivateRoute from "./context/PrivateRoute"
import Spinner from "./components/sub-components/Spinner"
const EmailsJoined = lazy(()=> import('./components/sub-components/EmailsJoined'))

function App() {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Container />}>
              <Route index element={<Hero />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="password-reset" element={<PasswordReset />} />
              <Route
                path="dashboard"
                element={<PrivateRoute element={<Outlet />} />}
              >
                <Route path="" element={<Home />}>
                  <Route index element={<Lists />} />
                  <Route path="product/:userId/:productId" element={<EmailsJoined/>} />
                </Route>
              </Route>
              <Route path="w/:userId/:productId" element={<ListPrev />} />
              <Route path="*" element={<Notfound />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  )
}

export default App
