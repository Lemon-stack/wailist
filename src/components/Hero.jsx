import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
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
    <motion.div className="w-full h-full flex flex-col m-0 justify-center pt-[20%] md:px-6 lg:pt-[12%]">
      <div className="flex flex-col items-start justify-center text-slate-50">
        <motion.h1
        initial={{opacity:0, y:-50}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5, ease:"easeOut", delay:0.1}}
         className="flex flex-col text-6xl md:text-7xl font-bold text-start">
          <span>Create a waitlist</span>

          <span className="flex flex-col sm:flex-row text-start items-start">
          <span>for your</span>
          <motion.span
          initial={{rotateZ:0}}
          animate={{rotateZ:4}}
          transition={{ease:"easeOut", delay:1.1}}
           className="rotate-2 mt-4 bg-brown ml-2 px-4 py-1 text-blk">Product</motion.span>
          </span>
        </motion.h1>
      
      <motion.p 
      initial={{opacity:0, y:30}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.5, ease:"easeOut", delay:0.3}}
      className="text-slate-50 text-start w-3/4 flex lg:w-1/2 mt-4 text-lg lg:text-xl">Start managing your product demand more effectively. Streamline the launch process 🚀</motion.p>
      </div>

  <div className="max-w-xl flex items-center mt-4">
  {/* <input type="text" className="py-3 px-4 block w-full border border-slate-50 text-slate-50 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent" placeholder=""/> */}
     <motion.button
     whileTap={{scale:0.9}}
     whileHover={{scale:1.1, backgroundColor:"#fff", color:"#da7e37"}}
      onClick={checkUser}
      disabled={isPending}
      className="bg-brown text-blk px-6 py-2 text-lg font-medium rounded-md flex justify-center items-center hover:border-2 hover:border-brown group">
        Start creating
        <svg className="w-5 h-5 text-blk ml-2 group-hover:text-brown" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
        </svg>

      </motion.button>
      </div>
    </motion.div>
  )
}
