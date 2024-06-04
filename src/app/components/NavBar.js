'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSearchQuery } from '../Store/productsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    dispatch(setCategory(category));
  };

  const handleSearchChange = (event) => {
    console.log('Search query:', event.target.value);
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <nav className="bg-white text-black p-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="font-playfair hover:text-gray-300 text-xl font-bold">Ecommerce</Link>
        <div className="ml-10 flex space-x-10">
          <button onClick={() => handleCategoryClick('electronics')} type="button" className="hover:text-gray-300 font-Montserrat">Electronics</button>
          <button onClick={() => handleCategoryClick("men's clothing")} className="hover:text-gray-300 font-Montserrat">Mens Fashion</button>
          <button onClick={() => handleCategoryClick("women's clothing")} className="hover:text-gray-300 font-Montserrat">Women's Fashion</button>
          <button onClick={() => handleCategoryClick('jewelery')} className="hover:text-gray-300 font-Montserrat">Jewelry</button>
        </div>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Search..." onChange={handleSearchChange} className="rounded pl-10 pr-4 py-2" />
          <FontAwesomeIcon icon={faSearch} className="text-black hover:text-gray-500 font-bold py-2 px-4 rounded" />
          <Link href={`/cart`} className="bg-black p-2 rounded-full flex items-center cursor-pointer">
              <FontAwesomeIcon icon={faCartShopping} className="text-white mr-2" />
              <span className="text-white">{cartQuantity}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}