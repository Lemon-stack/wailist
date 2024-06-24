import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../context/useAuth"
import { doc, setDoc, collection } from "firebase/firestore"
import Spinner from "./Spinner"
import { db } from "../../client/client"
export default function Modal({ onFormSubmit }) {
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const { currentUser } = useAuth()
  const [uid, setUid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid)
      setLoading(false)
    } else {
      setError("User is not authenticated.")
      setLoading(false)
    }
  }, [currentUser])

  const addProduct = useCallback(
    async (productName, productDescription) => {
      try {
        if (!uid) {
          throw new Error("User is not authenticated.")
        }

        const userRef = doc(db, "users", uid)
        await setDoc(userRef, {}, { merge: true })

        const productsRef = collection(userRef, "products")
        const newProductRef = doc(productsRef) // This creates a new auto-generated document ID

        await setDoc(newProductRef, {
          name: productName,
          description: productDescription,
          waitlist: { emails: [] }, // Initialize waitlist with empty array
        })

        setTimeout(() => {
          setSuccess("Product added successfully!")
        }, 1000)
      } catch (error) {
        setTimeout(() => {
          setError("Error adding product")
        }, 1000)
      }
    },
    [uid]
  )
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      await addProduct(name, description)
      setName("")
      setDescription("")
      onFormSubmit()
    },
    [addProduct, name, description, onFormSubmit]
  )

  if (loading) {
    return <Spinner />
  }
  return (
    <>
      {error && (
        <div className="absolute top-0 right-0 bg-red-600 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          {error}
        </div>
      )}
      {success && (
        <div className="absolute top-0 right-0 bg-green-600 z-40 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          {success}
        </div>
      )}
      <p className="w-full h-full absolute top-0 left-0 bg-gray-90 backdrop-blur-[1.5px] bg-opacity-10 z-20"></p>
      <div className="absolute z-30 w-full left-0 px-6 md:px-[30%] top-24 md:top-16">
        <motion.div
          initial={{ opacity: 0.8, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full text-blk bg-slate-50 rounded-lg px-6 py-4 z-20 shadow-lg"
        >
          <h2 className="text-start font-bold text-blk text-2xl mb-5">
            New List <span className="text-brown">.</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="productName"
                className="block text-md font-medium mb-2 text-start"
              >
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                className="block w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm outline-none placeholder-text-gray-400 focus:ring-2 focus:ring-brown focus:ring-offset-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productDescription"
                className="block text-md font-medium mb-2 text-start"
              >
                Description:
              </label>
              <textarea
                name="ProductDescription"
                rows={6}
                id="productDescription"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-text-gray-400 focus:ring-2 focus:ring-brown focus:ring-offset-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-brown text-white py-2 px-4 rounded-lg shadow-md hover:bg-brown-dark"
            >
              Create List
            </button>
          </form>
        </motion.div>
      </div>
    </>
  )
}
