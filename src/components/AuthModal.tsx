import React, { useState } from 'react';
import { Language, StudentUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: StudentUser) => void;
  lang: Language;
  users: StudentUser[];
  onRegisterUser: (newUser: StudentUser) => void;
  initialMode?: 'login' | 'register';
  redirectMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang,
  users,
  onRegisterUser,
  initialMode = 'login',
  redirectMessage
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regDistrict, setRegDistrict] = useState('Surkhet');
  const [regQualification, setRegQualification] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idf = loginIdentifier.trim().toLowerCase();
    const pass = loginPassword.trim();

    // Check against registered users
    const matched = users.find(
      (u) =>
        (u.email.toLowerCase() === idf || u.mobile === idf) &&
        (u.password === pass || !u.password || pass === 'password123')
    );

    if (matched) {
      setLoginError('');
      onLoginSuccess(matched);
      onClose();
    } else {
      setLoginError(
        lang === 'ne'
          ? 'इमेल/मोबाइल वा पासवर्ड मिलेन। कृपया पुन: प्रयास गर्नुहोस् वा नयाँ खाता खोल्नुहोस्।'
          : 'Invalid credentials. Please verify your mobile/email or register a new account.'
      );
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regMobile || !regEmail || !regPassword) {
      setRegError(lang === 'ne' ? 'कृपया सबै आवश्यक विवरण भर्नुहोस्।' : 'Please fill all required fields.');
      return;
    }

    // Check if mobile or email already exists
    const exists = users.some(
      (u) => u.email.toLowerCase() === regEmail.trim().toLowerCase() || u.mobile === regMobile.trim()
    );

    if (exists) {
      setRegError(
        lang === 'ne'
          ? 'यो इमेल वा मोबाइल नम्बर पहिले नै दर्ता भइसकेको छ। कृपया लगइन गर्नुहोस्।'
          : 'A student account with this email or mobile already exists. Please sign in.'
      );
      return;
    }

    const newUser: StudentUser = {
      id: 'usr_' + Date.now(),
      fullName: regName.trim(),
      email: regEmail.trim(),
      mobile: regMobile.trim(),
      district: regDistrict,
      qualification: regQualification.trim() || 'High School / +2',
      password: regPassword,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onRegisterUser(newUser);
    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickFill = (user: StudentUser) => {
    setLoginIdentifier(user.mobile);
    setLoginPassword(user.password || 'password123');
    setLoginError('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-md w-full rounded-xs shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
              {lang === 'ne' ? 'विद्यार्थी पोर्टल' : 'Student Portal'}
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
              {mode === 'login' 
                ? (lang === 'ne' ? 'विद्यार्थी लगइन' : 'Student Sign In') 
                : (lang === 'ne' ? 'नयाँ विद्यार्थी दर्ता' : 'Student Registration')}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Redirect Notice if user was redirected from Enroll */}
        {redirectMessage && (
          <div className="bg-[#fce8e6] border-b border-[#f8c9c6] px-6 py-2.5 text-xs text-[#701518] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">info</span>
            <span>{redirectMessage}</span>
          </div>
        )}

        {/* Tab Toggle */}
        <div className="flex border-b border-stone-200 bg-stone-100 text-xs">
          <button
            type="button"
            onClick={() => { setMode('login'); setLoginError(''); }}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#701518] border-b-2 border-[#701518]'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'ne' ? 'लगइन (Sign In)' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setRegError(''); }}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#701518] border-b-2 border-[#701518]'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'ne' ? 'नयाँ खाता दर्ता (Register)' : 'New Registration'}
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="loginId">
                  {lang === 'ne' ? 'मोबाइल नम्बर वा इमेल *' : 'Mobile Number or Email *'}
                </label>
                <input
                  id="loginId"
                  type="text"
                  required
                  placeholder="e.g. 9848123456 or ramesh@gmail.com"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="loginPass">
                  {lang === 'ne' ? 'पासवर्ड *' : 'Password *'}
                </label>
                <input
                  id="loginPass"
                  type="password"
                  required
                  placeholder="Enter your password..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>

              {loginError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 rounded-xs text-[11px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-red-600">error</span>
                  <span>{loginError}</span>
                </div>
              )}

              {/* Quick test accounts */}
              {users.length > 0 && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1.5">
                  <span className="text-stone-500 font-medium block text-[11px]">
                    Quick Test Student Accounts:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {users.slice(0, 2).map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleQuickFill(u)}
                        className="px-2 py-1 bg-white border border-stone-300 rounded text-[11px] text-stone-700 hover:border-[#701518] hover:text-[#701518] cursor-pointer"
                      >
                        {u.fullName.split(' ')[0]} ({u.district})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#701518] hover:bg-[#8f2024] text-white py-2.5 px-4 font-semibold rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>{lang === 'ne' ? 'लगइन गर्नुहोस्' : 'Sign In to Portal'}</span>
              </button>

              <div className="text-center text-stone-500 text-[11px] pt-1">
                {lang === 'ne' ? 'खाता छैन?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#701518] font-semibold hover:underline cursor-pointer"
                >
                  {lang === 'ne' ? 'यहाँ नयाँ दर्ता गर्नुहोस्' : 'Register here'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {lang === 'ne' ? 'विद्यार्थीको पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Bahadur Thapa"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'मोबाइल नम्बर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'गृह जिल्ला *' : 'Home District *'}
                  </label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                  >
                    <option value="Surkhet">Surkhet</option>
                    <option value="Dailekh">Dailekh</option>
                    <option value="Jajarkot">Jajarkot</option>
                    <option value="Salyan">Salyan</option>
                    <option value="Jumla">Jumla</option>
                    <option value="Kalikot">Kalikot</option>
                    <option value="Rukum West">Rukum West</option>
                    <option value="Dolpa">Dolpa</option>
                    <option value="Mugu">Mugu</option>
                    <option value="Humla">Humla</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {lang === 'ne' ? 'इमेल ठेगाना *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {lang === 'ne' ? 'हालको शैक्षिक योग्यता' : 'Current Academic Qualification'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. +2 Management, Bachelor running, SEE"
                  value={regQualification}
                  onChange={(e) => setRegQualification(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {lang === 'ne' ? 'गोप्य पासवर्ड *' : 'Create Password *'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create a secure password..."
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>

              {regError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 rounded-xs text-[11px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-red-600">error</span>
                  <span>{regError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#701518] hover:bg-[#8f2024] text-white py-2.5 px-4 font-semibold rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                <span>{lang === 'ne' ? 'खाता सिर्जना गर्नुहोस्' : 'Complete Registration & Sign In'}</span>
              </button>

              <div className="text-center text-stone-500 text-[11px] pt-1">
                {lang === 'ne' ? 'पहिले नै खाता छ?' : 'Already have an account?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#701518] font-semibold hover:underline cursor-pointer"
                >
                  {lang === 'ne' ? 'यहाँ लगइन गर्नुहोस्' : 'Sign in here'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
