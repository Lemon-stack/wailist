import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/useAuth"
import { motion } from "framer-motion"

export default function Sidenav() {
  const { currentUser, logout } = useAuth()
  function signOut() {
    logout()
  }
  return (
    <>
      <div
        id="sidebar-mini"
        className="p-6 rounded-e-lg transition-all bg-slate-100 duration-300 transform hidden md:block fixed top-0 start-0 bottom-0 z-10 md:w-[30%] lg:w-[30%] border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-brown"
      >
        <div className="bg-white/20 h-full pb-12">
          <div className="flex items-center md:flex-col lg:flex-row md:items-start">
            <img
              className="inline-block flex-shrink-0 size-10 md:size-8 lg:size-10 rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="User Avatar"
            />
            <div className="ms-3 md:ms-0 lg:ms-3 flex flex-col">
              <h3 className="font-semibold text-brown text-start">
                {currentUser.displayName}
              </h3>
              <p className="text-sm md:text-[13px] lg:text-sm font-medium text-slate-400 text-start">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="w-full h-full">
            <nav className="flex flex-col justify-between h-full text-sm font-medium pt-6 group-hover:text-brown">
              <div>
                {/* <Link
                href="#"
                className="flex items-center mb-2 gap-3 border border-brown w-full text-brown rounded-lg px-3 py-2 transition-all hover:text-slate-50 hover:border-brown hover:bg-brown group"
              >
                <svg
                  className="w-6 h-6 text-brown group-hover:text-slate-50"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
                  />
                </svg>
                Dashboard
              </Link> */}
                <NavLink
                  to="/dashboard"
                  style={({ isActive }) => {
                    return isActive ? {} : {}
                  }}
                  className="flex items-center gap-3 w-full border border-brown text-brown rounded-lg px-3 py-2 transition-all hover:text-slate-50 hover:border-brown hover:bg-brown group"
                >
                  <svg
                    className="w-6 h-6 text-brown group-hover:text-slate-50 active:text-slate-50"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
                    />
                  </svg>
                  Lists
                </NavLink>
              </div>
              <div className="flex flex-col justify-center">
                <div className="border-2 p-5 rounded-md flex flex-col justify-center items-center border-brown mb-4">
                  <motion.svg
                    animate={{ rotate: 90 }}
                    transition={{
                      default: {
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1,
                        repeat: Infinity,
                      },
                    }}
                    className="w-10 h-10 text-brown text-start"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    />
                  </motion.svg>

                  <h3 className="text-lg text-brown font-semibold">
                    More Features coming soon...
                  </h3>
                  <span>working on more updates⚡</span>
                </div>
                <div
                  onClick={() => signOut()}
                  className="flex items-center justify-self-end gap-3 mt-auto mb-6 w-full border border-brown bg-brown text-slate-50 rounded-lg px-3 py-2 transition-all hover:text-brown hover:border-brown hover:bg-slate-50 group"
                >
                  <svg
                    className="w-6 h-6 text-slate-50 group-hover:text-brown"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                    />
                  </svg>
                  Signout
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* End Sidebar */}
    </>
  )
}
