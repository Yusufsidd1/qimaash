'use client'; // Because it has a button with an onClick handler

import React from 'react';
import type { Product } from '@/types';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, loading } = useCart();

  return (
    <div className="bg-card-dark border border-gray-700 rounded-lg p-4 flex flex-col hover:border-accent-blue transition-colors duration-300">
      <div className="relative w-full h-64 mb-4">
        <Image
          src={product.image || 'https://placehold.co/400x400/EEE/31343C?text=Image+Not+Available'}
          alt={product.name}
          fill={true}
          style={{objectFit: 'cover'}}
          className="rounded-t-lg"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-text-light">{product.name}</h2>
        <p className="text-gray-400 mt-2 text-sm">{product.description}</p>
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold text-text-light">${product.price.toFixed(2)}</p>
        <button
          className="mt-2 w-full bg-accent-blue text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500"
          onClick={() => addToCart(product._id)}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
