import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ShieldIcon, SwordIcon, Compass, Castle, Award } from 'lucide-react';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Vincere Games - Home';
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Discover Vincere Colors
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Build your empire, train your armies, and rise to glory in this strategic adventure
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-cream-50 rounded-lg p-8 shadow-md border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <Castle size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Build & Expand</h3>
              <p className="text-amber-800">
                Construct farms, mines, and buildings to grow your civilization and establish your presence.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-cream-50 rounded-lg p-8 shadow-md border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <SwordIcon size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Train & Conquer</h3>
              <p className="text-amber-800">
                Recruit soldiers, archers, and specialized units to defend your lands and conquer your enemies.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-cream-50 rounded-lg p-8 shadow-md border border-amber-200"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">Explore & Discover</h3>
              <p className="text-amber-800">
                Venture into the unknown, discover valuable resources, and uncover ancient secrets.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/game">
              <Button variant="primary" size="lg">
                Explore The Game
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Gallery
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Experience the stunning visuals of Vincere Colors
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/2832077/pexels-photo-2832077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/2835562/pexels-photo-2835562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              "https://images.pexels.com/photos/45842/clasical-music-musical-notes-sheet-music-45842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg shadow-md border border-amber-200"
              >
                <div className="relative group">
                  <img
                    src={image}
                    alt={`Game Screenshot ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <h3 className="text-cream-50 font-serif font-bold">Vincere Colors</h3>
                      <p className="text-cream-100 text-sm">In-game screenshot</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Ready to Begin Your Journey?
            </h2>
            <p className="mt-4 text-lg text-cream-100 max-w-2xl mx-auto">
              Join thousands of players in the world of Vincere Colors today
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/store">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                >
                  Visit Store
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cream-50 text-cream-50 hover:bg-amber-800"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}