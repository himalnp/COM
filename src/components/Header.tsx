import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Lock, 
  ShieldCheck, 
  User, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import { Language, NavigationPath, StudentUser } from '../types';
import { LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isAdminAuthenticated: boolean;
  onAdminClick: () => void;
  currentUser: StudentUser | null;
  onOpenAuthModal: () => void;
  onStudentLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onLanguageChange,
  isAdminAuthenticated,
  onAdminClick,
  currentUser,
  onOpenAuthModal,
  onStudentLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { path: NavigationPath; labelNe: string; labelEn: string }[] = [
    { path: 'home', labelNe: 'गृहपृष्ठ', labelEn: 'Home' },
    { path: 'about-us', labelNe: 'हाम्रो बारेमा', labelEn: 'About' },
    { path: 'courses', labelNe: 'पाठ्यक्रमहरू', labelEn: 'Courses' },
    { path: 'study-materials', labelNe: 'प्रश्नपत्र बैंक', labelEn: 'Past Papers' },
    { path: 'gallery', labelNe: 'ग्यालरी', labelEn: 'Gallery' },
    { path: 'notices', labelNe: 'सूचनाहरू', labelEn: 'Notices' },
    { path: 'contact', labelNe: 'सम्पर्क', labelEn: 'Contact' }
  ];

  const handleNavClick = (path: NavigationPath) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf9f7] border-b border-stone-200 shadow-xs">
      {/* Top Institutional Information Strip - Fixed Height 28px, Never Wraps */}
      <div className="bg-[#1c1917] text-stone-300 px-3 sm:px-6 lg:px-10 h-7 flex items-center text-[11px] sm:text-xs border-b border-stone-800 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          {/* Location & Regd Info */}
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#f8c9c6] shrink-0" />
            <span className="truncate text-stone-200">
              {lang === 'ne' ? (
                <>
                  <span className="font-medium">वीरेन्द्रनगर-८, सुर्खेत</span>
                  <span className="hidden md:inline text-stone-400"> (मध्यपश्चिम वि.वि. गेट नजिक)</span>
                </>
              ) : (
                <>
                  <span className="font-medium">Birendranagar-8, Surkhet</span>
                  <span className="hidden md:inline text-stone-400"> (Near MWU Campus)</span>
                </>
              )}
            </span>
            <span className="hidden sm:inline text-stone-600">·</span>
            <span className="hidden sm:inline text-stone-400 font-mono text-[10px]">Regd. 21700</span>
          </div>

          {/* Hotline Contact & Hours */}
          <div className="flex items-center gap-3 shrink-0 text-stone-300">
            <a 
              href="tel:+9779848041820" 
              className="flex items-center gap-1 hover:text-white transition-colors font-mono"
            >
              <Phone className="w-3 h-3 text-[#f8c9c6] shrink-0" />
              <span>984-8041820</span>
            </a>
            <span className="hidden md:inline text-stone-600">·</span>
            <span className="hidden lg:inline text-stone-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#f8c9c6] shrink-0" />
              <span>{lang === 'ne' ? '६:०० - १८:००' : '6:00 AM - 6:00 PM'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Traditional Dhaka Ribbon Strip */}
      <div className="h-1 dhaka-pattern w-full"></div>

      {/* Main Branding & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 h-16 sm:h-[68px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Area */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none cursor-pointer group shrink-0 min-w-0"
        >
          <img 
            alt="Surkhet Computer Institute Logo" 
            className="h-9 sm:h-11 w-auto object-contain shrink-0 transition-transform group-hover:scale-102"
            src={LOGO_URL}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-sm sm:text-base lg:text-lg text-[#701518] tracking-tight leading-tight font-bold truncate">
              {lang === 'ne' ? 'सुर्खेत कम्प्युटर इन्स्टिच्युट' : 'Surkhet Computer Institute'}
            </span>
            <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium truncate hidden xs:inline">
              Coaching Center Pvt. Ltd. · Estd. 2068
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Visible on xl+ for comfortable spacing) */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-xs lg:text-[13px]">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 font-medium ${
                  isActive
                    ? 'text-[#701518] font-bold border-b-2 border-[#701518]'
                    : 'text-stone-700 hover:text-[#701518] border-b-2 border-transparent'
                }`}
              >
                {lang === 'ne' ? item.labelNe : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div 
            aria-label="Language Selector" 
            className="inline-flex items-center border border-stone-300 bg-white p-0.5 rounded text-[11px] sm:text-xs"
          >
            <button
              className={`px-1.5 sm:px-2 py-0.5 font-semibold transition-colors rounded ${
                lang === 'en' ? 'bg-[#701518] text-white' : 'text-stone-600 hover:text-stone-900 cursor-pointer'
              }`}
              onClick={() => onLanguageChange('en')}
              type="button"
            >
              EN
            </button>
            <span className="text-stone-300 px-0.5 select-none">/</span>
            <button
              className={`px-1.5 sm:px-2 py-0.5 font-semibold transition-colors rounded ${
                lang === 'ne' ? 'bg-[#701518] text-white' : 'text-stone-600 hover:text-stone-900 cursor-pointer'
              }`}
              onClick={() => onLanguageChange('ne')}
              type="button"
            >
              ने
            </button>
          </div>

          {/* Student Auth: Logged in Profile OR Login Button (Desktop / Tablet) */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold py-1.5 px-2 sm:px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-300 cursor-pointer transition-colors max-w-[130px] sm:max-w-none"
                type="button"
              >
                <User className="w-3.5 h-3.5 text-[#701518] shrink-0" />
                <span className="truncate">{currentUser.fullName.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-stone-500 shrink-0" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white border border-stone-300 rounded shadow-lg py-2 text-xs z-50">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <strong className="block text-stone-900 font-semibold truncate">{currentUser.fullName}</strong>
                    <span className="text-stone-500 text-[11px] block truncate">{currentUser.email}</span>
                    <span className="text-[#701518] text-[10px] font-medium block mt-0.5">Verified Registered Student</span>
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('courses');
                    }}
                    className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#701518]" />
                    <span>{lang === 'ne' ? 'पाठ्यक्रममा भर्ना हुनुहोस्' : 'Enroll in Programs'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('study-materials');
                    }}
                    className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>{lang === 'ne' ? 'प्रश्नपत्र खोज्नुहोस्' : 'Past Question Bank'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onStudentLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-red-700 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-stone-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-600" />
                    <span>{lang === 'ne' ? 'साइन आउट' : 'Sign Out'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold py-1.5 px-2.5 sm:px-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded cursor-pointer transition-colors shadow-2xs"
              type="button"
            >
              <User className="w-3.5 h-3.5 text-stone-600" />
              <span>{lang === 'ne' ? 'विद्यार्थी लगइन' : 'Student Login'}</span>
            </button>
          )}

          {/* Admin Button (Password Protected) */}
          <button
            onClick={onAdminClick}
            className={`inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold py-1.5 px-2 sm:px-2.5 border transition-colors cursor-pointer rounded shadow-2xs ${
              currentPath === 'admin-login' || isAdminAuthenticated
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
            }`}
            title="Administrative Staff Portal (Password Protected)"
            type="button"
          >
            {isAdminAuthenticated ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#f8c9c6]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-stone-600" />
            )}
            <span className="hidden xs:inline">{lang === 'ne' ? 'प्रशासन' : 'Admin'}</span>
          </button>

          {/* Mobile / Tablet Menu Drawer Toggle Button (Visible below xl) */}
          <button
            aria-controls="mobile-navigation-drawer"
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-1.5 text-stone-800 hover:text-[#701518] border border-stone-300 bg-white flex items-center justify-center cursor-pointer rounded hover:bg-stone-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-stone-900" />
            ) : (
              <Menu className="w-5 h-5 text-stone-900" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer" 
          className="xl:hidden bg-white border-b border-stone-300 px-4 py-4 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto"
        >
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left py-2 px-3 rounded transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#701518] text-white font-bold'
                      : 'text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <span>{lang === 'ne' ? item.labelNe : item.labelEn}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              );
            })}

            {/* Student Auth Section in Drawer */}
            <div className="pt-3 mt-2 border-t border-stone-200 flex flex-col gap-2">
              {currentUser ? (
                <div className="p-3 bg-stone-50 rounded border border-stone-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-stone-900 font-bold block text-xs">{currentUser.fullName}</span>
                      <span className="text-stone-500 text-[11px] block">{currentUser.email}</span>
                      <span className="text-stone-500 text-[11px] block font-mono">{currentUser.mobile}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onStudentLogout();
                      }}
                      className="text-xs text-red-700 hover:underline font-semibold px-2 py-1 bg-red-50 rounded border border-red-200 cursor-pointer"
                    >
                      {lang === 'ne' ? 'साइन आउट' : 'Sign Out'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full text-left py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded flex items-center justify-between text-xs font-semibold cursor-pointer border border-stone-200"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#701518]" />
                    <span>{lang === 'ne' ? 'विद्यार्थी लगइन / नयाँ दर्ता' : 'Student Login / Register'}</span>
                  </span>
                  <span className="text-[10px] text-stone-500">PORTAL</span>
                </button>
              )}

              {/* Admin Portal Button in Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminClick();
                }}
                className={`w-full text-left py-2.5 px-3 rounded flex items-center justify-between text-xs font-semibold cursor-pointer transition-colors ${
                  isAdminAuthenticated 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-800 hover:bg-stone-900 text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#f8c9c6]" />
                  <span>
                    {lang === 'ne' ? 'प्रशासन कक्ष (पासवर्ड सुरक्षित)' : 'Staff Admin (Password Protected)'}
                  </span>
                </span>
                <span className="text-[10px] text-stone-400 font-mono">STAFF</span>
              </button>

              {/* Quick Helpline in Drawer */}
              <div className="mt-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
                <span>Hotline: +977 984-8041820</span>
                <span>Sun - Fri: 6 AM - 6 PM</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
