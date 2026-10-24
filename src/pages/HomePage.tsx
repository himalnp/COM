import React, { useState } from 'react';
import { Language, NavigationPath } from '../types';
import { DIRECTOR_AVATAR, COURSES, QUESTION_PAPERS } from '../data/mockData';

interface HomePageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
  onSelectCourse?: (courseId: string) => void;
  onPreviewPaper?: (title: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectCourse,
  onPreviewPaper
}) => {
  const [paperFilter, setPaperFilter] = useState('');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCourse, setInquiryCourse] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const filteredPapers = QUESTION_PAPERS.slice(0, 4).filter((paper) => {
    if (!paperFilter.trim()) return true;
    const q = paperFilter.toLowerCase();
    return (
      paper.title.toLowerCase().includes(q) ||
      paper.titleNe.toLowerCase().includes(q) ||
      paper.groupName.toLowerCase().includes(q) ||
      paper.details.toLowerCase().includes(q)
    );
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone || !inquiryCourse) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryPhone('');
      setInquiryCourse('');
      setInquiryMsg('');
    }, 400);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7]">
      {/* Editorial Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                {lang === 'ne' 
                  ? 'कर्णाली प्रदेश प्राविधिक शिक्षा केन्द्र · वीरेन्द्रनगर, सुर्खेत' 
                  : 'Karnali Province ICT Training Centre · Birendranagar, Surkhet'}
              </div>

              <h1 
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-[1.18] font-bold"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'ne' ? (
                  <>
                    व्यावहारिक कम्प्युटर सीप,<br />
                    <span className="text-[#701518] font-normal italic">सुनिश्चित भविष्यको आधार।</span>
                  </>
                ) : (
                  <>
                    Learn. Practice.<br />
                    <span className="text-[#701518] font-normal italic">Build Your Future.</span>
                  </>
                )}
              </h1>

              <div className="py-1">
                <span className="text-sm sm:text-base text-stone-700 font-serif italic">
                  {lang === 'ne' 
                    ? 'शिक्षा · सीप · सफलता — दक्ष जनशक्ति निर्माणमा समर्पित' 
                    : 'Education · Skill · Success — Dedicated to Technical Excellence'}
                </span>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed max-w-2xl text-justify">
                {lang === 'ne' ? (
                  'मध्यपश्चिम विश्वविद्यालय केन्द्रीय क्याम्पस मुख्य गेटबाट ५० मिटर पूर्वमा अवस्थित सुर्खेत कम्प्युटर इन्स्टिच्युटले कर्णाली प्रदेशका विद्यार्थीहरूलाई व्यावहारिक कम्प्युटर तालिम, विश्वविद्यालय ट्युसन कक्षा, तथा विगतका परीक्षा प्रश्नपत्रहरूको प्रामाणिक डिजिटल भण्डार उपलब्ध गराउँदै आएको छ।'
                ) : (
                  'Situated 50 metres east of Mid-Western University Central Campus Gate in Birendranagar, we provide grounded, practical computer education, university semester coaching, and Karnali province’s most comprehensive archive of past examination question papers.'
                )}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="space-y-8 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('courses')}
                  className="inline-flex items-center gap-2 bg-[#701518] text-white hover:bg-[#8f2024] text-xs font-semibold px-6 py-3 transition-colors cursor-pointer rounded shadow-xs"
                >
                  <span>{lang === 'ne' ? 'पाठ्यक्रमहरू हेर्नुहोस्' : 'Explore Courses'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('study-materials')}
                  className="inline-flex items-center gap-2 bg-white text-stone-800 hover:text-[#701518] hover:bg-stone-50 text-xs font-semibold px-6 py-3 border border-stone-300 transition-colors cursor-pointer rounded shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  <span>{lang === 'ne' ? 'निःशुल्क प्रश्नपत्र बैंक' : 'Browse Question Papers'}</span>
                </button>
              </div>

              {/* Clean Typographic Trust Markers (Zero Pill Enclosures) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200 text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block mb-0.5">
                    {lang === 'ne' ? 'पाठ्यक्रम सम्बद्ध' : 'Syllabus-Aligned'}
                  </span>
                  <span className="text-stone-500">
                    {lang === 'ne' ? 'MU, TU र CTEVT मापदण्ड' : 'Coached to MWU, TU & CTEVT specs'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-stone-900 block mb-0.5">
                    {lang === 'ne' ? '१००% प्रयोगात्मक ल्याब' : '100% Practical Lab'}
                  </span>
                  <span className="text-stone-500">
                    {lang === 'ne' ? '१:१ कम्प्युटर तथा २४ घण्टा ब्याकअप' : '1:1 computer ratio with solar UPS'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-stone-900 block mb-0.5">
                    {lang === 'ne' ? 'खुला प्रश्नपत्र संग्रह' : 'Public Paper Archive'}
                  </span>
                  <span className="text-stone-500">
                    {lang === 'ne' ? '१४०+ विगतका प्रश्न तथा उत्तर' : '140+ verified past papers & keys'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Institutional Portrait */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 border border-stone-200 shadow-xs rounded">
              <div className="overflow-hidden bg-stone-100 aspect-[4/5] rounded-xs">
                <img
                  alt="Academic Director and Lead Instructor at Surkhet Computer Institute"
                  className="w-full h-full object-cover object-center"
                  src={DIRECTOR_AVATAR}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 p-3 bg-stone-50 border border-stone-200 space-y-1 rounded-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">
                    इ. प्रकाश अधिकारी (Er. Prakash Adhikari)
                  </span>
                  <span className="text-stone-500 text-[11px]">Academic Lead</span>
                </div>
                <p className="text-xs text-stone-600 leading-snug">
                  {lang === 'ne' ? (
                    'कम्प्युटर एप्लिकेशन ल्याब तथा परामर्श शाखा। कर्णालीका विद्यार्थीहरूका लागि प्रत्यक्ष प्रयोगात्मक अध्यापन।'
                  ) : (
                    'Computer Application Lab & Mentorship Wing. Practical hands-on instruction serving ambitious Karnali scholars.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dhaka Pattern Accent Line */}
      <div className="w-full h-1 dhaka-pattern"></div>

      {/* Official Notice Strip */}
      <section className="w-full bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-serif font-bold text-[#701518] uppercase tracking-wider shrink-0">
              {lang === 'ne' ? 'आधिकारिक सूचना:' : 'Notice:'}
            </span>
            <span className="text-stone-700 truncate font-medium">
              {lang === 'ne' ? (
                'BSc. CSIT र BCA प्रथम तथा तेस्रो सेमेस्टरका पुराना प्रश्नपत्र संग्रह (२०७५–२०८०) अध्ययन सामग्री शाखामा निःशुल्क डाउनलोडका लागि उपलब्ध छन्।'
              ) : (
                'BSc. CSIT & BCA 1st/3rd Semester Old Question Collections (2075–2080) now available for free download in Study Materials section.'
              )}
            </span>
          </div>
          <button
            onClick={() => onNavigate('notices')}
            className="text-xs text-[#701518] font-semibold hover:underline shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>{lang === 'ne' ? 'सबै सूचनाहरू हेर्नुहोस्' : 'View all notices'}</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Institutional Highlights */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Institutional Mission */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                {lang === 'ne' ? 'संस्थागत परिचय' : 'About the Center'}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-bold mt-1">
                {lang === 'ne' ? 'किन सुर्खेत कम्प्युटर इन्स्टिच्युट नै रोज्ने?' : 'Why Surkhet Computer Institute?'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed text-justify">
              {lang === 'ne' ? (
                'विगत १४ वर्षदेखि हाम्रो संस्था कर्णाली प्रदेशको अग्रणी प्राविधिक कम्प्युटर प्रशिक्षण केन्द्रको रूपमा स्थापित छ। विश्वविद्यालय पाठ्यक्रमको सैद्धान्तिक ज्ञान र सरकारी/निजी क्षेत्रमा आवश्यक व्यावहारिक सीपबीचको खाडल पुर्न हामी प्रतिबद्ध छौं।'
              ) : (
                'For over 14 years, our institute has stood as Karnali Province’s premier vocational computer training establishment. Situated right in Birendranagar’s academic quarter, we bridge the divide between theoretical university syllabi and the concrete technical competencies mandated by employers across Nepal.'
              )}
            </p>
            <div className="space-y-3 pt-2 text-xs text-stone-700">
              <div className="p-3 bg-white border border-stone-200 rounded-xs">
                <span className="font-semibold text-stone-900 block">
                  {lang === 'ne' ? 'विश्वविद्यालय सामीप्यता र तालमेल' : 'Mid-Western University Proximity & Alignment'}
                </span>
                <span className="text-stone-500 mt-0.5 block">
                  {lang === 'ne' ? 'MU र TU का सेमेस्टर परीक्षामुखी विशेष कोचिङ।' : 'Direct coaching modules mapped directly to MU and TU examinations.'}
                </span>
              </div>
              <div className="p-3 bg-white border border-stone-200 rounded-xs">
                <span className="font-semibold text-stone-900 block">
                  {lang === 'ne' ? 'लोकसेवा विशेष तयारी' : 'Provincial Loksewa Specialization'}
                </span>
                <span className="text-stone-500 mt-0.5 block">
                  {lang === 'ne' ? 'कर्णाली प्रदेश लोकसेवा आयोगको मापदण्ड अनुसारको दैनिक प्रयोगात्मक नमुना परीक्षा।' : 'Custom mock labs calibrated to Karnali Public Service Commission standards.'}
                </span>
              </div>
              <div className="p-3 bg-white border border-stone-200 rounded-xs">
                <span className="font-semibold text-stone-900 block">
                  {lang === 'ne' ? 'सरकारी मान्यता प्राप्त प्रमाणपत्र' : 'Authorized Certification'}
                </span>
                <span className="text-stone-500 mt-0.5 block">
                  {lang === 'ne' ? 'उद्योग तथा कम्पनी रजिस्ट्रारमा दर्ता भएको आधिकारिक मान्यता (दर्ता नं २१७००)।' : 'Nationally accepted credentials under Govt. Regd. 21700.'}
                </span>
              </div>
            </div>
          </div>

          {/* Infrastructure & Lab Facilities */}
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                {lang === 'ne' ? 'प्रयोगशाला सुविधाहरू' : 'Facilities'}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-bold mt-1">
                {lang === 'ne' ? 'संस्थागत पूर्वाधार तथा ल्याब' : 'Infrastructure & Lab Facilities'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-white border border-stone-200 rounded-xs space-y-1 shadow-xs">
                <span className="font-semibold text-stone-900 text-xs block">
                  {lang === 'ne' ? 'समर्पित कार्यस्टेशन' : 'Dedicated Workstations'}
                </span>
                <p className="text-xs text-stone-500">
                  {lang === 'ne' ? '१:१ कम्प्युटर अनुपात र २४सै घण्टा अनलाइन युपिएस/सोलार ब्याकअप।' : '1:1 computer ratio with uninterruptible solar/inverter backup power.'}
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xs space-y-1 shadow-xs">
                <span className="font-semibold text-stone-900 text-xs block">
                  {lang === 'ne' ? 'अनुभवी प्रशिक्षकहरू' : 'Experienced Instructors'}
                </span>
                <p className="text-xs text-stone-500">
                  {lang === 'ne' ? 'सफ्टवेयर इन्जिनियरिङ र विश्वविद्यालय अध्यापन अनुभव भएका दक्ष प्रशिक्षक।' : 'Instructors with corporate software and university tutoring experience.'}
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xs space-y-1 shadow-xs">
                <span className="font-semibold text-stone-900 text-xs block">
                  {lang === 'ne' ? 'फाइबर इन्टरनेट तथा लोकल क्लाउड' : 'Fiber Internet & Local Server'}
                </span>
                <p className="text-xs text-stone-500">
                  {lang === 'ne' ? 'उच्च गतिको अप्टिकल फाइबर र स्थानीय शैक्षिक सामग्री सर्भर।' : 'High-speed optical link with institute offline resource server.'}
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xs space-y-1 shadow-xs">
                <span className="font-semibold text-stone-900 text-xs block">
                  {lang === 'ne' ? 'दोहोरो टाइपिङ ल्याब' : 'Dual Typing Suites'}
                </span>
                <p className="text-xs text-stone-500">
                  {lang === 'ne' ? 'नेपाली युनिकोड र पारम्परिक प्रीति फन्ट गति अभ्यास सफ्टवेयर।' : 'Custom Nepali Unicode and Preeti speed drill benchmark systems.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Courses & Programs */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-10 border-t border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-stone-200 gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              {lang === 'ne' ? 'प्रशिक्षण कार्यक्रमहरू' : 'Programs & Curricula'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold mt-1">
              {lang === 'ne' ? 'व्यावसायिक पाठ्यक्रम तथा कोचिङ कार्यक्रमहरू' : 'Vocational Courses & Coaching Programs'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs text-[#701518] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{lang === 'ne' ? 'सम्पूर्ण पाठ्यक्रम तालिका हेर्नुहोस्' : 'View Full Syllabus & Course Matrix'}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-stone-200 p-5 flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs rounded-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono font-semibold text-[#701518]">{course.code}</span>
                  <span>{lang === 'ne' ? course.durationNe : course.durationEn}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900 leading-snug group-hover:text-[#701518] transition-colors">
                  {lang === 'ne' ? course.titleNe : course.titleEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ne' ? course.descNe : course.descEn}
                </p>
                <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <span className="font-medium text-stone-700">Focus:</span> {course.focusEn}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">
                  {lang === 'ne' ? course.badgeNe : course.badgeEn}
                </span>
                <button
                  onClick={() => {
                    if (onSelectCourse) onSelectCourse(course.id);
                    onNavigate('courses');
                  }}
                  className="text-stone-900 hover:text-[#701518] font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ne' ? 'विवरण' : 'Details'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Question Papers Preview */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-10 border-t border-stone-200">
        <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-xs shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-4 mb-6 gap-4">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                {lang === 'ne' ? 'परीक्षा स्रोत भण्डार' : 'Academic Repository'}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                {lang === 'ne' ? 'भर्खरै अपलोड गरिएका प्रश्नपत्रहरू' : 'Recently Uploaded Question Papers'}
              </h2>
            </div>
            <div className="relative w-full md:w-72">
              <input
                className="w-full bg-stone-50 border border-stone-300 pl-3 pr-8 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] transition-colors rounded-xs"
                placeholder={lang === 'ne' ? 'प्रश्नपत्र खोज्नुहोस् (उदा: BCA, Loksewa)...' : 'Search papers (e.g. BCA, Loksewa)...'}
                type="text"
                value={paperFilter}
                onChange={(e) => setPaperFilter(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-stone-400 text-sm pointer-events-none">
                search
              </span>
            </div>
          </div>

          {/* Clean Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 font-semibold uppercase text-[11px]">
                  <th className="py-2.5 px-3">University / Board</th>
                  <th className="py-2.5 px-3">Subject &amp; Year</th>
                  <th className="py-2.5 px-3">Format</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPapers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-[#701518]">
                      {lang === 'ne' ? paper.groupNameNe : paper.groupName}
                      <span className="block text-[11px] text-stone-500 font-normal">
                        {paper.group === 'mwu' ? 'Faculty of Science & Technology' : paper.group === 'loksewa' ? 'Pradesh Lok Sewa Aayog, Surkhet' : 'Academic Board Exam'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-stone-900">
                        {lang === 'ne' ? paper.titleNe : paper.title}
                      </span>
                      <span className="block text-[11px] text-stone-500">
                        {lang === 'ne' ? paper.detailsNe : paper.details}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-stone-500">
                      {paper.format} · {paper.size}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          if (onPreviewPaper) onPreviewPaper(paper.title);
                          else onNavigate('study-materials');
                        }}
                        className="inline-flex items-center gap-1 bg-[#701518] text-white text-[11px] font-medium px-3 py-1.5 hover:bg-[#8f2024] cursor-pointer rounded-xs transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">download</span>
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onPreviewPaper) onPreviewPaper(paper.title + " (Answer Key)");
                          else onNavigate('study-materials');
                        }}
                        className="inline-flex items-center gap-1 bg-stone-100 text-stone-700 text-[11px] font-medium px-3 py-1.5 hover:bg-stone-200 cursor-pointer rounded-xs transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">visibility</span>
                        <span>Answer Key</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <p>
              {lang === 'ne' 
                ? '३५०+ भन्दा बढी विगतका परीक्षा प्रश्नपत्रहरू डिजिटल भण्डारमा उपलब्ध छन्।' 
                : 'Over 350 past examination questions, lab assignments, and solutions catalogued.'}
            </p>
            <button
              onClick={() => onNavigate('study-materials')}
              className="inline-flex items-center gap-1.5 text-stone-900 hover:text-[#701518] font-semibold cursor-pointer"
            >
              <span>{lang === 'ne' ? 'सम्पूर्ण अभिलेख हेर्नुहोस्' : 'Access Full Document Archive'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Practical Location & Contact Section */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-12 border-t border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Directions & Landmark (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                {lang === 'ne' ? 'केन्द्रको अवस्थिति' : 'Location & Directions'}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                {lang === 'ne' ? 'भौतिक मार्गनिर्देशन तथा ल्याण्डमार्क' : 'Physical Directions & Transit Landmark'}
              </h2>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#701518] text-lg shrink-0 mt-0.5">location_on</span>
                <div>
                  <strong className="block text-stone-900 text-sm">
                    Surkhet Computer Institute &amp; Coaching Center Pvt. Ltd.
                  </strong>
                  <p className="text-stone-600 mt-0.5">
                    {lang === 'ne' ? (
                      'मध्यपश्चिम विश्वविद्यालय केन्द्रीय क्याम्पस मुख्य गेटबाट ५० मिटर पूर्व, वीरेन्द्रनगर-८, सुर्खेत, कर्णाली प्रदेश २१७००'
                    ) : (
                      '50 metres east of Mid-Western University Central Campus Gate, Birendranagar-8, Surkhet, Karnali Province 21700, Nepal'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#701518] text-lg shrink-0">call</span>
                <div>
                  <span className="font-semibold text-stone-900">+977 984-8041820 / 083-520000</span>
                  <span className="text-stone-500 block">Direct Line &amp; Admissions Helpdesk</span>
                </div>
              </div>
            </div>

            {/* Clean Transit Path Indicator */}
            <div className="border border-stone-200 bg-stone-50 p-4 rounded-xs text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-medium text-stone-800">Mid-Western University Central Campus Gate</span>
                <span className="text-stone-500">Reference Landmark</span>
              </div>
              <div className="flex items-center justify-center py-2 text-center text-xs text-[#701518] font-semibold tracking-wide">
                <span className="material-symbols-outlined text-sm">east</span>
                <span className="mx-2 uppercase">Walk 50 metres East along Campus Road</span>
                <span className="material-symbols-outlined text-sm">east</span>
              </div>
              <div className="bg-white p-3 border border-stone-300 rounded-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">Surkhet Computer Institute</span>
                  <span className="text-stone-500">1st Floor · Digital Classroom Suites &amp; Testing Hall</span>
                </div>
                <span className="text-xs text-[#701518] font-semibold">Institute Building</span>
              </div>
            </div>
          </div>

          {/* Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-xs shadow-xs space-y-4">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                {lang === 'ne' ? 'सोधपुछ तथा परामर्श' : 'Student Counseling'}
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                {lang === 'ne' ? 'विद्यार्थी भर्ना परामर्श फारम' : 'Student Admission Inquiry'}
              </h3>
            </div>

            <form className="space-y-3 text-xs" onSubmit={handleInquirySubmit}>
              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="studentName">
                  {lang === 'ne' ? 'पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  id="studentName"
                  placeholder="e.g. Ramesh Thapa"
                  required
                  type="text"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="studentPhone">
                  {lang === 'ne' ? 'मोबाइल नम्बर *' : 'Mobile Number *'}
                </label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  id="studentPhone"
                  placeholder="98XXXXXXXX"
                  required
                  type="tel"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="courseSelect">
                  {lang === 'ne' ? 'इच्छुक पाठ्यक्रम *' : 'Course of Interest *'}
                </label>
                <select
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] cursor-pointer rounded-xs"
                  id="courseSelect"
                  required
                  value={inquiryCourse}
                  onChange={(e) => setInquiryCourse(e.target.value)}
                >
                  <option value="">-- {lang === 'ne' ? 'पाठ्यक्रम छान्नुहोस्' : 'Choose Course'} --</option>
                  <option value="DCA">Diploma in Computer Application (6 Mos)</option>
                  <option value="Loksewa">Loksewa Computer Operator Preparation</option>
                  <option value="Tally">Accounting &amp; Tally Prime with VAT</option>
                  <option value="WebPython">Web Design &amp; Python Basics</option>
                  <option value="PastPapers">Past Paper Bank &amp; Exam Solutions Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="studentMessage">
                  {lang === 'ne' ? 'सिफ्ट वा कुनै जिज्ञासा' : 'Question or Shift Preference'}
                </label>
                <textarea
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] resize-none rounded-xs"
                  id="studentMessage"
                  placeholder="Morning shift (6:30 AM) or Evening shift..."
                  rows={2}
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                ></textarea>
              </div>

              {inquirySubmitted && (
                <div className="text-xs p-3 bg-stone-100 border border-stone-300 text-stone-800 rounded-xs">
                  <strong className="text-stone-900">{lang === 'ne' ? 'धन्यवाद!' : 'Thank you!'}</strong>{' '}
                  {lang === 'ne' 
                    ? 'तपाईंको सोधपुछ प्राप्त भएको छ। परामर्श अधिकृतले चाँडै सम्पर्क गर्नुहुनेछ।' 
                    : 'Your inquiry has been received. Our counselor will call you shortly.'}
                </div>
              )}

              <button
                className="w-full bg-[#701518] text-white hover:bg-[#8f2024] text-xs font-semibold py-2.5 px-4 transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xs shadow-xs"
                type="submit"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>{lang === 'ne' ? 'सोधपुछ पठाउनुहोस्' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
