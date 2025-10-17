import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const mockUsers = {
        'admin@slot.com': { 
          id: '1', 
          name: 'Super Admin', 
          email: 'admin@slot.com', 
          role: 'admin',
          status: 'approved'
        },
        'manager@slot.com': { 
          id: '2', 
          name: 'Manager User', 
          email: 'manager@slot.com', 
          role: 'manager',
          status: 'approved'
        },
        'user@slot.com': { 
          id: '3', 
          name: 'Regular User', 
          email: 'user@slot.com', 
          role: 'user',
          status: 'approved'
        }
      };

      if (mockUsers[email] && password === 'password123') {
        const userData = mockUsers[email];
        const token = 'mock-jwt-token-' + userData.id;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role);
        
        setUser(userData);
        toast.success(`✓ Welcome back, ${userData.name}!`);
        navigate('/dashboard');
        return { success: true };
      } else {
        toast.error('✗ Invalid email or password');
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      toast.error('Login failed');
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      toast.info('✓ Registration successful! Waiting for admin approval.');
      navigate('/login');
      return { success: true };
    } catch (error) {
      toast.error('Registration failed');
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const value = {
    user,
    login,
    register,
    logout,
    hasRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


