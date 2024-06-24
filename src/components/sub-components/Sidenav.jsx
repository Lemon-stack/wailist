import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

export default function Sidenav() {
  const { currentUser, logout } = useAuth()
  function signOut() {
    logout()
  }
  return (
    <>
      <div className="p-6 bg-blk text-slate-50 transition-all md:w-[25%] duration-300 transform hidden md:block fixed top-0 start-0 bottom-0 z-10 border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-brown">
        <nav className="flex flex-col justify-between h-full text-sm font-medium pt-6 group-hover:text-brown">
          <div>
            <h2 className="text-start text-2xl font-bold -translate-y-6">
              Wailist <span className="text-brown">.</span>
            </h2>
            <NavLink
              to="#"
              style={({ isActive }) => {
                return isActive ? {} : {}
              }}
              className="flex items-center gap-3 w-full px-3 border-e border-slate-50 py-2 transition-all hover:border-brown hover:text-brown group"
            >
              <svg
                className="w-6 h-6 text-slate-50 active:text-slate-50 group-hover:text-brown"
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
                  strokeWidth="1.4"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Profile
            </NavLink>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => {
                return isActive ? {} : {}
              }}
              className="flex items-center gap-3 w-full px-3 border-e border-slate-50 py-2 transition-all hover:border-brown hover:text-brown group"
            >
              <svg
                className="w-6 h-6 text-slate-50 active:text-slate-50 group-hover:text-brown"
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

          <div className="flex justify-center items-center mt-auto mb-2 rounded-xl mx-5 py-1 bg-slate-50/10">
            <p>More features coming...</p>
            <svg
              className="w-6 h-6 text-brown animate-spin"
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
                d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
            </svg>
          </div>
          {/* bottom card */}
          <div className="lg:px-5">
            <div className="bg-slate-50/10 flex flex-col justify-center items-center py-4 lg:px-6 px-4 rounded-xl">
              <p className="border-2 p-1 rounded-full mb-2">
                <img
                  className="inline-block flex-shrink-0 size-10 md:size-10 lg:size-14 rounded-full"
                  src="/user.svg"
                  alt="User Avatar"
                />
              </p>
              <h3 className="text-brown font-bold text-md -mb-1 md:mb-0">
                {currentUser.displayName}
              </h3>
              <p className="text-[0.56rem] lg:text-[0.76rem] font-light md:mb-2 lg:mb-4">
                {currentUser.email}
              </p>
              <button
                onClick={() => signOut()}
                className="w-full py-2 flex justify-center items-center rounded-xl bg-blk"
              >
                Signout
                <svg
                  className="w-4 h-4 ml-2 text-slate-50"
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
              </button>
            </div>
          </div>
        </nav>
      </div>
      {/* End Sidebar */}
    </>
  )
}
