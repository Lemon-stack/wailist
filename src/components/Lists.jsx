import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../client/client"
import { useAuth } from "../context/useAuth"

export default function Lists() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editableProduct, setEditableProduct] = useState(null)
  const [editedName, setEditedName] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [del, setDel] = useState(false)

  useEffect(() => {
    if (currentUser) {
      const fetchProducts = async () => {
        try {
          const productsRef = collection(
            db,
            "users",
            currentUser.uid,
            "products"
          )
          const productsSnapshot = await getDocs(productsRef)
          const productsList = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setProducts(productsList)
          setLoading(false)
        } catch (error) {
          console.error("Error fetching products: ", error)
          setLoading(false)
        }
      }

      fetchProducts()
    }
  }, [currentUser])

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
      console.error("Error updating product: ", error)
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(
        db,
        "users",
        currentUser.uid,
        "products",
        productId
      )
      await deleteDoc(productRef)
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      )
      setProducts(updatedProducts)
    } catch (error) {
      console.error("Error deleting product: ", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="py-6 md:px-10">
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
                    onClick={() => setDel(true)}
                    className="w-5 h-5 mr-2 text-brown hover:-rotate-12"
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
                      strokeWidth="2"
                      d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                    />
                  </svg>
                </div>
              </div>
              {del && (
                <>
                  <p className="w-full h-full fixed top-0 left-0 bg-gray-90 backdrop-blur-[1.7px] bg-opacity-10 z-30"></p>
                  <div className="absolute inset-0 w-full px-[10%] md:px-[20%] z-30">
                    <div className="flex flex-col bg-slate-50 p-5 shadow-md rounded-md">
                      <p className="text-xl text-brown font-semibold">
                        Confirm delete?
                      </p>
                      <div className="flex justify-center items-center mt-5 md:mt-6">
                        <button
                          className="bg-brown px-3 py-1 rounded text-slate-50 mr-2"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Continue
                        </button>
                        <button
                          onClick={() => setDel(false)}
                          className="bg-slate-600 text-slate-50 rounded px-3 py-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
    </div>
  )
}
