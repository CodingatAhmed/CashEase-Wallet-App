import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Eye, EyeOff, Check, X, Mail, Lock, AlertCircle } from 'lucide-react';

interface SignupFormProps {
  onSignup: () => void;
}

export function SignupForm({ onSignup }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Validation states
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Real-time validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    setPasswordCriteria(criteria);
    const strength = Object.values(criteria).filter(Boolean).length;
    setPasswordStrength(strength);
    setPasswordValid(strength >= 4);
  }, [password]);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword && confirmPassword.length > 0);
  }, [password, confirmPassword]);

  const markFieldTouched = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const getFieldValidationState = (field: string) => {
    if (!touchedFields[field]) return null;

    switch (field) {
      case 'email':
        return emailValid ? 'valid' : 'invalid';
      case 'password':
        return passwordValid ? 'valid' : 'invalid';
      case 'confirmPassword':
        return passwordMatch ? 'valid' : 'invalid';
      default:
        return null;
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched for validation display
    setTouchedFields({
      email: true,
      password: true,
      confirmPassword: true
    });

    if (!emailValid || !passwordValid || !passwordMatch) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission with progress
    setTimeout(() => {
      setIsSubmitting(false);
      onSignup();
    }, 2000);
  };

  const isFormValid = emailValid && passwordValid && passwordMatch;

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mr-4 shadow-lg hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-2xl">G</span>
            </div>
            <span className="text-4xl font-black text-gray-900">CashEase</span>
          </div>
          <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>Create your account to get started</p>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${emailValid ? 'bg-green-500 scale-110' : 'bg-gray-200'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${passwordValid ? 'bg-green-500 scale-110' : 'bg-gray-200'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${passwordMatch ? 'bg-green-500 scale-110' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Sign Up</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <div className="relative text-black">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => {
                    setFocusedField(null);
                    markFieldTouched('email');
                  }}
                  className={`w-full h-12 px-4 pr-10 border rounded-lg bg-gray-50 focus:bg-white transition-all duration-300 placeholder-gray-400 ${focusedField === 'email' ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20 scale-[1.02]' :
                    getFieldValidationState('email') === 'valid' ? 'border-green-500 bg-green-50' :
                      getFieldValidationState('email') === 'invalid' ? 'border-red-500 bg-red-50' :
                        'border-gray-200'
                    }`}
                  required
                />
                {getFieldValidationState('email') === 'valid' && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-scale-in" />
                )}
                {getFieldValidationState('email') === 'invalid' && (
                  <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500 animate-scale-in" />
                )}
              </div>
              {getFieldValidationState('email') === 'invalid' && (
                <div className="flex items-center text-red-500 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Please enter a valid email address
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <div className="relative text-black">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => {
                    setFocusedField(null);
                    markFieldTouched('password');
                  }}
                  className={`w-full h-12 px-4 pr-20 border rounded-lg bg-gray-50 focus:bg-white transition-all duration-300 placeholder-gray-400 ${focusedField === 'password' ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20 scale-[1.02]' :
                    getFieldValidationState('password') === 'valid' ? 'border-green-500 bg-green-50' :
                      getFieldValidationState('password') === 'invalid' ? 'border-red-500 bg-red-50' :
                        'border-gray-200'
                    }`}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {getFieldValidationState('password') === 'valid' && (
                    <Check className="w-5 h-5 text-green-500 animate-scale-in" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Password Strength:</span>
                    <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-500' :
                      passwordStrength <= 3 ? 'text-yellow-500' :
                        passwordStrength <= 4 ? 'text-blue-500' :
                          'text-green-500'
                      }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'length', text: '8+ characters' },
                      { key: 'uppercase', text: 'Uppercase letter' },
                      { key: 'lowercase', text: 'Lowercase letter' },
                      { key: 'number', text: 'Number' }
                    ].map(({ key, text }) => (
                      <div key={key} className={`flex items-center ${passwordCriteria[key as keyof typeof passwordCriteria] ? 'text-green-600' : 'text-gray-400'}`}>
                        {passwordCriteria[key as keyof typeof passwordCriteria] ?
                          <Check className="w-3 h-3 mr-1" /> :
                          <div className="w-3 h-3 border border-gray-300 rounded-full mr-1"></div>
                        }
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Confirm Password
              </Label>
              <div className="relative text-black">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => {
                    setFocusedField(null);
                    markFieldTouched('confirmPassword');
                  }}
                  className={`w-full h-12 px-4 pr-20 border rounded-lg bg-gray-50 focus:bg-white transition-all duration-300 placeholder-gray-400 ${focusedField === 'confirmPassword' ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20 scale-[1.02]' :
                    getFieldValidationState('confirmPassword') === 'valid' ? 'border-green-500 bg-green-50' :
                      getFieldValidationState('confirmPassword') === 'invalid' ? 'border-red-500 bg-red-50' :
                        'border-gray-200'
                    }`}
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {getFieldValidationState('confirmPassword') === 'valid' && (
                    <Check className="w-5 h-5 text-green-500 animate-scale-in" />
                  )}
                  {getFieldValidationState('confirmPassword') === 'invalid' && (
                    <X className="w-5 h-5 text-red-500 animate-scale-in" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {getFieldValidationState('confirmPassword') === 'invalid' && (
                <div className="flex items-center text-red-500 text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Passwords do not match
                </div>
              )}
            </div>

            {/* Signup Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`w-full h-12 font-semibold rounded-lg shadow-lg transition-all duration-300 transform ${isFormValid && !isSubmitting
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white hover:scale-[1.02] hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Create Account
                    {isFormValid && <Check className="w-5 h-5 ml-2 animate-bounce" />}
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}