'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { getItemCount, openCart } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-card-dark shadow-lg shadow-accent-blue/10 sticky top-0 z-50 border-b border-gray-700">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-text-light hover:text-accent-blue transition-colors">
          Qimaash
        </Link>
        <div>
          <button className="relative" onClick={openCart}>
            <svg className="h-6 w-6 text-text-light" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
