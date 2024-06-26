import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export default function Login() {
  const [error, setError] = useState("")
  const emailRef = useRef()
  const passwordRef = useRef()

  const navigate = useNavigate()
  const { login, googleSignin, currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/dashboard")
    } catch (error) {
      const errorMessage =
        error.message.match(/auth\/([^)]+)/)[1] ?? "An error occured"
        setTimeout(() => {
          setError(errorMessage)
        }, 1000)
    }
  }

  async function SigninWithGoogle(e) {
    e.preventDefault()
    try {
      await googleSignin()
      navigate("/dashboard")
    } catch (error) {
      const errorMessage =
        error.message.match(/auth\/([^)]+)/)[1] ?? "An eror occured"
     
        setTimeout(() => {
          setError(errorMessage)
        }, 1000)
        
    }
  }

  
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  
  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div className="absolute z-40 top-0 right-0 bg-red-600 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          {error}
        </div>
      )}
      <div className="relative lg:p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative mt-10 bg-white rounded-lg shadow -mx-4 md:mx-0">
          <div className="p-5">
            <p className="mb-4 text-sm font-normal text-gray-800" />
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-blk">
                Login to your account <span className="text-brown">.</span>
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-2">
              {/* <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="h-[18px] w-[18px] "
              />
              Continue with GitHub
            </button> */}
              <button
                onClick={SigninWithGoogle}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-1 focus:ring-brown focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px] "
                />
                Continue with Google
              </button>
              {/* <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
                alt="Google"
                className="h-[18px] w-[18px] "
              />
              Continue with LinkedIn
            </button> */}
            </div>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200" />
              OR
              <div className="h-px w-full bg-slate-200" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-start"
            >
              <label htmlFor="email" className="mb-2">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                defaultValue=""
                ref={emailRef}
              />
              <label htmlFor="password" className="mt-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required=""
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-brown focus:ring-offset-1"
                placeholder="Password"
                defaultValue=""
                ref={passwordRef}
              />
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a
                  href="/password-reset"
                  className="text-blue-800 hover:text-blue-600"
                >
                  Forgot password?
                </a>
              </p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-brown p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-brown focus:ring-offset-1 disabled:bg-gray-400"
              >
                Continue
              </motion.button>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600">
              Dont have an account?
              <a href="/signup" className="font-light ml-1 text-gray-800">
                Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
