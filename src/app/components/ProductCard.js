import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
     <div className=" bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl w-full max-w-xs flex flex-col justify-between">
      <Link href={`/product/${product.id}`}>
      <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
        <img src={product.image} className="h-full object-contain" />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h2 className="text-black text-xl font-bold truncate">{product.title}</h2>
        <p className="text-gray-500 text-sm mt-2">{product.category}</p>
        <p className="text-gray-700 text-sm line-clamp-3 mt-2 mb-4">{product.description}</p>
        <div className='flex flex-wraps'>
          <p className="text-gray-500 mr-1">Price:</p>
          <p className="text-black font-bold">${product.price}</p>
        </div>
      </div>
      </Link>
      <div className='flex flex-wrap justify-center mb-2'>
      <button onClick={handleAddToCart} className=" bg-black text-white font-bold py-2 px-4 rounded w-60 mt-1">
        <FontAwesomeIcon icon={faCartShopping} className="text-white mr-2" />
        Add to Cart
      </button>
      </div>
    </div>
  );
}