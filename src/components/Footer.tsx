import React from 'react';
import { Language, NavigationPath } from '../types';
import { LOGO_URL } from '../data/mockData';

interface FooterProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="h-1.5 dhaka-pattern w-full"></div>
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Institute Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Surkhet Computer Institute Logo"
                className="h-10 w-auto object-contain bg-white p-1 rounded-xs"
                src={LOGO_URL}
                referrerPolicy="no-referrer"
              />
              <div className="font-serif text-base text-white font-bold">
                {lang === 'ne' ? 'सुर्खेत कम्प्युटर इन्स्टिच्युट' : 'Surkhet Computer Institute'}
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed text-justify">
              {lang === 'ne' ? (
                'कर्णाली प्रदेशका विद्यार्थी तथा युवाहरूलाई व्यावहारिक डिजिटल साक्षरता, व्यावसायिक कम्प्युटिङ, विश्वविद्यालय र लोकसेवा परीक्षा तयारी कक्षा प्रदान गर्दै आएको आधिकारिक संस्था।'
              ) : (
                'Dedicated to empowering the students and youth of Karnali Province through practical digital literacy, vocational computing, and syllabus-aligned university and public service commission (Loksewa) coaching.'
              )}
            </p>
            <div className="pt-2 border-t border-stone-800 text-xs text-stone-400">
              <span>{lang === 'ne' ? 'शिक्षा · सीप · सफलता' : 'Education · Skill · Success'}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Estd. 2068 B.S.</span>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 border-b border-stone-800 pb-2 mb-3">
              {lang === 'ne' ? 'पाठ्यक्रमहरू' : 'Academic Programs'}
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Diploma in Computer Application (DCA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Financial Accounting with Tally Prime
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Professional Office Package Specialist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Web Design &amp; Python Programming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Loksewa Computer Operator Preparation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  CTEVT Vocational Skills Training
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 border-b border-stone-800 pb-2 mb-3">
              {lang === 'ne' ? 'विद्यार्थी स्रोत सामग्री' : 'Student Resources'}
            </h3>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('study-materials')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mid-Western University Past Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('study-materials')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  TU BCA / BSc. CSIT Question Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('study-materials')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pradesh Lok Sewa Mock Examination Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lab Infrastructure &amp; Photo Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Examination Routines &amp; Circulars
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Credentials & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-200 border-b border-stone-800 pb-2 mb-3">
              {lang === 'ne' ? 'सम्पर्क तथा दर्ता' : 'Accreditation & Contact'}
            </h3>
            <div className="space-y-2 text-xs text-stone-400">
              <p>
                <strong className="text-stone-200 block">Surkhet Computer Institute</strong>
                Birendranagar-8, Surkhet, Karnali Province (50m East of MWU Gate)
              </p>
              <div>
                <span className="text-stone-500 block">Government Regd:</span>
                <span className="text-stone-300">21700 / PAN: 602391000</span>
              </div>
              <div>
                <span className="text-stone-500 block">Direct Admissions Desk:</span>
                <a href="tel:+9779848041820" className="text-stone-200 hover:text-white font-medium">
                  +977 984-8041820 / 083-520000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Surkhet Computer Institute &amp; Coaching Center Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={() => onNavigate('about-us')}
              className="hover:text-white cursor-pointer"
            >
              Institutional Profile
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => onNavigate('admin-login')}
              className="hover:text-white cursor-pointer"
            >
              Staff Portal
            </button>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white cursor-pointer"
            >
              Contact Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
