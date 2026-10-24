import React, { useState } from 'react';
import { Language } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  lang: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lang
}) => {
  const [passkey, setPasskey] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default institutional passkey: admin2081 or admin
    const trimmed = passkey.trim();
    if (trimmed === 'admin2081' || trimmed === 'admin' || trimmed === 'surkhet2081') {
      setErrorMsg('');
      setPasskey('');
      onSuccess();
    } else {
      setErrorMsg(
        lang === 'ne' 
          ? 'गलत पासवर्ड! कृपया आधिकारिक प्रशासनिक पासकी प्रविष्ट गर्नुहोस्।' 
          : 'Incorrect passkey. Please enter authorized staff credentials.'
      );
    }
  };

  const handleFillDemo = () => {
    setPasskey('admin2081');
    setErrorMsg('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-md w-full rounded-xs shadow-2xl border border-stone-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#f8c9c6] text-xl">
              lock
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-white leading-tight">
                {lang === 'ne' ? 'प्रशासनिक लगइन (Admin Access)' : 'Administrative Staff Clearance'}
              </h3>
              <span className="text-[11px] text-stone-400">
                Surkhet Computer Institute · Regd. 21700
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleLoginSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
            <span className="font-semibold text-stone-900 block">
              {lang === 'ne' ? 'सुरक्षित प्रशासनिक पहुँच' : 'Password Protected Area'}
            </span>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              {lang === 'ne'
                ? 'यो क्षेत्र संस्थाका अधिकृत कर्मचारी तथा प्रशासकहरूका लागि मात्र हो। विद्यार्थी भर्ना अभिलेख र प्रश्नपत्र अपलोड व्यवस्थापन गर्न लगइन गर्नुहोस्।'
                : 'This portal allows authorized faculty to inspect student enrollments, manage question paper banks with advanced settings, and update media ledgers.'}
            </p>
          </div>

          <div>
            <label className="block text-stone-700 font-semibold mb-1" htmlFor="adminPasskeyInput">
              {lang === 'ne' ? 'प्रशासकीय पासकी / पासवर्ड *' : 'Admin Passkey / Password *'}
            </label>
            <div className="relative">
              <input
                id="adminPasskeyInput"
                type={showPasskey ? 'text' : 'password'}
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                required
                autoFocus
                placeholder="Enter admin passkey..."
                className="w-full bg-stone-50 border border-stone-300 pl-3 pr-10 py-2.5 text-xs text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
              />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                title={showPasskey ? 'Hide passkey' : 'Show passkey'}
              >
                <span className="material-symbols-outlined text-base">
                  {showPasskey ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-red-50 border border-red-200 text-red-800 rounded-xs text-[11px] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-red-600">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Demo Helper */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-stone-500">
            <span>Passkey hint: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700 font-mono">admin2081</code></span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#701518] hover:underline font-semibold cursor-pointer"
            >
              Fill Demo Key
            </button>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs cursor-pointer font-medium"
            >
              {lang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">lock_open</span>
              <span>{lang === 'ne' ? 'प्रवेश गर्नुहोस्' : 'Authenticate & Enter'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
