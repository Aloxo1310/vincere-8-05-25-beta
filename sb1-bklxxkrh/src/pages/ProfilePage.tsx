import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Mail, Key, Settings, Upload, Check, AlertCircle } from 'lucide-react';
import { updateProfile, uploadAvatar, getProfile } from '../lib/supabase';
import { toast } from 'sonner';

export default function ProfilePage() {
  useEffect(() => {
    document.title = 'Vincere Colors - Your Profile';
  }, []);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [nameColor, setNameColor] = useState(user?.name_color || '#B45309');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || '');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch latest profile data
    const fetchProfile = async () => {
      const { data, error } = await getProfile();
      if (!error && data) {
        setUsername(data.username || '');
        setEmail(data.email || '');
        setNameColor(data.name_color || '#B45309');
        setAvatarPreview(data.avatar_url || '');
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setAvatarFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    if (username.length > 20) {
      return 'El nombre de usuario no puede exceder 20 caracteres';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos';
    }
    return null;
  };

  const handleUpdateProfile = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // Validate username
      const usernameError = validateUsername(username);
      if (usernameError) {
        setError(usernameError);
        setLoading(false);
        return;
      }

      // Upload avatar if file is selected
      let avatarUrl = user?.avatar_url;
      if (avatarFile) {
        const { data: uploadData, error: uploadError } = await uploadAvatar(avatarFile);
        if (uploadError) {
          throw new Error('Error al subir la imagen de perfil');
        }
        avatarUrl = uploadData;
      }

      // Update profile
      const { error: updateError } = await updateProfile({
        username,
        email,
        avatar_url: avatarUrl,
        name_color: nameColor,
      });

      if (updateError) {
        throw new Error('Error al actualizar el perfil');
      }

      setSuccess('¡Perfil actualizado exitosamente!');
      setIsEditing(false);
      toast.success('Perfil actualizado exitosamente');
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-cream-50 min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-cream-100 rounded-lg shadow-md border border-amber-200 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeTab === 'profile'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeTab === 'account'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <Settings size={18} className="mr-2" />
                  Account Settings
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    activeTab === 'security'
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  <Key size={18} className="mr-2" />
                  Security
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-amber-200">
                <Button variant="outline" fullWidth onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-cream-100 rounded-lg shadow-md border border-amber-200 p-6">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-amber-900">
                      Your Profile
                    </h2>
                    <Button
                      variant={isEditing ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                      loading={loading}
                    >
                      {isEditing ? (
                        <>
                          <Check size={16} className="mr-1" /> Save Changes
                        </>
                      ) : (
                        'Edit Profile'
                      )}
                    </Button>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
                      {success}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-amber-100 border-2 border-amber-300 overflow-hidden">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-amber-200 text-amber-800">
                              <User size={36} />
                            </div>
                          )}
                        </div>

                        {isEditing && (
                          <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-amber-800 text-cream-50 p-1 rounded-full cursor-pointer hover:bg-amber-700 transition-colors"
                          >
                            <Upload size={16} />
                            <input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: nameColor }}
                      >
                        {username}
                      </h3>
                      <p className="text-amber-800">
                        <Mail size={16} className="inline mr-1" /> {email}
                      </p>
                      {isEditing && (
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-amber-800 mb-1">
                            Name Color
                          </label>
                          <input
                            type="color"
                            value={nameColor}
                            onChange={(e) => setNameColor(e.target.value)}
                            className="h-8 w-full max-w-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        fullWidth
                      />

                      <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        fullWidth
                      />
                    </div>
                  ) : (
                    <div className="bg-cream-50 rounded-md p-4 border border-amber-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-amber-600 mb-1">
                            Username
                          </h4>
                          <p className="text-amber-900">{username}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-amber-600 mb-1">
                            Email
                          </h4>
                          <p className="text-amber-900">{email}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-amber-600 mb-1">
                            Account Created
                          </h4>
                          <p className="text-amber-900">
                            {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Account Settings Tab */}
              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold text-amber-900">
                      Account Settings
                    </h2>
                    <p className="text-amber-800">
                      Manage your account details and preferences
                    </p>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
                      {success}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="bg-cream-50 rounded-md p-4 border border-amber-200">
                      <h3 className="text-lg font-bold text-amber-900 mb-4">
                        Profile Information
                      </h3>

                      <div className="space-y-4">
                        <Input
                          label="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          fullWidth
                        />

                        <Input
                          label="Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                        />

                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-1">
                            Profile Picture
                          </label>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 overflow-hidden">
                              {avatarPreview ? (
                                <img
                                  src={avatarPreview}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-amber-200 text-amber-800">
                                  <User size={18} />
                                </div>
                              )}
                            </div>

                            <label className="cursor-pointer">
                              <Button variant="outline" size="sm" as="span">
                                <Upload size={16} className="mr-1" /> Change
                              </Button>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-amber-900 mb-1">
                            Username Color
                          </label>
                          <div className="flex items-center space-x-4">
                            <input
                              type="color"
                              value={nameColor}
                              onChange={(e) => setNameColor(e.target.value)}
                              className="h-8 w-20"
                            />
                            <span className="text-amber-800">
                              Preview:{' '}
                              <span style={{ color: nameColor }}>
                                {username}
                              </span>
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          onClick={handleUpdateProfile}
                          loading={loading}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>

                    <div className="bg-cream-50 rounded-md p-4 border border-amber-200">
                      <h3 className="text-lg font-bold text-amber-900 mb-4">
                        Delete Account
                      </h3>
                      <p className="text-amber-800 mb-4">
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </p>
                      <Button
                        variant="outline"
                        className="text-red-500 border-red-500 hover:bg-red-50"
                        onClick={() =>
                          toast.error('Esta función aún no está disponible')
                        }
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold text-amber-900">
                      Security Settings
                    </h2>
                    <p className="text-amber-800">
                      Manage your password and security preferences
                    </p>
                  </div>

                  <div className="bg-cream-50 rounded-md p-4 border border-amber-200">
                    <h3 className="text-lg font-bold text-amber-900 mb-4">
                      Change Password
                    </h3>

                    <form className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="Enter your current password"
                        fullWidth
                      />

                      <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        fullWidth
                      />

                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm your new password"
                        fullWidth
                      />

                      <Button
                        variant="primary"
                        onClick={() => toast.error('Esta función aún no está disponible')}
                      >
                        Update Password
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}