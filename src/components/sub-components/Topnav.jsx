import { useAuth } from "../../context/useAuth";
import { useState } from 'react';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../client/client'; // Make sure to import your Firestore instance

export default function Topnav() {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const uid = currentUser ? currentUser.uid : null;

  // Function to add a new product
  const addProduct = async (productName, productDescription) => {
    try {
      if (!uid) {
        throw new Error('User is not authenticated.');
      }

      // Reference to the user's document in Firestore
      const userRef = doc(db, 'users', uid);

      // Ensure the user's collection exists, and create it if not
      await setDoc(userRef, { /* any initial data if needed */ }, { merge: true });

      // Reference to the "products" sub-collection under the user's UID
      const productsRef = collection(userRef, "products");

      // Generate a unique ID for the new product document
      const newProductRef = doc(productsRef); // This creates a new auto-generated document ID

      // Set the data for the new product document
      await setDoc(newProductRef, {
        name: productName,
        description: productDescription,
        waitlist: { emails: [] } // Initialize waitlist with empty array
      });

      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call addProduct with form input values
    await addProduct(name, description);

    // Clear form fields after submission
    setName('');
    setDescription('');
  };

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

        {/* Button or icon for modal trigger */}
        <div className="relative bg-brown p-2 rounded-full flex justify-center items-center cursor-pointer">
          <svg className="w-7 h-6 text-blk" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
          </svg>
        </div>
      </div>

      {/* Modal for creating document */}
      <div className="absolute right-64 text-blk">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="block">Product Name:</label>
            <input
              type="text"
              id="productName"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="block">Description:</label>
            <input
              type="text"
              id="productDescription"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder-text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-brown text-white py-2 px-4 rounded-lg shadow-md hover:bg-brown-dark">Create Product</button>
        </form>
      </div>
    </div>
  );
}
