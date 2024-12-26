'use client';

import { useState } from 'react';
import { ShoppingBag, Shirt, Package, Coffee, Sticker } from 'lucide-react';

const VENDORS = {
  printful: 'YOUR_PRINTFUL_AFFILIATE_ID',
  customInk: 'YOUR_CUSTOMINK_AFFILIATE_ID',
  spreadshirt: 'YOUR_SPREADSHIRT_AFFILIATE_ID'
};

const PRODUCTS = [
  {
    category: 'Apparel',
    items: [
      {
        name: 'Basic T-Shirt',
        description: 'High-quality cotton t-shirt perfect for casual wear',
        price: 'Starting at $19.99',
        image: '/api/placeholder/300/300',
        vendors: {
          printful: 'https://www.printful.com/custom/mens/t-shirts',
          customInk: 'https://www.customink.com/products/categories/t-shirts',
        }
      },
      {
        name: 'Premium Polo',
        description: 'Professional polo shirt with embroidered design',
        price: 'Starting at $29.99',
        image: '/api/placeholder/300/300',
        vendors: {
          printful: 'https://www.printful.com/custom/mens/polo-shirts',
          customInk: 'https://www.customink.com/products/categories/polo-shirts',
        }
      }
    ]
  },
  {
    category: 'Promotional',
    items: [
      {
        name: 'Custom Stickers',
        description: 'High-quality vinyl stickers in various sizes',
        price: 'Starting at $3.99',
        image: '/api/placeholder/300/300',
        vendors: {
          printful: 'https://www.printful.com/custom/stickers',
          customInk: 'https://www.customink.com/categories/stickers',
        }
      },
      {
        name: 'Business Cards',
        description: 'Professional business cards with QR code integration',
        price: 'Starting at $19.99/100',
        image: '/api/placeholder/300/300',
        vendors: {
          printful: 'https://www.printful.com/custom/business-cards',
          customInk: 'https://www.customink.com/categories/business-cards',
        }
      }
    ]
  },
  {
    category: 'Drinkware',
    items: [
      {
        name: 'Coffee Mug',
        description: 'Classic ceramic mug with your QR design',
        price: 'Starting at $12.99',
        image: '/api/placeholder/300/300',
        vendors: {
          printful: 'https://www.printful.com/custom/mugs',
          customInk: 'https://www.customink.com/products/categories/drinkware',
        }
      },
      {
        name: 'Water Bottle',
        description: 'Stainless steel bottle with custom QR code',
        price: 'Starting at $24.99',
        image: '/api/placeholder/300/300',
        vendors: {
          printful: 'https://www.printful.com/custom/water-bottles',
          customInk: 'https://www.customink.com/products/categories/water-bottles',
        }
      }
    ]
  }
];

export default function PrintShopPage() {
  const [selectedCategory, setSelectedCategory] = useState(PRODUCTS[0].category);

  const addAffiliateId = (url: string, vendor: keyof typeof VENDORS) => {
    const affiliateId = VENDORS[vendor];
    return `${url}?affiliate=${affiliateId}`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="morphing-background" />
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Add Your QR Code to Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select a product to customize with your QR code. Our partners handle printing and shipping directly.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-card rounded-full p-2">
            <div className="flex space-x-2">
              {PRODUCTS.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === category.category
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {category.category === 'Apparel' && <Shirt className="w-5 h-5" />}
                  {category.category === 'Promotional' && <Sticker className="w-5 h-5" />}
                  {category.category === 'Drinkware' && <Coffee className="w-5 h-5" />}
                  <span>{category.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PRODUCTS.find(c => c.category === selectedCategory)?.items.map((product, index) => (
            <div key={index} className="glass-card rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">{product.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.vendors).map(([vendor, url]) => (
                      <a
                        key={vendor}
                        href={addAffiliateId(url, vendor as keyof typeof VENDORS)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Customize on {vendor.charAt(0).toUpperCase() + vendor.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 glass-card rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">1. Choose a Product</h3>
              <p className="text-gray-600 dark:text-gray-400">Select from our range of customizable products</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">2. Customize</h3>
              <p className="text-gray-600 dark:text-gray-400">Upload your QR code and adjust the design</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">3. Order Direct</h3>
              <p className="text-gray-600 dark:text-gray-400">Complete your purchase with our trusted partners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}