import React, { useState } from 'react';
import { Language, NavigationPath, NoticeItem } from '../types';
import { NOTICES } from '../data/mockData';

interface NoticesPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ lang, onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const filteredNotices = NOTICES.filter((n) => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  return (
    <div className="flex flex-col w-full bg-[#faf9f7]">
      {/* Masthead */}
      <section className="bg-stone-50 border-b border-stone-200 py-8 lg:py-10 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              {lang === 'ne' ? 'आधिकारिक सूचना तथा परीक्षा तालिका' : 'Official Notices & Examination Routines'}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#701518] font-bold">
              {lang === 'ne' ? 'सूचना तथा परिपत्रहरू' : 'Notices & Circulars'}
            </h1>
          </div>
          <div className="text-xs text-stone-500 font-medium">
            Academic Year 2081 B.S. · Birendranagar-8
          </div>
        </div>
      </section>

      {/* Main Notice Board */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter buttons (Segmented Control) */}
            <div className="border border-stone-200 bg-white p-1 rounded-xs flex items-center gap-1 overflow-x-auto shadow-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer rounded-xs transition-colors ${
                  filter === 'all'
                    ? 'bg-[#701518] text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                All Circulars
              </button>
              <button
                onClick={() => setFilter('exam')}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer rounded-xs transition-colors ${
                  filter === 'exam'
                    ? 'bg-[#701518] text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Examination &amp; Routines
              </button>
              <button
                onClick={() => setFilter('admission')}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer rounded-xs transition-colors ${
                  filter === 'admission'
                    ? 'bg-[#701518] text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Admissions
              </button>
              <button
                onClick={() => setFilter('event')}
                className={`px-3.5 py-1.5 text-xs font-medium cursor-pointer rounded-xs transition-colors ${
                  filter === 'event'
                    ? 'bg-[#701518] text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                Student Services
              </button>
            </div>

            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <article
                  key={notice.id}
                  className="bg-white border border-stone-200 hover:border-stone-400 p-5 rounded-xs shadow-xs transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      {notice.isUrgent && (
                        <span className="font-semibold text-[#701518]">
                          {lang === 'ne' ? 'अत्यन्त जरुरी' : 'Urgent'}
                        </span>
                      )}
                      {notice.isUrgent && <span aria-hidden="true">·</span>}
                      <span className="text-stone-600">
                        {notice.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[11px]">NOT-2081-{notice.id.toUpperCase()}</span>
                    </div>
                    <span className="text-stone-500">
                      {lang === 'ne' ? notice.dateNe : notice.dateEn}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                    {lang === 'ne' ? notice.titleNe : notice.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed text-justify">
                    {lang === 'ne' ? notice.contentNe : notice.contentEn}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 text-[11px]">
                      Surkhet Computer Institute · Academic Administration
                    </span>
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="text-[#701518] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'ne' ? 'विस्तृत हेर्नुहोस्' : 'View Full Details'}</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Key Deadlines & Helpline (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white border border-stone-200 p-5 rounded-xs shadow-xs space-y-4">
              <h3 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                {lang === 'ne' ? 'महत्वपूर्ण मिति तथा समयसीमा' : 'Upcoming Academic Milestones'}
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                  <span className="text-stone-500 text-[11px]">BSc. CSIT / BCA Form Deadline</span>
                  <strong className="block text-stone-900">२०८१ जेठ १५ गते सम्म</strong>
                  <p className="text-stone-500 text-[11px]">Mid-Western University semester exam forms.</p>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                  <span className="text-stone-500 text-[11px]">Loksewa Operator Mock Exam</span>
                  <strong className="block text-stone-900">प्रत्येक शनिबार बिहान ७:०० बजे</strong>
                  <p className="text-stone-500 text-[11px]">Hands-on practical typing and theory simulation.</p>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                  <span className="text-stone-500 text-[11px]">DCA New Batch Orientation</span>
                  <strong className="block text-stone-900">२०८१ जेठ २० गते</strong>
                  <p className="text-stone-500 text-[11px]">Classroom induction for newly enrolled students.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200 p-5 rounded-xs shadow-xs space-y-3">
              <h3 className="font-serif text-sm font-bold text-stone-900">
                {lang === 'ne' ? 'सूचना शाखा सोधपुछ' : 'Notice Inquiries'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ne' 
                  ? 'कुनै सूचना वा परीक्षा तालिका सम्बन्धी थप जानकारी चाहिएमा संस्थाको सोधपुछ शाखामा सम्पर्क गर्न सक्नुहुन्छ।' 
                  : 'For clarifications regarding examination routines or circulars, contact our administrative desk.'}
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold py-2 px-3 transition-colors cursor-pointer rounded-xs"
              >
                {lang === 'ne' ? 'सम्पर्क शाखा' : 'Contact Helpdesk'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Modal */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            className="bg-white max-w-lg w-full rounded-xs overflow-hidden shadow-2xl border border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-stone-500">NOT-2081-{selectedNotice.id.toUpperCase()}</span>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {lang === 'ne' ? selectedNotice.titleNe : selectedNotice.titleEn}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)}
                className="text-stone-500 hover:text-stone-900 p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="flex items-center gap-3 text-stone-500 pb-2 border-b border-stone-100">
                <span>Date: {lang === 'ne' ? selectedNotice.dateNe : selectedNotice.dateEn}</span>
                <span aria-hidden="true">·</span>
                <span>Category: {selectedNotice.categoryLabel}</span>
              </div>
              <p className="text-stone-700 leading-relaxed text-justify text-sm">
                {lang === 'ne' ? selectedNotice.contentNe : selectedNotice.contentEn}
              </p>
              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
