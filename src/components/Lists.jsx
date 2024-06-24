import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../client/client"
import { useAuth } from "../context/useAuth"
import Spinner from "./sub-components/Spinner"
import Modal from "./sub-components/Modal"
import Waitlist from "./sub-components/Waitlist"
export default function Lists() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editableProduct, setEditableProduct] = useState(null)
  const [editedName, setEditedName] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const [error, setError] = useState("")
  const [isCopied, setIsCopied] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isRotated, setIsRotated] = useState(false)

  const productsRef = useMemo(() => {
    if (currentUser) {
      return collection(db, "users", currentUser.uid, "products")
    }
    return null
  }, [currentUser])

  useEffect(() => {
    if (currentUser && productsRef) {
      const fetchProducts = async () => {
        try {
          const productsSnapshot = await getDocs(productsRef)
          const productsList = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setProducts(productsList)
          setLoading(false)
        } catch (error) {
          setTimeout(() => {
            setError("Error fetching products")
          }, 1000)
          console.error("Error fetching products: ", error)
          setLoading(false)
        }
      }

      fetchProducts()
    }
  }, [currentUser, productsRef])

  const handleToggleModal = useCallback(() => {
    setIsRotated((prev) => !prev)
    setIsModalOpen((prev) => !prev)
    setIsDropdownOpen(false)
  }, [])
  // rotate the create boutton

  const handleEditClick = (product) => {
    setIsEditing(true)
    setEditableProduct(product)
    setEditedName(product.name)
    setEditedDescription(product.description)
  }

  const handleUpdateProduct = async (event) => {
    event.preventDefault()
    try {
      const productRef = doc(
        db,
        "users",
        currentUser.uid,
        "products",
        editableProduct.id
      )
      await updateDoc(productRef, {
        name: editedName,
        description: editedDescription,
      })
      const updatedProducts = products.map((product) =>
        product.id === editableProduct.id
          ? { ...product, name: editedName, description: editedDescription }
          : product
      )
      setProducts(updatedProducts)
      setIsEditing(false)
      setEditableProduct(null)
    } catch (error) {
      setTimeout(() => {
        setError("Error updating product")
      }, 1000)
      console.error("Error updating product: ", error)
    }
  }

  const handleDeleteProduct = async (productId) => {
    setProductIdToDelete(productId)
    setShowConfirmation(true)
  }

  const confirmDeleteProduct = async () => {
    try {
      const productRef = doc(
        db,
        "users",
        currentUser.uid,
        "products",
        productIdToDelete
      )
      await deleteDoc(productRef)
      const updatedProducts = products.filter(
        (product) => product.id !== productIdToDelete
      )
      setProducts(updatedProducts)
    } catch (error) {
      setTimeout(() => {
        setError("Error deleting product")
      }, 1000)
      setShowConfirmation(false)
      console.error("Error deleting product: ", error)
    } finally {
      // Reset confirmation modal state
      setShowConfirmation(false)
      setProductIdToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowConfirmation(false)
    setProductIdToDelete(null)
  }
  const handleCopy = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  function signOut() {
    logout()
  }
  if (loading) {
    return <Spinner />
  }

  return (
    <div className="py-6 px-6 md:pl-[10%]">
      {/* nav */}
      <div className="flex justify-between items-center w-full md:justify-end">
        <h1 className="text-3xl text-blk text-start font-bold md:hidden">
          Wailist <span className="text-brown">.</span>
        </h1>

        <div className="z-30 flex justify-center items-center">
          <svg
            onClick={() => {
              setIsDropdownOpen((prev) => !prev)
              setIsModalOpen(false)
              setIsRotated(false)
            }}
            className="w-9 h-9 md:hidden text-blk mr-2"
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

          {/* create Icon */}
          <div className="flex justify-center py-1 px-2 rounded-full bg-blk/5 items-center">
            <p className="p-2 mr-2 rounded-full bg-blk">
              <svg
                onClick={() => handleToggleModal()}
                className={`w-5 h-5 text-slate-50 rotating-element ${isRotated ? "rotated" : ""}`}
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
            </p>
            <span className="mr-2">Create</span>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4">
          <h3 className="text-xl font-semibold text-start">Your List</h3>
          {products.map((product) => (
            <li
              key={product.id}
              className="w-full relative rounded-md flex justify-between px-6 py-5 shadow-md"
            >
              <div className="flex flex-col">
                <p
                  onClick={() => handleEditClick(product)}
                  className="p-1 mb-1 w-10 border-b border-blk flex justify-start items-center"
                >
                  <svg
                    className="w-5 h-5 text-blk"
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
                      strokeWidth="1.3"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </p>

                <h2
                  onClick={() =>
                    navigate(`/w/${currentUser.uid}/${product.id}`)
                  }
                  className="text-xl font-semibold hover:cursor-pointer hover:underline text-brown text-start"
                >
                  {product.name}
                </h2>
                <p className="text-start text-sm">{product.description}</p>
              </div>
              <div className="flex flex-col-reverse justify-between items-start mr-4 md:mr-0">
                <Waitlist />
                <div className="flex items-center justify-start">
                  {/* link Icon */}
                  <img
                    onClick={() => {
                      const link = `http://wailist.vercel.app/w/${currentUser.uid}/${product.id}`
                      navigator.clipboard.writeText(link).then(
                        () => {
                          handleCopy()
                        },
                        (err) => {
                          setError("Error copying link")
                          console.log(err)
                        }
                      )
                    }}
                    className="hover:-rotate-12 ease-in mr-3"
                    src="/link.svg"
                    alt=""
                  />
                  <span className="h-6 border"></span>
                  {/* delete Icon */}
                  <img
                    onClick={() => handleDeleteProduct(product.id)}
                    className="ml-3 hover:-rotate-12 ease-in"
                    src="/trash.svg"
                    alt=""
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="">No List found.</p>
      )}

      {/* USER ACTIONS */}

      {error && (
        <div className="absolute top-0 right-0 bg-red-600 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          {error}
        </div>
      )}
      {isCopied && (
        <div className="absolute z-40 top-0 right-0 bg-green-600 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          Copied to clipboard
        </div>
      )}

      {isModalOpen && <Modal />}

      {/* dropdown */}

      {isDropdownOpen && (
        <>
          <p className="w-full h-full absolute top-0 left-0 bg-gray-90 backdrop-blur-[1.5px] bg-opacity-10 z-20"></p>

          <div className="absolute z-30 shadow-md top-20 right-16 flex flex-col bg-slate-50 p-1 text-blk rounded-md text-md cursor-context-menu">
            <svg
              onClick={() => setIsDropdownOpen(false)}
              className="w-5 h-5 mr-1 my-1 text-blk ml-auto cursor-pointer"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>

            <span
              onClick={() => signOut()}
              className="hover:bg-slate-200/50 text-blk flex justify-between items-center w-full mb-1 px-8 py-2 rounded-md"
            >
              Logout
              <svg
                className="w-5 h-5 ml-3 text-blk"
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
                  strokeWidth="1.5"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
            </span>
          </div>
        </>
      )}

      {isEditing && (
        <div className="absolute inset-0 backdrop-blur-[2px] flex justify-center z-30 items-center">
          <div className="bg-white relative p-6 rounded-lg w-[90%] md:w-[45%]">
            <svg
              onClick={() => setIsEditing(false)}
              className="w-6 h-6 text-brown absolute right-5 top-4 cursor-pointer"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-4 text-blk">
              Edit Product
            </h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label className="block text-slate-800 text-start mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-slate-800 text-start mb-1">
                  Description
                </label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="bg-brown text-white py-2 px-4 rounded-lg"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-slate-600 text-white py-2 px-4 rounded-lg ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirmation && (
        <>
          <p className="w-full h-full fixed top-0 left-0 bg-gray-90 backdrop-blur-[1.7px] bg-opacity-10 z-30"></p>
          <div className="absolute top-[20%] inset-0 md:inset-52 w-full md:w-[70%] px-[10%] md:px-[20%] z-30">
            <div className="flex flex-col bg-slate-50 p-5 shadow-md rounded-md">
              <p className="text-xl text-brown font-semibold">
                Confirm delete?
              </p>
              <div className="flex justify-center items-center mt-5 md:mt-6">
                <button
                  className="bg-brown px-3 py-1 rounded text-slate-50 mr-2"
                  onClick={() => confirmDeleteProduct()}
                >
                  Continue
                </button>
                <button
                  onClick={() => cancelDelete()}
                  className="bg-slate-600 text-slate-50 rounded px-3 py-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
