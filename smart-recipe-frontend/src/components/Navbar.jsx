import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-indigo-600">SmartRecipe</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Home
            </a>
            
            <a href="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              About
            </a>


             <a href="/add-recipe" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Add Recipe
            </a>
           
           
             <a href="/favorites" className="text-gray-700 hover:text-indigo-600 font-medium transition">
             My Favorites
            </a> 
             

            
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              onClick={() => window.location.href = "/signup"}
>
              Sign In
            </button>

            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              onClick={() => window.location.href = "/login"}
>
              LogIn
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
            >
              <span
                className={`block h-1 w-8 bg-gray-700 rounded transform transition duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`block h-1 w-8 bg-gray-700 rounded transition duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block h-1 w-8 bg-gray-700 rounded transform transition duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 transition">
            Home
          </a>
        
          <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 transition">
            About
          </a>
          
          <button className="w-full text-left px-4 py-2 bg-indigo-600 text-white rounded-md mt-2 hover:bg-indigo-700 transition">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
