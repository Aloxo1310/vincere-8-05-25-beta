import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { createWikiArticle } from '../lib/supabase';
import { BookOpen, Save, AlertCircle } from 'lucide-react';

export default function WikiCreatePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Create Wiki Article';
  }, []);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const wikiCategories = [
    { id: 'gameplay', name: 'Gameplay Mechanics' },
    { id: 'units', name: 'Units & Characters' },
    { id: 'buildings', name: 'Buildings & Structures' },
    { id: 'resources', name: 'Resources & Economy' },
    { id: 'history', name: 'Historical Context' },
    { id: 'strategy', name: 'Strategy Guides' },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(wikiCategories[0].id);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await createWikiArticle(title, content, selectedCategory);
      
      if (error) {
        throw new Error(error.message);
      }
      
      navigate(`/wiki/article/${data?.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-cream-100 rounded-lg shadow-md border border-amber-200 p-6"
        >
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-amber-800 mr-3" />
            <h1 className="text-3xl font-serif font-bold text-amber-900">
              Create Wiki Article
            </h1>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title"
              fullWidth
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 w-full bg-cream-50 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-amber-900"
              >
                {wikiCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here..."
                className="px-4 py-2 w-full bg-cream-50 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-amber-900 min-h-[300px] resize-y"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate('/wiki')}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={loading}
                disabled={!title || !content || loading}
              >
                <Save size={16} className="mr-2" />
                Publish Article
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}