import React, { useState, useEffect } from 'react';
import { Language, NavigationPath, GalleryItem } from '../types';

interface GalleryPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
  galleryItems: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  lang,
  onNavigate,
  galleryItems
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'lab') return item.category === 'lab';
    if (selectedCategory === 'classroom') return item.category === 'classroom';
    if (selectedCategory === 'loksewa') return item.category === 'loksewa' || item.category === 'exam';
    if (selectedCategory === 'events') return item.category === 'events' || item.category === 'ceremony';
    return true;
  });

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem = lightboxIndex !== null && filteredItems[lightboxIndex] ? filteredItems[lightboxIndex] : null;

  return (
    <div className="flex flex-col w-full bg-[#faf9f7]">
      {/* Archival Masthead */}
      <section className="w-full bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-8 lg:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
                {lang === 'ne' ? 'अभिलेख तथा गतिविधि प्रदर्शनी · दर्ता नं: २१७००' : 'Institutional Archives & Visual Records · Regd. 21700'}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#701518] tracking-tight font-bold">
                {lang === 'ne' ? 'फोटो ग्यालरी तथा प्रयोगशाला अभिलेख' : 'Institute Photo & Activity Gallery'}
              </h1>
            </div>
            <div className="text-xs text-stone-500 font-medium">
              <span>{lang === 'ne' ? 'शैक्षिक सत्र २०८०/०८१' : 'Session 2080/081'}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{galleryItems.length} {lang === 'ne' ? 'अभिलेख' : 'Records Catalogued'}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-4 max-w-4xl text-justify leading-relaxed">
            {lang === 'ne' ? (
              'सुर्खेत कम्प्युटर इन्स्टिच्युट एण्ड कोचिङ सेन्टर वीरेन्द्रनगरका आधुनिक कम्प्युटर ल्याब, लोकसेवा कम्प्युटर अपरेटर प्राविधिक तयारी, मध्यपश्चिम विश्वविद्यालय सम्बद्ध ट्युसन कक्षा, तथा दीक्षान्त/प्रमाणपत्र वितरण कार्यक्रमका प्रामाणिक तस्बिरहरू।'
            ) : (
              'Archival photographs documenting high-density workstation labs, dual typing suites (Nepali Unicode / Preeti), Public Service Commission (Loksewa) practical orientations, Mid-Western University coaching cohorts, and credential convocation assemblies in Birendranagar, Surkhet.'
            )}
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-8">
        {/* Category Filter Tabs (Segmented Control, Not Candy Badges) */}
        <div className="border border-stone-200 bg-white p-1 mb-6 rounded-xs overflow-x-auto shadow-xs">
          <div className="flex items-center gap-1 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-xs ${
                selectedCategory === 'all'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {lang === 'ne' ? 'सबै तस्बिरहरू' : 'All Records'}
            </button>
            <button
              onClick={() => setSelectedCategory('lab')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-xs ${
                selectedCategory === 'lab'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {lang === 'ne' ? 'कम्प्युटर ल्याब' : 'Labs & Workstations'}
            </button>
            <button
              onClick={() => setSelectedCategory('classroom')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-xs ${
                selectedCategory === 'classroom'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {lang === 'ne' ? 'कक्षा कोठा' : 'Classrooms & Coaching'}
            </button>
            <button
              onClick={() => setSelectedCategory('loksewa')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-xs ${
                selectedCategory === 'loksewa'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {lang === 'ne' ? 'लोकसेवा तयारी' : 'Loksewa & Exam Prep'}
            </button>
            <button
              onClick={() => setSelectedCategory('events')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer rounded-xs ${
                selectedCategory === 'events'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {lang === 'ne' ? 'दीक्षान्त तथा प्रमाणपत्र' : 'Ceremonies & Events'}
            </button>
          </div>
        </div>

        {/* Status Count Line */}
        <div className="flex items-center justify-between mb-4 text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-900">{filteredItems.length}</strong> photographs
          </div>
          <div className="text-stone-500">
            {lang === 'ne' ? 'विस्तृत दृश्यको लागि तस्बिरमा क्लिक गर्नुहोस्' : 'Click to enlarge image'}
          </div>
        </div>

        {/* Gallery Grid (Clean Editorial Cards, Zero Floating Pill Capsules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className="bg-white border border-stone-200 hover:border-stone-400 transition-colors flex flex-col group shadow-xs rounded-xs overflow-hidden"
            >
              {/* Image Frame */}
              <div
                className="relative overflow-hidden aspect-[4/3] bg-stone-100 cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  src={item.imageUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Clean Typographic Metadata Content */}
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Unboxed Metadata with Typographic Separator */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-medium text-[#701518]">
                      {lang === 'ne' ? item.categoryLabelNe : item.categoryLabelEn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{lang === 'ne' ? item.dateNe : item.dateEn}</span>
                    {item.batch && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-[11px]">{item.batch}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-[#701518] transition-colors leading-snug">
                    {lang === 'ne' ? item.titleNe : item.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed text-justify line-clamp-3">
                    {lang === 'ne' ? item.descNe : item.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[11px]">
                    {item.locationNe && lang === 'ne' ? item.locationNe : item.locationEn || item.leadEn}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(index)}
                    className="text-[#701518] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'ne' ? 'पूर्ण दृश्य' : 'View full'}</span>
                    <span className="material-symbols-outlined text-xs">zoom_in</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Alumnus Verification Section (Solid Institutional Card, No Dashed Placeholder) */}
        <div className="mt-12 bg-white border border-stone-200 p-6 sm:p-8 rounded-xs shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-base font-bold text-stone-900">
              {lang === 'ne' ? 'के तपाईं हाम्रो पूर्व विद्यार्थी हुनुहुन्छ?' : 'Are you an Institute Alumnus?'}
            </h3>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              {lang === 'ne' ? (
                'आफ्नो ब्याचको समूह तस्बिर वा प्रमाणपत्र अभिलेख प्रमाणित प्रतिलिपि लिन आवश्यक परेमा हाम्रो प्रशासनिक शाखामा सम्पर्क गर्न सक्नुहुन्छ।'
              ) : (
                'If you require high-resolution archive prints of your batch graduation or official credential register verifications, please file a request with our Birendranagar administrative counter.'
              )}
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold px-5 py-2.5 transition-colors cursor-pointer rounded-xs shrink-0"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            <span>{lang === 'ne' ? 'प्रशासन शाखामा सम्पर्क' : 'Contact Administrative Desk'}</span>
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="bg-white max-w-4xl w-full rounded-xs overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-xs font-semibold text-[#701518]">
                  {lang === 'ne' ? activeItem.categoryLabelNe : activeItem.categoryLabelEn}
                </span>
                <h3 className="font-serif text-base font-bold text-stone-900 leading-tight">
                  {lang === 'ne' ? activeItem.titleNe : activeItem.titleEn}
                </h3>
              </div>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="text-stone-500 hover:text-stone-900 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Modal Image Frame */}
            <div className="bg-stone-950 flex items-center justify-center relative overflow-hidden flex-1 min-h-[300px]">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.titleEn}
                className="max-h-[60vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
              {/* Prev / Next buttons */}
              <button
                onClick={() => setLightboxIndex((lightboxIndex > 0 ? lightboxIndex - 1 : filteredItems.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-colors"
                title="Previous image"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button
                onClick={() => setLightboxIndex((lightboxIndex < filteredItems.length - 1 ? lightboxIndex + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-colors"
                title="Next image"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-white border-t border-stone-200 space-y-1 text-xs">
              <div className="flex items-center gap-3 text-stone-500">
                <span>{lang === 'ne' ? activeItem.dateNe : activeItem.dateEn}</span>
                <span aria-hidden="true">·</span>
                <span>{activeItem.size}</span>
                {activeItem.batch && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{activeItem.batch}</span>
                  </>
                )}
              </div>
              <p className="text-stone-700 leading-relaxed">
                {lang === 'ne' ? activeItem.descNe : activeItem.descEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
