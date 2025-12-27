import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
    {
        id: 1,
        name: 'Home Jersey 2024',
        price: 'GH₵ 150.00',
        image: '/images/jersey-home.jpg',
        category: 'Jerseys'
    },
    {
        id: 2,
        name: 'Away Jersey 2024',
        price: 'GH₵ 150.00',
        image: '/images/jersey-away.jpg',
        category: 'Jerseys'
    },
    {
        id: 3,
        name: 'Training Kit',
        price: 'GH₵ 120.00',
        image: '/images/training-kit.jpg',
        category: 'Training Wear'
    },
    {
        id: 4,
        name: 'Club Scarf',
        price: 'GH₵ 40.00',
        image: '/images/scarf.jpg',
        category: 'Accessories'
    },
    {
        id: 5,
        name: 'Supporters Cap',
        price: 'GH₵ 35.00',
        image: '/images/cap.jpg',
        category: 'Accessories'
    },
    {
        id: 6,
        name: 'Club Hoodie',
        price: 'GH₵ 180.00',
        image: '/images/hoodie.jpg',
        category: 'Apparel'
    }
];

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-yellow-500 to-green-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Official Club Shop</h1>
                    <p className="text-xl">Support Bechem United - Get Your Official Merchandise</p>
                </div>
            </section>

            {/* Filter Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    <button className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition">
                        All Products
                    </button>
                    <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition">
                        Jerseys
                    </button>
                    <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition">
                        Training Wear
                    </button>
                    <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition">
                        Accessories
                    </button>
                    <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition">
                        Apparel
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-80 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-6xl">🛍️</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-green-600 font-semibold">{product.category}</span>
                                <h3 className="text-xl font-bold mt-2 mb-3">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-yellow-600">{product.price}</span>
                                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promo Banner */}
                <div className="bg-linear-to-r from-green-600 to-yellow-500 rounded-lg p-8 text-white text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Season Pass Holders Get 20% Off!</h2>
                    <p className="text-lg mb-6">Show your season pass at checkout for exclusive discounts</p>
                    <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}