import React, { useState } from 'react';
import { Language, NavigationPath, CourseItem } from '../types';
import { COURSES } from '../data/mockData';

interface CoursesPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
  initialCourseId?: string;
  onOpenEnrollModal?: (course: CourseItem) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  lang,
  onNavigate,
  initialCourseId,
  onOpenEnrollModal
}) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem>(
    COURSES.find(c => c.id === initialCourseId) || COURSES[0]
  );
  const [enrollModalCourse, setEnrollModalCourse] = useState<CourseItem | null>(null);
  const [enrollName, setEnrollName] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [enrollShift, setEnrollShift] = useState('morning');
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const handleEnrollClick = (course: CourseItem) => {
    if (onOpenEnrollModal) {
      onOpenEnrollModal(course);
    } else {
      setEnrollModalCourse(course);
    }
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollName || !enrollPhone) return;
    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
      setEnrollModalCourse(null);
      setEnrollName('');
      setEnrollPhone('');
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7]">
      {/* Masthead */}
      <section className="bg-stone-50 border-b border-stone-200 py-8 lg:py-10 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              {lang === 'ne' ? 'प्रशिक्षण तथा पाठ्यक्रम विवरण · दर्ता नं: २१७००' : 'Academic Curriculum & Vocational Programs · Regd. 21700'}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#701518] font-bold">
              {lang === 'ne' ? 'व्यावसायिक कम्प्युटर पाठ्यक्रमहरू' : 'Vocational Computing & Coaching Programs'}
            </h1>
          </div>
          <div className="text-xs text-stone-600 font-medium">
            CTEVT &amp; Public Service Commission Aligned Standards
          </div>
        </div>
      </section>

      {/* Course Detail Split Screen */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Course Selection List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
              {lang === 'ne' ? 'उपलब्ध पाठ्यक्रमहरू' : 'Available Programs'}
            </h3>
            {COURSES.map((course) => {
              const isSelected = selectedCourse.id === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-4 border transition-all cursor-pointer rounded-xs shadow-xs ${
                    isSelected
                      ? 'bg-white border-[#701518] shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-mono font-semibold text-[#701518]">
                      {course.code}
                    </span>
                    <span className="text-stone-500 font-medium">
                      {lang === 'ne' ? course.durationNe : course.durationEn}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                    {lang === 'ne' ? course.titleNe : course.titleEn}
                  </h4>
                  <div className="mt-2 text-xs text-stone-600 font-medium">
                    {lang === 'ne' ? course.badgeNe : course.badgeEn}
                  </div>
                </button>
              );
            })}

            {/* Quick Registration Inquiry Card */}
            <div className="bg-white p-5 border border-stone-200 rounded-xs shadow-xs space-y-3 mt-6">
              <h4 className="font-serif text-sm font-bold text-stone-900">
                {lang === 'ne' ? 'नयाँ भर्ना तथा सिट बुकिङ' : 'Seat Reservation & Inquiries'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ne'
                  ? 'प्रत्येक ब्याचमा अधिकतम १५ जना मात्र विद्यार्थी राखिने हुनाले समयमै आफ्नो सिट सुरक्षित गर्नुहोस्।'
                  : 'To guarantee a 1:1 computer workstation ratio, batches are strictly capped at 15 scholars.'}
              </p>
              <button
                onClick={() => handleEnrollClick(selectedCourse)}
                className="w-full bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold py-2 px-3 transition-colors cursor-pointer rounded-xs"
              >
                {lang === 'ne' ? 'सिट बुकिङ गर्नुहोस्' : 'Reserve Seat Now'}
              </button>
            </div>
          </div>

          {/* Right Detailed Syllabus & Course Overview (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-stone-200 p-6 md:p-8 rounded-xs shadow-xs space-y-6">
            <div className="border-b border-stone-200 pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="font-mono font-bold text-[#701518]">{selectedCourse.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{lang === 'ne' ? selectedCourse.durationNe : selectedCourse.durationEn}</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  {lang === 'ne' ? selectedCourse.titleNe : selectedCourse.titleEn}
                </h2>
                <div className="text-xs text-stone-600 font-medium mt-1">
                  {lang === 'ne' ? selectedCourse.badgeNe : selectedCourse.badgeEn}
                </div>
              </div>

              <button
                onClick={() => handleEnrollClick(selectedCourse)}
                className="inline-flex items-center gap-1.5 bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold px-5 py-2.5 transition-colors cursor-pointer rounded-xs shadow-xs shrink-0"
              >
                <span className="material-symbols-outlined text-sm">how_to_reg</span>
                <span>{lang === 'ne' ? 'भर्ना आवेदन दिनुहोस्' : 'Enroll in Program'}</span>
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                {lang === 'ne' ? 'पाठ्यक्रमको उद्देश्य' : 'Course Objective & Focus'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
                {lang === 'ne' ? selectedCourse.descNe : selectedCourse.descEn}
              </p>
            </div>

            {/* Practical Modules Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                {lang === 'ne' ? 'प्रयोगात्मक तथा सैद्धान्तिक मोड्युलहरू' : 'Core Syllabus Modules & Topics'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedCourse.syllabus.map((mod, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                    <span className="font-semibold text-stone-900 block">
                      {mod.topic}
                    </span>
                    <p className="text-stone-500 text-[11px] leading-relaxed">
                      {mod.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Lab Focus & Shifts */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                {lang === 'ne' ? 'अभ्यास गराइने प्रविधि तथा शिफ्ट' : 'Practical Focus & Available Shifts'}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 bg-stone-100 text-stone-800 border border-stone-200 rounded-xs font-medium">
                  {lang === 'ne' ? selectedCourse.focusNe : selectedCourse.focusEn}
                </span>
                {selectedCourse.timings.map((time, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-stone-50 text-stone-600 border border-stone-200 rounded-xs">
                    Shift: {time}
                  </span>
                ))}
              </div>
            </div>

            {/* Institutional Certification Guarantee */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-1 text-xs">
              <span className="font-bold text-stone-900 block">
                {lang === 'ne' ? 'आधिकारिक प्रमाणपत्र तथा परीक्षा मापदण्ड' : 'Institutional Certification Guarantee'}
              </span>
              <p className="text-stone-600 leading-relaxed">
                {lang === 'ne'
                  ? 'पाठ्यक्रम सम्पन्न भएपछि प्रयोगात्मक परीक्षा र प्रोजेक्ट वर्कको आधारमा नेपाल सरकारको मान्यता प्राप्त आधिकारिक प्रमाणपत्र प्रदान गरिन्छ।'
                  : 'Upon satisfactory completion of lab assessments and project viva, an authorized graduation certificate verified under Govt. Regd. 21700 is awarded.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      {enrollModalCourse && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setEnrollModalCourse(null)}
        >
          <div 
            className="bg-white max-w-md w-full rounded-xs overflow-hidden shadow-2xl border border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#701518] font-bold">Seat Reservation</span>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {enrollModalCourse.titleEn}
                </h3>
              </div>
              <button 
                onClick={() => setEnrollModalCourse(null)}
                className="text-stone-500 hover:text-stone-900 p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form className="p-5 space-y-4 text-xs" onSubmit={handleEnrollSubmit}>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Full Name *</label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  placeholder="e.g. Ramesh Thapa"
                  required
                  type="text"
                  value={enrollName}
                  onChange={(e) => setEnrollName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Mobile Contact *</label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  placeholder="98XXXXXXXX"
                  required
                  type="tel"
                  value={enrollPhone}
                  onChange={(e) => setEnrollPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Preferred Time Shift</label>
                <select
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs cursor-pointer"
                  value={enrollShift}
                  onChange={(e) => setEnrollShift(e.target.value)}
                >
                  <option value="morning">Morning (6:30 AM – 8:30 AM)</option>
                  <option value="mid-morning">Mid-Morning (9:00 AM – 11:00 AM)</option>
                  <option value="day">Day (11:30 AM – 1:30 PM)</option>
                  <option value="evening">Evening (4:00 PM – 6:00 PM)</option>
                </select>
              </div>

              {enrollSuccess && (
                <div className="p-3 bg-stone-100 border border-stone-300 text-stone-800 rounded-xs">
                  <strong>Seat Reserved!</strong> Our admissions counselor will call you within 2 business hours.
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEnrollModalCourse(null)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs cursor-pointer font-semibold"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
