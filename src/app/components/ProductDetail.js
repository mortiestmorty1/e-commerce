import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/cartSlice';

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => window.history.back()} className="mb-4">Back</button>
      <div className="flex">
        <img src={product.image} alt={product.title} className="w-1/2 h-96 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-bold mt-4">${product.price}</p>
          <button onClick={handleAddToCart} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}