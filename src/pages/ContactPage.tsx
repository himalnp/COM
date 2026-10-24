import React, { useState } from 'react';
import { Language, NavigationPath } from '../types';
import { MAP_IMAGE_URL, LAB_FACILITY_IMG, COUNSELING_DESK_IMG } from '../data/mockData';

interface ContactPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
  onLanguageChange: (lang: Language) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  onNavigate
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [shift, setShift] = useState('');
  const [district, setDistrict] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !course || !shift) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setName('');
      setPhone('');
      setCourse('');
      setShift('');
      setDistrict('');
      setMsg('');
      setTimeout(() => setSubmitted(false), 9000);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7]">
      {/* Official Institutional Dossier Strip */}
      <section className="w-full bg-stone-100 py-2.5 px-4 lg:px-10 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3 text-stone-600">
            <span className="font-semibold text-stone-900">
              {lang === 'ne' ? 'आधिकारिक सम्पर्क विवरण' : 'Official Contact & Admissions'}
            </span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Regd. 21700 / PAN: 602391000</span>
          </div>
          <div className="text-stone-600 font-medium text-[11px]">
            {lang === 'ne' ? 'परामर्श कक्ष: आइतबार – शुक्रबार, बिहान ६:०० – साँझ ६:००' : 'Admissions Desk: Sun – Fri, 6:00 AM – 6:00 PM'}
          </div>
        </div>
      </section>

      {/* Title & Institutional Intro */}
      <section className="w-full bg-white py-8 lg:py-10 px-4 lg:px-10 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-2">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                {lang === 'ne' ? 'कर्णाली प्रदेश प्राविधिक शिक्षा केन्द्र' : 'Karnali Province Technical Education Centre'}
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#701518] tracking-tight font-bold">
                {lang === 'ne' ? 'सम्पर्क, परामर्श तथा क्याम्पस अवस्थिति' : 'Campus Location, Inquiries & Academic Helpdesk'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                {lang === 'ne' ? (
                  'वीरेन्द्रनगर-८ सुर्खेत, मध्यपश्चिम विश्वविद्यालय (MU) केन्द्रीय क्याम्पस मुख्य प्रवेशद्वारबाट ५० मिटर पूर्व। कर्णालीका सम्पूर्ण जिल्लाबाट आउने विद्यार्थीहरूका लागि प्रत्यक्ष परामर्श तथा सहायता कक्ष।'
                ) : (
                  'Birendranagar-8 Surkhet, precisely 50 meters East of Mid-Western University (MU) Central Campus Main Gate. Direct counseling and administrative orientation for students across all districts of Karnali.'
                )}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
              <div className="bg-stone-50 p-3 border border-stone-200 rounded-xs w-full lg:w-auto">
                <span className="text-[10px] uppercase text-stone-500 tracking-wider block font-semibold">
                  {lang === 'ne' ? 'संस्थाको मूल मन्त्र' : 'Institutional Motto'}
                </span>
                <span className="font-serif text-base text-stone-900 font-bold">
                  {lang === 'ne' ? 'शिक्षा · सीप · सफलता' : 'Education · Skill · Success'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Grid */}
      <section className="w-full px-4 lg:px-10 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (7 cols): Physical Coordinates, Route & Maps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 border border-stone-200 rounded-xs shadow-xs space-y-2">
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold block">
                  {lang === 'ne' ? 'संस्थाको ठेगाना' : 'Campus Location'}
                </span>
                <strong className="block text-stone-900 text-sm font-serif">
                  Surkhet Computer Institute
                </strong>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === 'ne' ? (
                    'मध्यपश्चिम विश्वविद्यालय केन्द्रीय क्याम्पस मुख्य गेटबाट ५० मिटर पूर्व, वीरेन्द्रनगर-८, सुर्खेत, कर्णाली प्रदेश'
                  ) : (
                    '50 meters East of Mid-Western University Central Campus Gate, Birendranagar-8, Surkhet, Karnali Province, Nepal'
                  )}
                </p>
              </div>

              <div className="bg-white p-4 border border-stone-200 rounded-xs shadow-xs space-y-2">
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold block">
                  {lang === 'ne' ? 'फोन तथा इमेल' : 'Direct Communications'}
                </span>
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-stone-500 block">Helpdesk Direct Line:</span>
                    <a href="tel:+9779848041820" className="font-semibold text-stone-900 hover:text-[#701518]">
                      +977 984-8041820
                    </a>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Landline Office:</span>
                    <span className="font-semibold text-stone-900">083-520000</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Electronic Inquiries:</span>
                    <a href="mailto:info@surkhetcomputer.edu.np" className="text-stone-900 hover:text-[#701518]">
                      info@surkhetcomputer.edu.np
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Landmark Route Transit Steps */}
            <div className="bg-white p-5 border border-stone-200 rounded-xs shadow-xs space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                {lang === 'ne' ? 'पैदल मार्गनिर्देशन (Landmark Guide)' : 'Pedestrian & Transit Landmark Guide'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                  <span className="text-[11px] font-semibold text-[#701518] block">Step 01</span>
                  <span className="font-bold text-stone-900 block">MWU Central Gate</span>
                  <p className="text-stone-500 text-[11px]">Arrive at Mid-Western University Central Campus Main Gate.</p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                  <span className="text-[11px] font-semibold text-[#701518] block">Step 02</span>
                  <span className="font-bold text-stone-900 block">Walk 50m East</span>
                  <p className="text-stone-500 text-[11px]">Follow the campus access road eastward towards the marketplace.</p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                  <span className="text-[11px] font-semibold text-[#701518] block">Step 03</span>
                  <span className="font-bold text-stone-900 block">Institute Building</span>
                  <p className="text-stone-500 text-[11px]">1st Floor, prominent official signage above the entrance.</p>
                </div>
              </div>
            </div>

            {/* Map & Facility Photos */}
            <div className="bg-white border border-stone-200 rounded-xs overflow-hidden shadow-xs">
              <div className="relative aspect-[16/9] bg-stone-100">
                <img
                  alt="Transit Route & Map to Surkhet Computer Institute"
                  className="w-full h-full object-cover"
                  src={MAP_IMAGE_URL}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-stone-900 block">Google Maps Verification</span>
                  <span className="text-stone-500">Coordinates: 28.6019° N, 81.6338° E · Birendranagar-8</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Mid-Western+University+Surkhet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 py-2 rounded-xs transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Student Admission Inquiry Form */}
          <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-xs shadow-xs space-y-5">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block">
                {lang === 'ne' ? 'भर्ना तथा सोधपुछ' : 'Student Counseling'}
              </span>
              <h2 className="font-serif text-xl font-bold text-stone-900 mt-1">
                {lang === 'ne' ? 'विद्यार्थी परामर्श तथा भर्ना फारम' : 'Student Admission & Inquiry Form'}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                {lang === 'ne' ? 'फारम भरेर पठाउनुहोस्, हाम्रो परामर्श अधिकृतले चाँडै सम्पर्क गर्नुहुनेछ।' : 'Submit your query below. Our counselor will respond promptly.'}
              </p>
            </div>

            <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="studentName">
                  {lang === 'ne' ? 'विद्यार्थीको पूरा नाम *' : 'Student Full Name *'}
                </label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  id="studentName"
                  placeholder="e.g. Ramesh Thapa"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1" htmlFor="studentPhone">
                    {lang === 'ne' ? 'सम्पर्क मोबाइल नं *' : 'Mobile Number *'}
                  </label>
                  <input
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                    id="studentPhone"
                    placeholder="98XXXXXXXX"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1" htmlFor="studentDistrict">
                    {lang === 'ne' ? 'गृह जिल्ला' : 'Home District'}
                  </label>
                  <select
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] cursor-pointer rounded-xs"
                    id="studentDistrict"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">-- {lang === 'ne' ? 'जिल्ला छान्नुहोस्' : 'Select District'} --</option>
                    <option value="Surkhet">Surkhet</option>
                    <option value="Dailekh">Dailekh</option>
                    <option value="Jajarkot">Jajarkot</option>
                    <option value="Salyan">Salyan</option>
                    <option value="Jumla">Jumla</option>
                    <option value="Kalikot">Kalikot</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="studentCourse">
                  {lang === 'ne' ? 'इच्छुक पाठ्यक्रम *' : 'Course of Interest *'}
                </label>
                <select
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] cursor-pointer rounded-xs"
                  id="studentCourse"
                  required
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">-- {lang === 'ne' ? 'पाठ्यक्रम छान्नुहोस्' : 'Select Program'} --</option>
                  <option value="DCA">Diploma in Computer Applications (DCA)</option>
                  <option value="Loksewa">Loksewa Computer Operator Preparation</option>
                  <option value="Tally">Accounting &amp; Tally Prime with VAT</option>
                  <option value="Web">Web Development &amp; Python</option>
                  <option value="Coaching">MWU / TU Semester Exam Coaching</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="shiftPref">
                  {lang === 'ne' ? 'सिफ्ट प्राथमिकता *' : 'Preferred Shift *'}
                </label>
                <select
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] cursor-pointer rounded-xs"
                  id="shiftPref"
                  required
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                >
                  <option value="">-- {lang === 'ne' ? 'समय छान्नुहोस्' : 'Select Timing'} --</option>
                  <option value="morning">Morning (6:30 AM – 10:00 AM)</option>
                  <option value="day">Day (11:00 AM – 2:00 PM)</option>
                  <option value="evening">Evening (3:30 PM – 6:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1" htmlFor="studentNotes">
                  {lang === 'ne' ? 'अन्य जिज्ञासा' : 'Specific Inquiries or Questions'}
                </label>
                <textarea
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#701518] resize-none rounded-xs"
                  id="studentNotes"
                  placeholder="Ask any question about syllabus, lab facilities, or hostel options..."
                  rows={3}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                ></textarea>
              </div>

              {submitted && (
                <div className="p-3 bg-stone-100 border border-stone-300 text-stone-800 rounded-xs text-xs">
                  <strong className="text-stone-900">{lang === 'ne' ? 'फारम प्राप्त भयो!' : 'Inquiry Submitted!'}</strong>{' '}
                  {lang === 'ne' 
                    ? 'तपाईंको सोधपुछ दर्ता भएको छ। परामर्श अधिकृतले चाँडै फोन गर्नुहुनेछ।' 
                    : 'Your counseling request has been received. Our counselor will contact you shortly.'}
                </div>
              )}

              <button
                className="w-full bg-[#701518] text-white hover:bg-[#8f2024] text-xs font-semibold py-2.5 px-4 transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-xs shadow-xs"
                type="submit"
                disabled={submitting}
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>{submitting ? 'Submitting...' : lang === 'ne' ? 'परामर्श फारम पठाउनुहोस्' : 'Submit Counseling Request'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
