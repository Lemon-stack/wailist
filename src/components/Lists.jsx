import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../client/client"
import { useAuth } from "../context/useAuth"

export default function Lists() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

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

    if (loading) {
        return <div>Loading...</div>
    }
    console.log(currentUser.uid)

    return (
        <div className="py-6 px-10">
            <h1 className="text-brown text-start text-2xl font-semibold mb-4 mt-3 md:mt-0">
                Your lists
            </h1>
            {products.length > 0 ? (
                <ul className="">
                    {products.map((product) => (
                        <li
                            onClick={() =>
                                navigate(`/w/${currentUser.uid}/${product.id}`)
                            }
                            className="bg-slate-50 flex px-5 py-4 relative justify-center items-start flex-col rounded-lg w-full mb-2"
                            key={product.id}
                        >
                            <h2 className="text-2xl font-semibold text-brown">
                                - {product.name}
                            </h2>
                            <div>
                                <p className="max-w-lg md:max-w-xl truncate overflow-hidden mt-2">
                                    {product.description}
                                </p>
                                <div className="absolute top-3 right-4">
                                    <svg
                                        className="w-6 h-6 text-brown"
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
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-50">No List found.</p>
            )}
        </div>
    )
}
