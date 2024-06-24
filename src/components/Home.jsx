import { Outlet } from "react-router-dom"
import Sidenav from "./sub-components/Sidenav"
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
export default function Home() {
  // const navigate = useNavigate()

  // const [error, setError] = useState('');

  // async function handleLogout(e){
  //   e.preventDefault();
  //   try{
  //     const result = await logout()
  //     console.log(result)
  //     navigate('/login')
  //   }catch(error) {
  //     const errorMessage = error.message.match(/auth\/([^)]+)/);
  //     setError(errorMessage ? errorMessage[1] : 'An error occurred');
  //   }
  // }

  return (
    <>
      {/* {error && <div className="absolute top-0 right-0 bg-red-400 text-white px-8 lg:px-10 py-1 flex justify-center items-center">{error}</div>}
    <div>Home</div>
    <button
    onClick={handleLogout}
    className="bg-black text-white rounded-md px-8 py-2">Logout</button> */}
    

        <div className="flex">
          <div className="md:w-[20%] h-full hidden md:block">
            <Sidenav />
          </div>
          <div className="w-full md:w-[80%] bg-slate-50 h-screen">
            <Outlet />
          </div>
        </div>
    
    </>
  )
}
