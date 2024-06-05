import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Store/cartSlice';

export default function Cart() {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="flex">
        <div className="w-2/3">
          <div className="text-black grid grid-cols-4 gap-4">
            <div className="col-span-2 font-bold text-center ml-16">Name</div>
            <div className="font-bold text-center">Price</div>
            <div className="font-bold text-center">Quantity</div>
          </div>
          <div className="bg-gray-100 p-4 rounded mt-2">
            {Object.keys(items).map((key) => {
              const item = items[key];
              return (
                <div key={item.id} className="grid grid-cols-4 gap-4 items-center border-b py-4">
                  <div className="col-span-2 flex items-center">
                    <img src={item.image} className="w-16 h-16 object-cover rounded" />
                    <span className="ml-4">{item.title}</span>
                  </div>
                  <div>${item.price}</div>
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/3 ml-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-bold mb-4">Your Total</h3>
            {Object.keys(items).map((key) => {
              const item = items[key];
              return (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.title}</span>
                  <span>X {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              );
            })}
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
            <button className="mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}