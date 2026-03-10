import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, Globe, Star, Mail, Lock, User, ArrowRight } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = React.useState(true);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleAction = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            let data;
            if (isLogin) {
                data = await authService.login(formData.email, formData.password);
            } else {
                data = await authService.register(formData.name, formData.email, formData.password);
            }

            if (data.success) {
                navigate('/dashboard');
            } else {
                setError(data.message || 'Authentication failed. Please try again.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Connection error. Please check your backend.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-premium">
            <div className="login-bg-decor">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card-glass"
            >
                <div className="login-header">
                    <div className="logo-box-large">
                        <Zap size={32} fill="white" />
                    </div>
                    <h1>{isLogin ? 'Welcome back' : 'Join StuDash'}</h1>
                    <p>{isLogin ? 'Sign in to access your student dashboard.' : 'Create an account to track your academic journey.'}</p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.form 
                        key={isLogin ? 'login' : 'register'}
                        initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                        onSubmit={handleAction}
                        className="login-form-area"
                    >
                        {!isLogin && (
                            <div className="input-group-premium">
                                <label><User size={16} /> Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    required 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        )}
                        <div className="input-group-premium">
                            <label><Mail size={16} /> Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@college.edu" 
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="input-group-premium">
                            <label><Lock size={16} /> Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                required 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>

                        {error && <div className="login-error-toast">{error}</div>}

                        <button type="submit" className="login-submit-btn" disabled={isLoading}>
                            {isLoading ? (
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="loader-spinner-small"
                                />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </motion.form>
                </AnimatePresence>

                <div className="login-switch-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)} className="link-text">
                        {isLogin ? ' Sign Up' : ' Sign In'}
                    </span>
                </div>

                <div className="login-footer">
                    <p>By continuing, you agree to our <span className="link-text">Terms of Service</span></p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
