import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../client/client"
import { motion } from "framer-motion"
import Spinner from "./Spinner"
export default function ListPrev() {
  const { userId, productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const emailRef = useRef()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (userId && productId) {
        const docRef = doc(db, `users/${userId}/products`, productId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProduct(docSnap.data())
        } else {
          console.log("No such document!")
        }
        setLoading(false)
      }
    }

    fetchProduct()
  }, [userId, productId])

  const addToWaitlist = async (email) => {
    const productRef = doc(db, `users/${userId}/products`, productId)
    const docSnap = await getDoc(productRef)
    if (docSnap.exists()) {
      const productData = docSnap.data()
      const existingEmails = productData.waitlist?.emails || []

      if (existingEmails.includes(email)) {
        setError("This email is already in the waitlist.")
      } else {
        try {
          await updateDoc(productRef, {
            "waitlist.emails": arrayUnion(email),
          })
          console.log("Email added to waitlist")
          setError(null)
        } catch (error) {
          console.error("Error adding email to waitlist: ", error)
          setError("Error adding email to waitlist")
        }
      }
    } else {
      console.log("No such document!")
      setError("No such product found.")
    }
  }

  if (loading) {
    return <Spinner/>
  }

  return (
    <div className="py-6 px-8 md:px-14 rounded-md h-full w-full flex justify-center items-center">
      {product ? (
        <div className="relative flex flex-col justify-center w-full shadow-md min-w-[23rem] min-h-12 md:min-h-72 md:max-w-[55%] rounded-md py-3 px-4 md:px-8">
          <div>
            <motion.h1
              initial={{ rotateZ: 0 }}
              animate={{ rotateZ: 2 }}
              transition={{ ease: "easeOut", delay: 1.1 }}
              className="md:text-md absolute top-5 text-start font-semibold text-slate-50 rounded-md px-4 py-1 bg-blk"
            >
              Join the waitlist
            </motion.h1>
            <h2 className="text-4xl md:text-4xl mt-14 font-bold text-brown">
              {product.name}
            </h2>
            <p className="text-md px-4 mb-10 mt-1 md:mt-3 md:mb-4">
              {product.description}
            </p>
          </div>
          {error && (
            <p className="bg-red-500 text-slate-50 rounded-md my-2 mx-auto px-4 py-0.5 text-center">
              {error}
            </p>
          )}
          <form
            className="mb-8 flex justify-center"
            onSubmit={(e) => {
              e.preventDefault()
              const email = emailRef.current.value
              addToWaitlist(email)
            }}
          >
            <input
              ref={emailRef}
              placeholder="user@gmail.com"
              className="w-[58%] rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-brown focus:ring-offset-1"
              type="email"
              required
            />
            <button
              type="submit"
              className="bg-brown text-slate-50 text-lg ml-1 px-6 py-1 border-brown border-2 rounded-md"
            >
              Join
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center md:mt-14">
          <svg
            className="w-14 md:w-32 h-14 md:h-32 text-blk"
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
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
          <h3 className="text-3xl text-brown font-bold">Ooops!!!</h3>
          <p className="text-blk text-lg">Product not found</p>
        </div>
      )}
    </div>
  )
}
