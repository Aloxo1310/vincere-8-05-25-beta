import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Create Account';
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  
  useEffect(() => {
    // If user is already logged in, redirect to profile
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, username);
      
      if (error) {
        // Check specifically for the "user already registered" error
        if (error.message === 'User already registered') {
          setError('This email is already registered. Please sign in or use a different email address.');
        } else {
          setError(error.message);
        }
      } else {
        // Registration successful
        navigate('/profile');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-cream-50 pt-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-cream-100 p-8 rounded-lg shadow-lg border border-amber-200"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              Create Account
            </h1>
            <p className="text-amber-800">
              Join the Vincere community
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <Input
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!email || !password || !confirmPassword || !username || loading}
              >
                Create Account
              </Button>
              
              <div className="text-center pt-2">
                <p className="text-amber-800 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}