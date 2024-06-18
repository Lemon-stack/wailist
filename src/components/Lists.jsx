import { useEffect, useState } from 'react';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../client/client';
import { useAuth } from '../context/useAuth';
export default function Lists () {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    if (currentUser) {
      const fetchProducts = async () => {
        try {
          const productsRef = collection(db, 'users', currentUser.uid, 'products');
          const productsSnapshot = await getDocs(productsRef);
          const productsList = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProducts(productsList);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products: ", error);
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="py-6 px-10">
      <h1 className="text-brown text-start text-2xl font-semibold mb-4 mt-3 md:mt-0">Your lists</h1>
      {products.length > 0 ? (
        <ul className="">
          {products.map((product) => (
            <li
            className="bg-slate-50 flex px-5 py-4 relative justify-center items-start flex-col rounded-lg w-full mb-2"
             key={product.id}>

              <h2 className="text-2xl font-semibold text-brown">- {product.name}</h2>
              <div>
              <p 
              className="max-w-lg truncate overflow-hidden mt-2"
              >{product.description}</p>

      </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

