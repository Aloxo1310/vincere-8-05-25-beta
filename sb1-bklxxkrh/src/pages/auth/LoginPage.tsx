import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Iniciar Sesión';
  }, []);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, resetPassword, user } = useAuth();
  
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message === 'Invalid login credentials') {
          setError('Correo electrónico o contraseña incorrectos.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('Por favor, confirma tu correo electrónico antes de iniciar sesión.');
        } else {
          setError(error.message);
        }
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDevLogin = () => {
    setEmail('vincere@dev.com');
    setPassword('vincere1');
  };
  
  return (
    <div className="min-h-screen bg-[url('https://vinceregames-441081885.imgix.net/backgroundprofile')] bg-cover bg-center bg-no-repeat pt-16 flex items-center justify-center">
      <div className="max-w-md w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-cream-100/95 backdrop-blur-sm p-8 rounded-lg shadow-xl border-2 border-amber-300"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-20 h-20 mx-auto mb-4 bg-amber-800 rounded-full flex items-center justify-center"
            >
              <Shield className="w-12 h-12 text-gold-400" />
            </motion.div>
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">
              {forgotPassword ? 'Restablecer Contraseña' : 'Ave, Legionario'}
            </h1>
            <p className="text-amber-800 font-body">
              {forgotPassword 
                ? 'Ingresa tu correo para recibir instrucciones' 
                : 'Inicia sesión en tu cuenta de Vincere'}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start"
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {resetSent && (
            <div className="mb-6 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
              Se han enviado las instrucciones para restablecer la contraseña a tu correo.
            </div>
          )}
          
          {forgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
                fullWidth
                icon={<Mail className="h-5 w-5 text-amber-500" />}
              />
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!email || loading}
                className="bg-amber-800 hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
              >
                Enviar Instrucciones
              </Button>
              
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setForgotPassword(false)}
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  Volver a Iniciar Sesión
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
                required
                fullWidth
                className="transform hover:scale-105 transition-all duration-300"
              />
              
              <div className="relative">
                <Input
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  fullWidth
                  className="transform hover:scale-105 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  type="button"
                  onClick={() => setForgotPassword(true)}
                  className="text-amber-600 hover:text-amber-700 text-sm transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <button
                  type="button"
                  onClick={handleDevLogin}
                  className="text-amber-600 hover:text-amber-700 text-sm flex items-center transition-colors"
                >
                  <Shield size={16} className="mr-1" />
                  Dev Login
                </button>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={!email || !password || loading}
                className="bg-amber-800 hover:bg-amber-700 transform hover:scale-105 transition-all duration-300"
              >
                Iniciar Sesión
              </Button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-cream-100 text-amber-800">O</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-amber-800 text-sm">
                  ¿No tienes una cuenta?{' '}
                  <Link 
                    to="/register" 
                    className="text-amber-600 hover:text-amber-700 font-medium transition-colors hover:underline"
                  >
                    Regístrate
                  </Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}