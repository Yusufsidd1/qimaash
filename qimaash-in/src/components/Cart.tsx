'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const Cart = () => {
  const { isCartOpen, closeCart, cart, loading, removeFromCart, getCartTotal } = useCart();

  if (!isCartOpen) return null;

  const total = getCartTotal();

  return (
    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={closeCart}></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-card-dark shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-text-light" id="slide-over-title">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-text-light" onClick={closeCart}>
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {loading && <p className="text-center text-text-light">Loading...</p>}
                      {!loading && cart && cart.items.length > 0 ? (
                        <ul role="list" className="-my-6 divide-y divide-gray-700">
                          {cart.items.map(({ product, quantity }) => (
                            <li key={product._id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                                <Image src={product.image} alt={product.name} width={96} height={96} className="h-full w-full object-cover object-center" />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-text-light">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4">${(product.price * quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-400">Qty {quantity}</p>
                                  <div className="flex">
                                    <button type="button" onClick={() => removeFromCart(product._id)} className="font-medium text-accent-blue hover:text-blue-400">Remove</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        !loading && <p className="text-center text-gray-400">Your cart is empty.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-text-light">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-accent-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700">Checkout</a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-400">
                    <p>
                      or&nbsp;
                      <button type="button" className="font-medium text-accent-blue hover:text-blue-400" onClick={closeCart}>
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
