import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../client/client"
import { useAuth } from "../context/useAuth"
import Spinner from "./sub-components/Spinner"
export default function Lists() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
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
  if (loading) {
    return <Spinner />
  }

  return (
    <div className="py-6 -px-1 md:px-24">
      {error && (
        <div className="absolute top-0 right-0 bg-red-600 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          {error}
        </div>
      )}
      {isCopied && (
        <div className="absolute top-0 right-0 bg-green-600 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
          Copied to clipboard
        </div>
      )}
      <h1 className="text-brown text-start text-2xl font-semibold mb-6 mt-2 md:mt-0">
        Your lists
      </h1>
      {products.length > 0 ? (
        <ul className="">
          {products.map((product) => (
            <li
              className="bg-slate-50 flex px-5 py-4 md:py-8 relative justify-center items-start flex-col rounded-lg w-full mb-5"
              key={product.id}
            >
              <div className="absolute -top-3 bg-slate-50 rounded-full p-1.5 flex justify-center items-center shadow-lg -left-3">
                <svg
                  onClick={() => handleEditClick(product)}
                  className="w-6 h-6 text-brown cursor-pointer"
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
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </div>

              <h2
                onClick={() => navigate(`/w/${currentUser.uid}/${product.id}`)}
                className="text-2xl font-semibold text-brown cursor-pointer hover:underline"
              >
                - {product.name}
              </h2>
              <div>
                <p className="max-w-lg md:max-w-xl truncate overflow-hidden mt-2">
                  {product.description}
                </p>
                <div className="absolute flex justify-center items-center top-3 right-4">
                  {/* trash icon */}
                  <svg
                    onClick={() => handleDeleteProduct(product.id)}
                    className="w-5 h-5 mr-3 text-brown hover:-rotate-12"
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
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>

                  {/* share icon */}
                  <svg
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
                    className="w-5 h-5 text-brown hover:-rotate-12"
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
                      d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                    />
                  </svg>
                </div>
              </div>
                <div className="flex -space-x-2 absolute right-0 bottom-0 pb-3 pr-3 md:pb-5 md:pr-5 justify-end">
                  
                    <span className="inline-block size-7 bg-gray-100 rounded-full overflow-hidden">
                      <svg
                        className="size-full text-gray-300"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.62854"
                          y="0.359985"
                          width={15}
                          height={15}
                          rx="7.5"
                          fill="white"
                        />
                        <path
                          d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                          fill="currentColor"
                        />
                        <path
                          d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="inline-block size-7 bg-gray-100 rounded-full overflow-hidden">
                      <svg
                        className="size-full text-gray-300"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.62854"
                          y="0.359985"
                          width={15}
                          height={15}
                          rx="7.5"
                          fill="white"
                        />
                        <path
                          d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                          fill="currentColor"
                        />
                        <path
                          d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="inline-block size-7 bg-gray-100 rounded-full overflow-hidden">
                      <svg
                        className="size-full text-gray-300"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.62854"
                          y="0.359985"
                          width={15}
                          height={15}
                          rx="7.5"
                          fill="white"
                        />
                        <path
                          d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                          fill="currentColor"
                        />
                        <path
                          d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-50">No List found.</p>
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
