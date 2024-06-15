import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import { useTransition } from "react";
export default function Hero() {
   const navigate = useNavigate()
  const {currentUser} = useAuth()
  const [isPending, startTransition] = useTransition();

  function checkUser() {
    startTransition(() => {
      if (currentUser) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    });
  }
  return (
    // streamline your product's launch waitlist
    <div className="w-full h-full flex flex-col m-0 justify-center pt-[20%] px-6 lg:pt-[12%]">

      <div className="flex flex-col items-start justify-center text-slate-50">
      <h2 className="text-6xl lg:text-7xl font-bold">Create a waitlist</h2>
      <h2 className="text-6xl flex justify-center items-center lg:text-7xl font-bold">for your<span className="flex items-center justify-center ml-3 bg-brown p-2 rotate-2 text-blk">product.</span></h2>
      <p className="text-slate-50 text-start w-2/3 lg:w-1/2 mt-4 text-lg lg:text-xl">Start managing your product demand more effectively. Enter the name of your product below to create a new waitlist.</p>
      </div>

  <div className="max-w-xl flex items-center mt-4">
  {/* <input type="text" className="py-3 px-4 block w-full border border-slate-50 text-slate-50 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent" placeholder=""/> */}
     <button
      onClick={checkUser}
      disabled={isPending}
      className="bg-brown text-blk px-6 py-2 text-lg font-medium rounded-md flex justify-center items-center">
        Start creating
        <svg className="w-5 h-5 text-blk ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
        </svg>

      </button>
      </div>
    </div>
  )
}
