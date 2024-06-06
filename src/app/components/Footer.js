import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-white text-black py-8 mt-auto">
      <div className="container mx-auto text-center mt-40">
        <h1 className="text-xl font-playfair">&copy; 2024 E-commerce Website by SHOAIB</h1>
        <div className="flex flex-wrap justify-between space-x-4 mt-4 ml-12 mr-12">
          <Link href="https://twitter.com/ShoaibAhmedSohu" legacyBehavior>
            <a className="hover:text-blue-400">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </Link>
          <Link href="https://www.facebook.com/shoaib.sohoo" legacyBehavior>
            <a className="hover:text-blue-700">
              <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
          </Link>
          <Link href="https://www.instagram.com/shoaibahmed1_/" legacyBehavior>
            <a className="hover:text-pink-500">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </Link>
          <Link href="https://github.com/mortiestmorty1" legacyBehavior>
            <a className="hover:text-white hover:bg-black rounded-full">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;