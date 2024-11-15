"use client";

import { useState } from 'react';
import { FaSearch, FaPlus, FaMinus, FaTrash, FaEdit } from 'react-icons/fa';

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {string} image
 */

const products = [
  { id: 1, name: 'Burger', price: 10.99, quantity: 0, image: 'burger' },
  { id: 2, name: 'Pizza', price: 14.99, quantity: 0, image: 'pizza' },
  { id: 3, name: 'Salad', price: 8.99, quantity: 0, image: 'salad' },
  { id: 4, name: 'Soda', price: 2.99, quantity: 0, image: 'soda' },
  { id: 5, name: 'Fries', price: 4.99, quantity: 0, image: 'fries' },
];

const POS = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [viewCart, setViewCart] = useState(false);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setTotal(total + product.price);
  };

  const handleRemoveFromCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setTotal(total - product.price);
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
      setTotal(total - product.price);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const productImages = {
    burger: 'https://picsum.photos/200/300',
    pizza: 'https://picsum.photos/200/301',
    salad: 'https://picsum.photos/200/302',
    soda: 'https://picsum.photos/200/303',
    fries: 'https://picsum.photos/200/304',
  };

  const handleCheckout = () => {
    alert('Checkout successful!');
    setCart([]);
    setTotal(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Food City POS</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="w-1/2 p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setViewCart(!viewCart)}
        >
          {viewCart ? 'Hide Cart' : 'View Cart'}
        </button>
      </div>
      {viewCart ? (
        <div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded mt-4">
            <h2 className="text-lg font-bold">Cart</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded"
              >
                <div className="flex items-center">
                  <img
                    src={productImages[product.image]}
                    alt={product.name}
                    className="w-16 h-16 mr-4 rounded"
                  />
                  <h2 className="text-lg font-bold">{product.name}</h2>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">
                    {product.quantity} x ${product.price}
                  </p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded"
            >
              <div className="flex items-center">
                <img
                  src={productImages[product.image]}
                  alt={product.name}
                  className="w-16 h-16 mr-4 rounded"
                />
                <h2 className="text-lg font-bold">{product.name}</h2>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">${product.price}</p>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleRemoveFromCart(product)}
                >
                  <FaMinus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default POS;
