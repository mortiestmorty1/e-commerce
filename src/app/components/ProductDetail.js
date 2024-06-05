import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white container mx-auto p-4">
      <button onClick={() => window.history.back()} className="mb-4 text-black py-2 px-4 rounded">Back</button>
      <div className="flex flex-wrap md:flex-nowrap bg-white shadow-md rounded-lg p-6">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="object-contain h-full max-h-96 w-full rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
        <h2 className="text-2xl text-black font-bold">{product.title}</h2>
          <p className="text-gray-500 text-sm mt-2">{product.category}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="text-xl text-black font-bold mt-4">Price: ${product.price}</p>
          <button onClick={handleAddToCart} className="mt-4 bg-black text-white font-bold py-2 px-4 rounded flex items-center">
            <FontAwesomeIcon icon={faCartShopping} className="text-white mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
