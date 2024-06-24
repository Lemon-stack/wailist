import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

export default function Sidenav() {
  const { currentUser, logout } = useAuth()
  function signOut() {
    logout()
  }
  return (
    <>
      <div
        
        className="p-6 bg-blk text-slate-50 transition-all md:w-[25%] duration-300 transform hidden md:block fixed top-0 start-0 bottom-0 z-10 border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-brown"
      >
        <nav className="flex flex-col justify-between h-full text-sm font-medium pt-6 group-hover:text-brown">
          <div>
            <h2 className="text-start text-2xl font-bold -translate-y-6">Wailist <span className="text-brown">.</span></h2>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => {
                return isActive ? {} : {}
              }}
              className="flex items-center gap-3 w-full px-3 border-e border-slate-50 py-1 transition-all hover:border-brown hover:text-brown group"
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
          {/* bottom card */}
          <div className="lg:px-5">
            <div className="bg-slate-50/10 flex flex-col justify-center items-center py-4 lg:px-6 px-4 rounded-xl">
              <p className="border-2 p-1 rounded-full mb-2">
                <img
                  className="inline-block flex-shrink-0 size-10 md:size-10 lg:size-14 rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
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
