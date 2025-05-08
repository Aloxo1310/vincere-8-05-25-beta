import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Coins, Crown, Info } from 'lucide-react';

export default function StorePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Store';
  }, []);

  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'chests', name: 'Chests' },
    { id: 'currency', name: 'Currency' },
    { id: 'specials', name: 'Special Offers' },
  ];

  const storeItems = [
    {
      id: 1,
      name: 'Bronze Chest',
      description: 'Contains common items and a small amount of Donarium.',
      price: 4.99,
      image: 'https://vinceregames-441081885.imgix.net/CogreBrnoce.jpg',
      type: 'chests',
      highlight: false,
    },
    {
      id: 2,
      name: 'Silver Chest',
      description: 'Contains uncommon items and a moderate amount of Donarium.',
      price: 9.99,
      image: 'https://vinceregames-441081885.imgix.net/CofrePlata.jpg',
      type: 'chests',
      highlight: false,
    },
    {
      id: 3,
      name: 'Gold Chest',
      description: 'Contains rare items and a substantial amount of Donarium.',
      price: 19.99,
      image: 'https://vinceregames-441081885.imgix.net/CofreOro.jpg',
      type: 'chests',
      highlight: true,
    },
    {
      id: 4,
      name: '100 Donarium',
      description: 'A small stack of Donarium coins for basic purchases.',
      price: 4.99,
      image: 'https://vinceregames-441081885.imgix.net/100Moneda.png',
      type: 'currency',
      highlight: false,
    },
    {
      id: 5,
      name: '500 Donarium',
      description: 'A medium stack of Donarium coins for regular players.',
      price: 19.99,
      image: 'https://vinceregames-441081885.imgix.net/500Monedas.jpg',
      type: 'currency',
      highlight: false,
    },
    {
      id: 6,
      name: '1200 Donarium',
      description: 'A large stack of Donarium coins with bonus amount.',
      price: 39.99,
      image: 'https://vinceregames-441081885.imgix.net/1200Moneda.png',
      type: 'currency',
      highlight: true,
    },
    {
      id: 7,
      name: 'Starter Bundle',
      description:
        'Perfect for new players. Includes a Bronze Chest and 200 Donarium.',
      price: 9.99,
      image: 'https://vinceregames-441081885.imgix.net/Cofre200.png',
      type: 'specials',
      highlight: true,
    },
    {
      id: 8,
      name: 'Premium Bundle',
      description:
        'Exclusive offer with Gold Chest and 800 Donarium at a discounted price.',
      price: 29.99,
      image: 'https://vinceregames-441081885.imgix.net/Cofre800.png',
      type: 'specials',
      highlight: true,
    },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? storeItems
      : storeItems.filter((item) => item.type === selectedCategory);

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1308624/pexels-photo-1308624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Store background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-bold text-cream-50 mb-6"
          >
            Vincere <span className="text-gold-400">Store</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-cream-100 max-w-3xl mx-auto mb-8"
          >
            Enhance your gameplay with chests, currency, and special offers
          </motion.p>

          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-md mx-auto bg-amber-800/80 rounded-lg p-4 mb-6 border border-amber-700"
            >
              <p className="text-cream-50 mb-2">
                <Info size={16} className="inline mr-2" />
                Crea una cuenta o inicia sesión para comprar artículos
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/login">
                  <Button
                    size="sm"
                    variant="primary"
                    className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    variant="primary"
                    className="bg-amber-800 text-cream-50 hover:bg-amber-700"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Store Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-800 text-cream-50'
                    : 'bg-cream-100 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Store Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-cream-100 rounded-lg overflow-hidden shadow-md border ${
                  item.highlight ? 'border-amber-500' : 'border-amber-200'
                }`}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.highlight && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-cream-50 px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-serif font-bold text-amber-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-amber-800 text-sm mb-4 h-12 overflow-hidden">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-900">
                      ${item.price}
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={!user}
                      onClick={() =>
                        alert(
                          'Purchase functionality would be implemented here'
                        )
                      }
                    >
                      <ShoppingCart size={16} className="mr-1" /> Buy
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-amber-900">
              Featured Bundles
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Special offers with maximum value for your money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-amber-100 to-cream-50 rounded-lg overflow-hidden shadow-lg border border-amber-300"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 animate-pulse duration-3000"></div>
                      <div className="absolute inset-2 rounded-full bg-cream-50 flex items-center justify-center">
                        <Package size={40} className="text-amber-700" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-amber-600 text-cream-50 text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">
                      BEST VALUE
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-amber-900 mb-2">
                      Empire Builder Bundle
                    </h3>
                    <p className="text-amber-800 mb-4">
                      Everything you need to kickstart your empire. Includes 2
                      Gold Chests, 1 Silver Chest, and 1500 Donarium.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-amber-900">
                          $49.99
                        </span>
                        <span className="text-amber-600 line-through ml-2">
                          $79.96
                        </span>
                        <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded ml-2">
                          SAVE 37%
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        disabled={!user}
                        onClick={() =>
                          alert(
                            'Purchase functionality would be implemented here'
                          )
                        }
                      >
                        Purchase
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-amber-100 to-cream-50 rounded-lg overflow-hidden shadow-lg border border-amber-300"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 animate-pulse duration-3000"></div>
                      <div className="absolute inset-2 rounded-full bg-cream-50 flex items-center justify-center">
                        <Crown size={40} className="text-amber-700" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-amber-600 text-cream-50 text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">
                      LIMITED TIME
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-amber-900 mb-2">
                      Royal Conquest Package
                    </h3>
                    <p className="text-amber-800 mb-4">
                      Exclusive bundle for serious players. Get 3 Gold Chests,
                      2500 Donarium, and a special Royal Banner.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-amber-900">
                          $79.99
                        </span>
                        <span className="text-amber-600 line-through ml-2">
                          $129.97
                        </span>
                        <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded ml-2">
                          SAVE 38%
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        disabled={!user}
                        onClick={() =>
                          alert(
                            'Purchase functionality would be implemented here'
                          )
                        }
                      >
                        Purchase
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Not Ready to Purchase?
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Explore the game and learn more about Vincere Colors
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/game">
                <Button variant="primary" size="lg">
                  Game Information
                </Button>
              </Link>
              <Link to="/wiki">
                <Button variant="outline" size="lg">
                  Visit Wiki
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
