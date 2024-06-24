import { useEffect, useState, lazy } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../client/client';
import { useAuth } from '../../context/useAuth';

const Spinner = lazy(()=> import('./Spinner'))

export default function EmailsJoined() {
    const { userId, productId } = useParams();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, `users/${userId}/products`, productId);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.error('No such product!');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product: ", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [userId, productId, currentUser]);

  if (loading) {
    return <Spinner/>
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className='px-[6%] md:px-[14%] py-4'>
    <div className="py-6">
      <h1 className="text-brown text-start text-2xl font-semibold">{product.name}</h1>
      <p className="text-start mt-1">{product.description}</p>
      <h2 className="text-xl font-semibold text-brown mt-4">Emails in waitlist <span className='text-blk'>:</span></h2>
      {product.waitlist?.emails?.length > 0 ? (
        <ul className="pl-5 mt-3 shadow-sm py-2 rounded-sm">
          {product.waitlist.emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      ) : (
        <p className='pl-5 mt-3 flex justify-center items-center shadow-sm py-4 rounded-s'>
          <svg className="w-6 h-6 mr-1 text-brown" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

          No emails in the waitlist.</p>
      )}
    </div>
    </div>
  );
    
  
}

