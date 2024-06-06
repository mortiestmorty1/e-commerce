"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearchQuery } from '../Store/productsSlice';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [isHomePage, setIsHomePage] = useState(router.pathname === '/');
  const [selectedCategory, setSelectedCategory] = useState(router.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (router.pathname === '/') {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
    setSelectedCategory(router.pathname);
    setIsClient(true);
  }, [router.pathname]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    const category = isHomePage ? '' : router.query.category || '';
    dispatch(setSearchQuery({ query, category }));
  };

  const handleCategoryClick = (path) => {
    setSelectedCategory(path);
    setIsMenuOpen(false);
  };

  const cartCount = isClient ? Object.keys(cart.items).length : 0;

  return (
    <nav className="bg-white text-black p-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="font-playfair hover:text-gray-300 text-xl font-bold">Ecommerce</Link>
        <button 
          className="text-2xl md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
        <div className="hidden md:flex ml-10 space-x-10">
          <Link href="/electronics">
            <button
              onClick={() => handleCategoryClick('/electronics')}
              className={`font-mono ${selectedCategory === '/electronics' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
            >
              Electronics
            </button>
          </Link>
          <Link href="/mens-fashion">
            <button
              onClick={() => handleCategoryClick('/mens-fashion')}
              className={`font-mono ${selectedCategory === '/mens-fashion' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
            >
              Mens Fashion
            </button>
          </Link>
          <Link href="/womens-fashion">
            <button
              onClick={() => handleCategoryClick('/womens-fashion')}
              className={`font-mono ${selectedCategory === '/womens-fashion' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
            >
              Women's Fashion
            </button>
          </Link>
          <Link href="/jewelry">
            <button
              onClick={() => handleCategoryClick('/jewelry')}
              className={`font-mono ${selectedCategory === '/jewelry' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
            >
              Jewelry
            </button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center shadow-2xl">
            <input type="text" placeholder="Search..." onChange={handleSearchChange} className="rounded pl-10 pr-4 py-2" />
            <FontAwesomeIcon icon={faSearch} className="text-black hover:text-gray-500 font-bold py-2 px-4 rounded " />
          </div>
          <Link href="/cart" className="bg-black p-2 rounded-full flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faCartShopping} className="text-white mr-2" />
            <span className="text-white">{cartCount}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 p-4">
            <li className="w-full text-center py-2">
              <Link href="/electronics" legacyBehavior>
                <a
                  onClick={() => handleCategoryClick('/electronics')}
                  className={`block px-4 py-2 ${selectedCategory === '/electronics' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
                >
                  Electronics
                </a>
              </Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="/mens-fashion" legacyBehavior>
                <a
                  onClick={() => handleCategoryClick('/mens-fashion')}
                  className={`block px-4 py-2 ${selectedCategory === '/mens-fashion' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
                >
                  Mens Fashion
                </a>
              </Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="/womens-fashion" legacyBehavior>
                <a
                  onClick={() => handleCategoryClick('/womens-fashion')}
                  className={`block px-4 py-2 ${selectedCategory === '/womens-fashion' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
                >
                  Women's Fashion
                </a>
              </Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="/jewelry" legacyBehavior>
                <a
                  onClick={() => handleCategoryClick('/jewelry')}
                  className={`block px-4 py-2 ${selectedCategory === '/jewelry' ? 'text-black border-b-2 border-black' : 'hover:text-gray-300'}`}
                >
                  Jewelry
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}