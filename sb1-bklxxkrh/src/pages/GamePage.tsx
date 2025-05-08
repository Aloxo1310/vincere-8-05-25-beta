import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Users, Building2, Trees, Mountain, Sword, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export default function GamePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Game Information';
  }, []);

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/175771/pexels-photo-175771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Roman background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cream-50 mb-6"
          >
            Vincere <span className="text-gold-400">Colors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-cream-100 max-w-3xl mx-auto mb-8"
          >
            Build your empire, train your armies, and conquer your enemies in this strategic adventure set in the ancient Roman era.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/store">
              <Button
                variant="primary"
                size="lg"
                className="bg-gold-400 hover:bg-gold-500 text-amber-900"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Game Features */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Game Features
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Explore the rich world of Vincere Colors with its unique gameplay elements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={24} />,
                title: "Population Classes",
                description: "Manage different classes of citizens from farmers to soldiers, each with unique abilities and roles."
              },
              {
                icon: <Building2 size={24} />,
                title: "Strategic Buildings",
                description: "Construct various buildings to expand your city, strengthen defenses, and optimize resource gathering."
              },
              {
                icon: <Sword size={24} />,
                title: "Military Units",
                description: "Train soldiers, archers, and specialized units to defend your territory and conquer your enemies."
              },
              {
                icon: <Mountain size={24} />,
                title: "Resource Management",
                description: "Gather and manage resources like iron, wood, and natural materials to fuel your empire's growth."
              },
              {
                icon: <ShieldAlert size={24} />,
                title: "Civilization Development",
                description: "Advance your civilization through technological and cultural developments to gain advantages."
              },
              {
                icon: <Award size={24} />,
                title: "Victory Conditions",
                description: "Achieve victory through military conquest, economic dominance, or cultural superiority."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-cream-100 rounded-lg p-6 shadow-md border border-amber-200"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">{feature.title}</h3>
                <p className="text-amber-800">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Game Elements */}
      <section className="py-16 md:py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900">
              Game Elements
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Discover the core components that make up the world of Vincere Colors
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">Game Roles</h3>
                <p className="text-amber-800 mb-6">
                  Each class in Vincere Colors has a unique role in your civilization's development and success.
                </p>
                <Link to="/wiki" className="flex items-center text-amber-600 hover:text-amber-700 font-medium">
                  Learn more in our Wiki <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-cream-50 rounded-lg p-6 shadow-md border border-amber-200">
                <h4 className="text-xl font-serif font-bold text-amber-900 mb-2">Farmers & Agrarian Population</h4>
                <p className="text-amber-800 mb-4">
                  The backbone of your economy, farmers produce food to sustain your population and generate resources.
                </p>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  <li>Produce food for your civilization</li>
                  <li>Generate taxes and economic growth</li>
                  <li>Can be recruited into militia during emergencies</li>
                </ul>
              </div>
              
              <div className="bg-cream-50 rounded-lg p-6 shadow-md border border-amber-200">
                <h4 className="text-xl font-serif font-bold text-amber-900 mb-2">Military Units</h4>
                <p className="text-amber-800 mb-4">
                  Specialized units to defend your territory and expand your empire through conquest.
                </p>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  <li>Soldiers: Basic close-combat units effective in frontal assaults</li>
                  <li>Archers: Ranged units providing support and defensive capabilities</li>
                  <li>Crossbowmen: Advanced ranged units with increased power and precision</li>
                </ul>
              </div>
              
              <div className="bg-cream-50 rounded-lg p-6 shadow-md border border-amber-200">
                <h4 className="text-xl font-serif font-bold text-amber-900 mb-2">Structures</h4>
                <p className="text-amber-800 mb-4">
                  Various buildings to expand and strengthen your civilization.
                </p>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  <li>Mines/Farms: Resource production buildings for automatic gathering</li>
                  <li>Armory: Military structure for training and upgrading units</li>
                  <li>Town Hall: Central administrative building for managing your empire</li>
                </ul>
              </div>
              
              <div className="bg-cream-50 rounded-lg p-6 shadow-md border border-amber-200">
                <h4 className="text-xl font-serif font-bold text-amber-900 mb-2">Resources</h4>
                <p className="text-amber-800 mb-4">
                  Essential materials needed to build your empire and advance your civilization.
                </p>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  <li>Animals: Horses for cavalry units and transportation</li>
                  <li>Minerals: Iron for weapons, armor, and construction</li>
                  <li>Natural Resources: Wood, stone, and other materials for buildings and infrastructure</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* In-Game Currency */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 animate-pulse duration-4000"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl font-serif font-bold text-amber-900">DONARIUM</h3>
                    <p className="text-amber-800">Roman Gold</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Donarium <span className="text-gold-400">Currency</span>
              </h2>
              <p className="text-lg text-cream-100 mb-6">
                The official currency of Vincere Colors, inspired by ancient Roman gold coins. Use Donarium to purchase chests, unlock special features, and enhance your gameplay experience.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p className="text-cream-100">Purchase premium chests with rare items and exclusive bonuses</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p className="text-cream-100">Unlock special aesthetic customizations for your empire</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p className="text-cream-100">Accelerate progress and gain strategic advantages</p>
                </li>
              </ul>
              <Link to="/store">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                >
                  Visit Store
                </Button>
              </Link>
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
              Ready to Begin Your Journey?
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Create your account today and start your conquest in Vincere Colors
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Create Account
                </Button>
              </Link>
              <Link to="/wiki">
                <Button variant="outline" size="lg">
                  Explore Wiki
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}