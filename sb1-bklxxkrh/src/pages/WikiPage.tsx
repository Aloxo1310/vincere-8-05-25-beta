import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Info, FileText, Search } from 'lucide-react';

export default function WikiPage() {
  useEffect(() => {
    document.title = 'Vincere colors - Wiki';
  }, []);

  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const wikiCategories = [
    { id: 'gameplay', name: 'Gameplay Mechanics' },
    { id: 'units', name: 'Units & Characters' },
    { id: 'buildings', name: 'Buildings & Structures' },
    { id: 'resources', name: 'Resources & Economy' },
    { id: 'history', name: 'Historical Context' },
    { id: 'strategy', name: 'Strategy Guides' },
  ];

  const wikiArticles = [
    {
      id: 1,
      title: 'Getting Started with Vincere colors',
      summary: 'A beginner\'s guide to understanding the basic mechanics of the game.',
      category: 'gameplay',
      author: 'GameMaster',
      date: '2025-03-15',
    },
    {
      id: 2,
      title: 'Military Units Guide',
      summary: 'Comprehensive information about all military units, their strengths, and strategic uses.',
      category: 'units',
      author: 'CommanderX',
      date: '2025-03-12',
    },
    {
      id: 3,
      title: 'Essential Buildings for Economic Growth',
      summary: 'Learn which buildings to prioritize for a strong economy in the early game.',
      category: 'buildings',
      author: 'ArchitectPro',
      date: '2025-03-10',
    },
    {
      id: 4,
      title: 'Resource Management 101',
      summary: 'Tips and tricks for efficient resource gathering and management.',
      category: 'resources',
      author: 'ResourceGuru',
      date: '2025-03-08',
    },
    {
      id: 5,
      title: 'Roman Influence on Game Design',
      summary: 'How ancient Roman culture and military tactics influenced the game design.',
      category: 'history',
      author: 'HistorianX',
      date: '2025-03-05',
    },
    {
      id: 6,
      title: 'Advanced Combat Strategies',
      summary: 'Master the battlefield with these expert combat techniques and formations.',
      category: 'strategy',
      author: 'BattleMaster',
      date: '2025-03-01',
    },
  ];

  const filteredArticles = searchTerm
    ? wikiArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : wikiArticles;

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Wiki background"
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
            Vincere <span className="text-gold-400">Wiki</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-cream-100 max-w-3xl mx-auto mb-8"
          >
            Your comprehensive guide to everything Vincere colors
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
                Crea una cuenta o inicia sesión para contribuir a la wiki
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/login">
                  <Button size="sm" variant="primary" className="bg-gold-400 hover:bg-gold-500 text-amber-900">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" variant="primary" className="bg-amber-800 text-cream-50 hover:bg-amber-700">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
          
          <div className="max-w-md mx-auto relative mt-8">
            <input
              type="text"
              placeholder="Search wiki articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-cream-100/90 border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-amber-900 placeholder-amber-700/50"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-700" />
          </div>
        </div>
      </section>
      
      {/* Wiki Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-cream-100 rounded-lg p-4 shadow-md border border-amber-200 sticky top-20">
                <h2 className="text-xl font-serif font-bold text-amber-900 mb-4">Categories</h2>
                <ul className="space-y-2">
                  {wikiCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setSearchTerm(category.name)}
                        className="w-full text-left px-3 py-2 rounded-md text-amber-800 hover:bg-amber-50 transition-colors"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
                
                {user && (
                  <div className="mt-6 pt-6 border-t border-amber-200">
                    <Link to="/wiki/create">
                      <Button fullWidth variant="primary" className="justify-center">
                        <Plus size={16} className="mr-2" />
                        Create Article
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">
                {searchTerm ? `Search Results: "${searchTerm}"` : 'Recent Articles'}
              </h2>
              
              {filteredArticles.length === 0 ? (
                <div className="bg-cream-100 rounded-lg p-6 shadow-md border border-amber-200 text-center">
                  <BookOpen size={40} className="mx-auto text-amber-800 mb-4" />
                  <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                    No Articles Found
                  </h3>
                  <p className="text-amber-800 mb-4">
                    We couldn\'t find any articles matching your search.
                  </p>
                  {user && (
                    <div>
                      <p className="text-amber-700 mb-3">
                        Would you like to create an article on this topic?
                      </p>
                      <Link to="/wiki/create">
                        <Button variant="primary">
                          <Plus size={16} className="mr-2" />
                          Create Article
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-cream-100 rounded-lg overflow-hidden shadow-md border border-amber-200"
                    >
                      <div className="p-6">
                        <Link to={`/wiki/article/${article.id}`} className="block hover:opacity-90 transition-opacity">
                          <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-amber-800 mb-4">{article.summary}</p>
                        <div className="flex justify-between items-center text-sm text-amber-700">
                          <span>By {article.author}</span>
                          <span>{article.date}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-amber-200 flex justify-between items-center">
                          <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                            {wikiCategories.find(cat => cat.id === article.category)?.name}
                          </span>
                          <Link to={`/wiki/article/${article.id}`}>
                            <Button size="sm" variant="ghost">
                              <FileText size={16} className="mr-1" /> Read
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contribution Section */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-amber-900">
              Contribute to the Wiki
            </h2>
            <p className="mt-4 text-lg text-amber-800 max-w-2xl mx-auto">
              Share your knowledge and help our community grow
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-lg overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-cream-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-4">
                    Why Contribute?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <p className="text-cream-100">Help fellow players learn about the game</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <p className="text-cream-100">Share strategies and tips you\'ve discovered</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <p className="text-cream-100">Build your reputation in the community</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 flex items-center justify-center text-amber-900 mr-3 mt-0.5">
                        <span className="text-sm font-bold">4</span>
                      </div>
                      <p className="text-cream-100">Earn special badges and recognition for your contributions</p>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 animate-pulse duration-3000"></div>
                      <div className="absolute inset-2 rounded-full bg-amber-800 flex items-center justify-center">
                        <BookOpen size={36} className="text-gold-400" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-4">
                    Ready to contribute?
                  </h3>
                  {user ? (
                    <Link to="/wiki/create">
                      <Button
                        variant="primary"
                        size="lg"
                        className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                      >
                        <Plus size={18} className="mr-2" />
                        Create Article
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Button
                        variant="primary"
                        size="lg"
                        className="bg-gold-400 hover:bg-gold-500 text-amber-900"
                      >
                        Sign In to Contribute
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}