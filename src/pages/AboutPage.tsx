import React from 'react';
import { Language, NavigationPath } from '../types';
import { DIRECTOR_AVATAR, LAB_FACILITY_IMG, COUNSELING_DESK_IMG } from '../data/mockData';

interface AboutPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="flex flex-col w-full bg-[#faf9f7]">
      {/* Masthead */}
      <section className="bg-stone-50 border-b border-stone-200 py-8 lg:py-10 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              {lang === 'ne' ? 'हाम्रो परिचय तथा संस्थागत पृष्ठभूमि' : 'Institutional Profile & Background'}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#701518] font-bold">
              {lang === 'ne' ? 'सुर्खेत कम्प्युटर इन्स्टिच्युटको बारेमा' : 'About Surkhet Computer Institute'}
            </h1>
          </div>
          <div className="text-xs text-stone-500 font-medium">
            Govt. Regd. 21700 · PAN: 602391000 · Estd. 2068 B.S.
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-8 lg:py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-bold leading-tight">
              {lang === 'ne' 
                ? 'कर्णाली प्रदेशको सूचना प्रविधि शिक्षाको अग्रणी धरोहर' 
                : 'Over 14 Years of Empowering Karnali Province in Information Technology'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
              {lang === 'ne' ? (
                'सुर्खेत कम्प्युटर इन्स्टिच्युट एण्ड कोचिङ सेन्टर प्रा.लि. कर्णाली प्रदेशको राजधानी वीरेन्द्रनगरमा स्थापित एक प्रतिष्ठित प्राविधिक शिक्षण संस्था हो। मध्यपश्चिम विश्वविद्यालय केन्द्रीय क्याम्पस मुख्य गेटबाट ५० मिटर पूर्वमा अवस्थित यो संस्था विगत १४ वर्षदेखि विद्यार्थीहरूलाई व्यावहारिक डिजिटल साक्षरता, व्यावसायिक कम्प्युटिङ, विश्वविद्यालय र लोकसेवा परीक्षा तयारी कक्षा प्रदान गर्दै आइरहेको छ।'
              ) : (
                'Surkhet Computer Institute & Coaching Center Pvt. Ltd. is Karnali Province’s premier institutional computer education center located in Birendranagar. Situated 50 meters East of Mid-Western University Central Campus Gate, the institute has dedicated over 14 years to providing grounded practical training, curriculum coaching, and comprehensive exam archives to thousands of scholars.'
              )}
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
              {lang === 'ne' ? (
                'हाम्रो मूल उद्देश्य प्रत्येक विद्यार्थीलाई सैद्धान्तिक ज्ञान मात्र नभई वास्तविक कार्यस्थलमा आवश्यक पर्ने व्यावहारिक सीप (Hands-on Skills) प्रदान गर्नु हो। यसैकारण हामी प्रत्येक प्रशिक्षार्थीलाई १:१ कम्प्युटर कार्यस्टेशन, निरन्तर विद्युतीय ब्याकअप, र दक्ष प्रशिक्षकको प्रत्यक्ष निगरानी सुनिश्चित गर्दछौं।'
              ) : (
                'Our core vision is not merely classroom theory, but real-world employability and technical confidence. Every enrolled student is assigned an individual workstation with 24/7 dedicated solar/inverter backup and step-by-step mentorship from verified engineering and academic faculty.'
              )}
            </p>

            {/* Core Values 3 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-xs space-y-1">
                <span className="text-[#701518] font-bold text-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">school</span>
                  <span>शिक्षा (Education)</span>
                </span>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  विश्वविद्यालय र सीटीईभिटी मापदण्ड अनुरूपको स्तरीय पाठ्यक्रम।
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-xs space-y-1">
                <span className="text-[#701518] font-bold text-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">build</span>
                  <span>सीप (Skill)</span>
                </span>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  १००% कम्प्युटर ल्याब प्रयोगात्मक अभ्यास तथा सफ्टवेयर दक्षता।
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xs shadow-xs space-y-1">
                <span className="text-[#701518] font-bold text-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">trophy</span>
                  <span>सफलता (Success)</span>
                </span>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  लोकसेवा, बैंकिङ र सरकारी परीक्षामा उच्च सफलता दर।
                </p>
              </div>
            </div>
          </div>

          {/* Director / Academic Lead Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 p-5 rounded-xs shadow-xs space-y-4">
            <div className="relative overflow-hidden bg-stone-100 rounded-xs border border-stone-200">
              <img
                alt="Er. Prakash Adhikari, Academic Lead"
                className="w-full h-64 object-cover object-center"
                src={DIRECTOR_AVATAR}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif text-base font-bold text-stone-900">
                  इ. प्रकाश अधिकारी (Er. Prakash Adhikari)
                </span>
                <span className="text-stone-500 text-xs">Academic Lead</span>
              </div>
              <p className="text-xs text-[#701518] font-medium">
                Founder &amp; Principal Instructor
              </p>
              <p className="text-xs text-stone-600 leading-relaxed text-justify pt-1">
                {lang === 'ne' ? (
                  'कम्प्युटर इन्जिनियरिङ पृष्ठभूमि भएका निर्देशक अधिकारीले विगत एक दशकदेखि कर्णालीका विद्यार्थीहरूलाई प्रयोगात्मक कम्प्युटर शिक्षा, सफ्टवेयर तालिम, तथा विश्वविद्यालय परीक्षा तयारीमा मार्गदर्शन गर्दै आउनुभएको छ।'
                ) : (
                  'With extensive engineering and academic experience, Er. Adhikari directs laboratory instruction, university syllabus alignment, and technical counseling serving scholars across all 10 districts of Karnali.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Showcases */}
        <div className="border-t border-stone-200 pt-8 space-y-6">
          <div className="border-b border-stone-200 pb-2">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
              {lang === 'ne' ? 'पूर्वाधार तथा स्रोत' : 'Campus Infrastructure'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              {lang === 'ne' ? 'हाम्रा प्रयोगशाला तथा कक्षहरू' : 'Classrooms, Labs & Student Support'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 rounded-xs overflow-hidden shadow-xs">
              <div className="aspect-[16/10] bg-stone-100 overflow-hidden">
                <img
                  alt="High-density Computer Lab at Surkhet Computer Institute"
                  className="w-full h-full object-cover"
                  src={LAB_FACILITY_IMG}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-serif text-sm font-bold text-stone-900">
                  {lang === 'ne' ? 'कम्प्युटर प्रयोगशाला (Digital Lab)' : 'High-Density Computer Workstation Lab'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ne'
                    ? '१:१ कम्प्युटर अनुपात, चौबिसै घण्टा सोलार तथा इन्भर्टर ब्याकअप, र अप्टिकल फाइबर इन्टरनेट।'
                    : '1:1 student-to-computer ratio with uninterruptible solar/inverter backup and high-speed optical fiber connectivity.'}
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-xs overflow-hidden shadow-xs">
              <div className="aspect-[16/10] bg-stone-100 overflow-hidden">
                <img
                  alt="Student Counseling and Admissions Desk"
                  className="w-full h-full object-cover"
                  src={COUNSELING_DESK_IMG}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-serif text-sm font-bold text-stone-900">
                  {lang === 'ne' ? 'विद्यार्थी परामर्श शाखा (Admissions Desk)' : 'Counseling & Academic Support Desk'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ne'
                    ? 'नयाँ विद्यार्थीहरूका लागि करियर परामर्श, पाठ्यक्रम छनोट, र परीक्षा सामग्री वितरण।'
                    : 'Career guidance, course selection assistance, and past question paper archive consultation.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
