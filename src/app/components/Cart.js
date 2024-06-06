import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { removeFromCart, updateQuantity } from '../Store/cartSlice';
import Image from 'next/image';

export default function Cart() {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  if (!isClient) {
    return <div className="container mx-auto p-4 bg-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {totalQuantity === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty. Buy something!</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3">
            <div className="rounded-xl p-4"></div>
            <div className="text-gray-500 grid grid-cols-4 gap-4">
              <div className="col-span-2 font-bold text-center">Name</div>
              <div className="font-bold text-center">Price</div>
              <div className="font-bold text-center">Quantity</div>
            </div>
            <div className="text-black space-y-4 w-full">
              {Object.keys(items).map((key) => {
                const item = items[key];
                return (
                  <div key={item.id} className="grid grid-cols-4 gap-2 md:gap-5 items-center bg-white shadow-md rounded-xl p-4">
                    <div className="col-span-2 flex items-center">
                      <Image src={item.image} width={500} height={500}  className="w-10 h-10 object-cover rounded" alt={item.title} />
                      <span className="ml-4">{item.title}</span>
                    </div>
                    <div className="text-center">${item.price}</div>
                    <div className="flex items-center justify-center text-white">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                        className="px-2 py-1 bg-black rounded w-8 h-8 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                        className="px-2 py-1 bg-black rounded w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4">
            <div className="text-black bg-white shadow-md rounded-xl p-4">
              <h3 className="text-xl font-bold mb-4">Your Total</h3>
              {Object.keys(items).map((key) => {
                const item = items[key];
                return (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.title} <p className='text-gray-300'> X {item.quantity}</p></span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                );
              })}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount < 0 ? 0 : totalAmount}</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-black text-white p-4 rounded shadow-lg">
          <p>Thank you for your purchase!</p>
        </div>
      )}
    </div>
  );
}