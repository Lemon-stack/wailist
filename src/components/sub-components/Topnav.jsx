import { useAuth } from "../../context/useAuth"
import { useState, useEffect, useCallback } from "react"
import { doc, setDoc, collection } from "firebase/firestore"
import { db } from "../../client/client"
import Spinner from "./Spinner"
import { motion } from "framer-motion"

export default function Topnav() {
  const { currentUser, logout } = useAuth()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [uid, setUid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isRotated, setIsRotated] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid)
      setLoading(false)
    } else {
      setError("User is not authenticated.")
      setLoading(false)
    }

    // const handleClickOutside = (event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //       setIsModalOpen(false);
    //     }
    //     if (dropRef.current && !dropRef.current.contains(event.target)) {
    //       setIsDropdownOpen(false);
    //     }
    //   };

    //   document.addEventListener('mousedown', handleClickOutside);

    //   return () => {
    //     document.removeEventListener('mousedown', handleClickOutside);
    //   };
    
  }, [currentUser])

  const addProduct = useCallback(
    async (productName, productDescription) => {
      try {
        if (!uid) {
          throw new Error("User is not authenticated.")
        }

        const userRef = doc(db, "users", uid)
        await setDoc(
          userRef,
          {
            /* any initial data if needed */
          },
          { merge: true }
        )

        const productsRef = collection(userRef, "products")
        const newProductRef = doc(productsRef) // This creates a new auto-generated document ID

        await setDoc(newProductRef, {
          name: productName,
          description: productDescription,
          waitlist: { emails: [] }, // Initialize waitlist with empty array
        })

        console.log("Product added successfully!")
      } catch (error) {
        console.error("Error adding product: ", error)
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
      setIsModalOpen(false)
      setIsRotated(false)
    },
    [addProduct, name, description]
  )

  const handleToggleModal = useCallback(() => {
    setIsRotated((prev) => !prev)
    setIsModalOpen((prev) => !prev)
    setIsDropdownOpen(false)
  }, [])
  // rotate the create boutton

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  function signOut() {
    logout()
  }

  return (
    <div className="text-slate-50 w-full h-full">
      <div className="group flex justify-between">
        <div className="flex items-center md:hidden">
          <img
            className="inline-block flex-shrink-0 size-10 rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="User Avatar"
          />
          <div className="ms-3 flex flex-col">
            <h3 className="font-semibold text-brown text-start">
              {currentUser.displayName}
            </h3>
            <p className="text-sm font-medium text-slate-400 text-start">
              {currentUser.email}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="mr-4 md:hidden">
            <div className="absolute right-[5.4rem] top-9 z-30 ">
              <svg
                onClick={() => {
                    setIsDropdownOpen((prev) => !prev)
                    setIsModalOpen(false)
                    setIsRotated(false)
                }}
                className="w-9 h-9 text-brown"
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
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </div>

            {isDropdownOpen && (
              <>
                <p className="w-full h-full absolute top-0 left-0 bg-gray-90 backdrop-blur-[1.5px] bg-opacity-10 z-20"></p>

                <div className="absolute z-30 shadow-md top-20 right-24 flex flex-col bg-slate-50 p-1 text-blk rounded-md text-md">
                  <span
                    onClick={() => signOut()}
                    className="hover:bg-slate-200/50 flex justify-between items-center w-full mb-1 px-8 py-2 rounded-md"
                  >
                    Logout
                    <svg
                      className="w-5 h-5 ml-3 text-brown"
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
                  </span>
                  <span className="hover:bg-slate-200/50 w-full px-10 py-2 rounded-md">
                    Lists
                  </span>
                </div>
              </>
            )}
          </div>
          <div
            className={`relative bg-brown p-2 z-30 rounded-full flex justify-center md:absolute md:top-8 md:right-9 items-center cursor-pointer rotating-element ${isRotated ? "rotated" : ""}`}
            onClick={() => handleToggleModal()}
          >
            <p className="sr-only">create list</p>
            <svg
              className="w-6 h-6 text-blk"
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
                d="M5 12h14m-7 7V5"
              />
            </svg>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <p className="w-full h-full absolute top-0 left-0 bg-gray-90 backdrop-blur-[1.5px] bg-opacity-10 z-20"></p>

          <motion.div
            initial={{ opacity: 0.8, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute right-[17%] w-[65%] md:w-[45%] text-blk bg-slate-50 rounded-lg px-6 py-4 z-20 shadow-lg"
          >
            <h2 className="text-start font-bold text-brown text-2xl mb-3 underline">
              New List
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
        </>
      )}
    </div>
  )
}
