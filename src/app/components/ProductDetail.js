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
    <div className="container mx-auto p-4">
      <button onClick={() => window.history.back()} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Back</button>
      <div className="flex flex-col md:flex-row">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-96 object-contain rounded" />
        <div className="p-4 flex-grow">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-500 text-sm mt-2">{product.category}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="text-xl font-bold mt-4">Price: ${product.price}</p>
          <button onClick={handleAddToCart} className="mt-4 bg-black text-white font-bold py-2 px-4 rounded flex items-center">
            <FontAwesomeIcon icon={faCartShopping} className="text-white mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}