import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Store/cartSlice';

export default function Cart() {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="container mx-auto p-4  bg-white">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(items).map((key) => {
          const item = items[key];
          return (
            <div key={item.id} className="flex items-center border p-4 rounded">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-700">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(item.id)} className="ml-4 text-red-500">Remove</button>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Total Quantity: {totalQuantity}</h3>
        <h3 className="text-xl">Total Amount: ${totalAmount}</h3>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check Out
        </button>
      </div>
    </div>
  );
}