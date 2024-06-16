import { useAuth } from "../../context/useAuth";
import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../client/client'; 
import Spinner from "./Spinner";
import { motion } from "framer-motion";

export default function Topnav() {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

 

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid);
      setLoading(false);
    } else {
      setError("User is not authenticated.");
      setLoading(false);
    }
  }, [currentUser]);

  const addProduct = useCallback(async (productName, productDescription) => {
    try {
      if (!uid) {
        throw new Error('User is not authenticated.');
      }

      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, { /* any initial data if needed */ }, { merge: true });

      const productsRef = collection(userRef, "products");
      const newProductRef = doc(productsRef); // This creates a new auto-generated document ID

      await setDoc(newProductRef, {
        name: productName,
        description: productDescription,
        waitlist: { emails: [] } // Initialize waitlist with empty array
      });

      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  }, [uid]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    await addProduct(name, description);
    setName('');
    setDescription('');
    setIsModalOpen(false);
  }, [addProduct, name, description]);

  const handleToggleModal = useCallback(() => {
    handleRotate()
    setIsModalOpen((prev) => !prev);
  }, []);

  // rotate the create boutton
  const handleRotate = () => {
    setIsRotated(!isRotated);
  };

  if (loading) {
    return <Spinner/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-slate-50 w-full h-full">
      <div className="flex-shrink-0 group flex justify-between">
        <div className="flex items-center">
          <img
            className="inline-block flex-shrink-0 size-10 rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="User Avatar"
          />
          <div className="ms-3 flex flex-col">
            <h3 className="font-semibold text-brown text-start">{currentUser.displayName}</h3>
            <p className="text-sm font-medium text-slate-400 text-start">{currentUser.email}</p>
          </div>
        </div>

        <div
         className={`relative bg-brown p-2 z-10 rounded-full flex justify-center items-center cursor-pointer rotating-element ${isRotated ? 'rotated' : ''}`}
          onClick={handleToggleModal}
        >
          <p className="sr-only">create list</p>
          <svg className="w-7 h-6 text-blk" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
          </svg>
        </div>
      </div>

      {isModalOpen && (
        <>
          <p className="w-full h-full absolute top-0 left-0 bg-gray-90 backdrop-blur-[2px] bg-opacity-10"></p>

        <motion.div
        initial={{opacity:0.5, y:-100}}
        
        animate={{opacity:1, y:0}}
        transition={{duration:1, ease:"easeOut"}}
         className="absolute right-[17%] w-[65%] text-blk bg-slate-50 rounded-lg px-6 py-4 backdrop-blur-2xl backdrop-opacity-100">
          <h2 className="text-start font-bold text-brown text-2xl mb-3 underline">New List</h2>
         
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="block text-md font-medium mb-2 text-start">Product Name:</label>
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
              <label htmlFor="productDescription" className="block text-md font-medium mb-2 text-start">Description:</label>
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
            <button type="submit" className="bg-brown text-white py-2 px-4 rounded-lg shadow-md hover:bg-brown-dark">Create Product</button>
          </form>
        </motion.div>
      </>
      )}
    </div>
  );
}
