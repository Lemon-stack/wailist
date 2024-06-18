import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../client/client"
import { motion } from "framer-motion"

export default function ListPrev() {
    const { userId, productId } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

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

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="py-6 px-4 rounded-md h-full w-full flex justify-center items-center">
            {product ? (
                <div className="relative flex flex-col justify-between bg-slate-50 h-full w-full min-w-96 min-h-64 md:min-h-72 md:max-w-[55%] rounded-md py-3 px-5 md:px-8">
                    <div>
                        <motion.h1
                            initial={{ rotateZ: 0 }}
                            animate={{ rotateZ: 2 }}
                            transition={{ ease: "easeOut", delay: 1.1 }}
                            className="md:text-xl absolute top-5 text-start font-semibold text-slate-50 rounded-md px-4 py-1 bg-blk"
                        >
                            Join the waitlist
                        </motion.h1>
                        <h2 className="text-4xl md:text-5xl mt-14 font-bold text-brown">
                            {product.name}
                        </h2>
                        <p className="text-lg px-4 mt-1 md:mt-3 md:mb-4">
                            {product.description}
                        </p>
                    </div>
                    <form className="mb-8 flex justify-center">
                        <input
                            className="w-[60%] rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-brown focus:ring-offset-1"
                            type="text"
                        />
                        <button className="bg-brown text-slate-50 text-lg ml-1 px-4 py-1 border-brown border-2 rounded-md">
                            Join waitlist
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center mt-14">
                    <svg
                        className="w-32 h-32 text-slate-50"
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
                    <h3 className="text-5xl text-brown font-bold">Ooops!!!</h3>
                    <p className="text-slate-50 text-lg">Product not found</p>
                </div>
            )}
        </div>
    )
}
