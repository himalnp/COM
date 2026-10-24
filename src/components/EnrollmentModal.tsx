import React, { useState, useEffect } from 'react';
import { Language, CourseItem, StudentUser, StudentEnrollment } from '../types';
import { COURSES } from '../data/mockData';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse?: CourseItem | null;
  currentUser: StudentUser | null;
  onOpenAuth: (message?: string) => void;
  onSubmitEnrollment: (enrollment: StudentEnrollment) => void;
  lang: Language;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  selectedCourse,
  currentUser,
  onOpenAuth,
  onSubmitEnrollment,
  lang
}) => {
  const [courseId, setCourseId] = useState(selectedCourse?.id || COURSES[0].id);
  const [dob, setDob] = useState('2060-01-15 (B.S.)');
  const [gender, setGender] = useState('Male');
  const [district, setDistrict] = useState(currentUser?.district || 'Surkhet');
  const [municipalityWard, setMunicipalityWard] = useState('Birendranagar-8');
  const [qualification, setQualification] = useState(currentUser?.qualification || '+2 Running');
  const [previousInstitution, setPreviousInstitution] = useState('');
  const [shift, setShift] = useState('Morning (6:30 AM – 8:30 AM)');
  const [experience, setExperience] = useState<'beginner' | 'basic' | 'intermediate' | 'advanced'>('basic');
  const [purpose, setPurpose] = useState('Employment & Loksewa Exam Preparation');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [successData, setSuccessData] = useState<StudentEnrollment | null>(null);

  // Sync state if course or user changes
  useEffect(() => {
    if (selectedCourse) {
      setCourseId(selectedCourse.id);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.district) setDistrict(currentUser.district);
      if (currentUser.qualification) setQualification(currentUser.qualification);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const currentCourse = COURSES.find((c) => c.id === courseId) || COURSES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!municipalityWard || !guardianName || !guardianPhone || !previousInstitution) {
      return;
    }

    const newEnrollment: StudentEnrollment = {
      id: 'enr_' + Date.now(),
      userId: currentUser.id,
      fullName: currentUser.fullName,
      mobile: currentUser.mobile,
      email: currentUser.email,
      dateOfBirth: dob,
      gender,
      district,
      municipalityWard,
      academicQualification: qualification,
      previousInstitution,
      courseId: currentCourse.id,
      courseTitle: `${currentCourse.titleEn} (${currentCourse.code})`,
      preferredShift: shift,
      computerExperience: experience,
      trainingPurpose: purpose,
      guardianName,
      guardianPhone,
      additionalNotes: notes,
      enrolledAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending'
    };

    onSubmitEnrollment(newEnrollment);
    setSuccessData(newEnrollment);
  };

  const handleFinish = () => {
    setSuccessData(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-2xl w-full rounded-xs shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#701518] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#fce8e6] font-semibold">
              Official Admission Roster · Regd. 21700
            </div>
            <h3 className="font-serif text-lg font-bold text-white mt-0.5">
              {lang === 'ne' ? 'विद्यार्थी भर्ना तथा सिट सुरक्षित फारम' : 'Student Course Admission & Seat Reservation'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Area */}
        {!currentUser ? (
          /* Unauthenticated Prompt */
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-stone-100 text-[#701518] rounded-full mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">lock_person</span>
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                {lang === 'ne' ? 'दर्ता तथा लगइन अनिवार्य छ' : 'Student Account Required to Enroll'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ne'
                  ? 'पाठ्यक्रममा भर्ना हुनका लागि आधिकारिक विद्यार्थी खाता अनिवार्य गरिएको छ। कृपया पहिले लगइन गर्नुहोस् वा निःशुल्क दर्ता गर्नुहोस्।'
                  : 'To maintain verified attendance rosters, authorized lab workstation ratios, and certification credentials under Regd. 21700, only registered students can submit course enrollments.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs text-xs font-medium cursor-pointer"
              >
                {lang === 'ne' ? 'पछि गर्ने' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth(
                    lang === 'ne'
                      ? 'भर्ना फारम भर्न कृपया पहिले लगइन वा दर्ता गर्नुहोस्।'
                      : 'Please sign in or register to complete your course admission.'
                  );
                }}
                className="px-5 py-2 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>{lang === 'ne' ? 'लगइन / दर्ता गर्नुहोस्' : 'Sign In / Register to Enroll'}</span>
              </button>
            </div>
          </div>
        ) : successData ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h4 className="font-serif text-xl font-bold text-stone-900">
                {lang === 'ne' ? 'भर्ना आवेदन सफलतापूर्वक दर्ता भयो!' : 'Enrollment Application Registered!'}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {lang === 'ne'
                  ? `धन्यवाद ${successData.fullName}! तपाईंको आवेदन प्रशासनिक रोस्टरमा सुरक्षित गरिएको छ। हाम्रो परामर्श अधिकृतले २ कार्यघण्टाभित्र सम्पर्क गर्नुहुनेछ।`
                  : `Thank you, ${successData.fullName}. Your comprehensive admission dossier has been registered in the institute ledger. Our admissions desk will review and contact you shortly.`}
              </p>
            </div>

            {/* Dossier Summary Box */}
            <div className="max-w-md mx-auto p-4 bg-stone-50 border border-stone-200 rounded-xs text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500">Registration ID:</span>
                <span className="font-mono font-bold text-[#701518]">{successData.id}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500">Course Selected:</span>
                <span className="font-semibold text-stone-900">{successData.courseTitle}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-500">Shift Allotment:</span>
                <span className="text-stone-800">{successData.preferredShift}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Campus Verification Desk:</span>
                <span className="text-stone-800">Surkhet-8, 50m East of MWU Gate</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs text-xs font-semibold cursor-pointer shadow-xs"
              >
                {lang === 'ne' ? 'सम्पन्न' : 'Return to Portal'}
              </button>
            </div>
          </div>
        ) : (
          /* Comprehensive Enrollment Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
            {/* Student Verified Identity Box */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase text-stone-500 tracking-wider font-semibold block">
                  Logged In Verified Scholar
                </span>
                <strong className="text-sm font-serif text-stone-900 block">
                  {currentUser.fullName}
                </strong>
                <span className="text-stone-500 text-[11px]">
                  {currentUser.mobile} · {currentUser.email}
                </span>
              </div>
              <span className="text-[11px] font-mono bg-white px-2 py-1 border border-stone-300 text-stone-700 rounded-xs">
                ID: {currentUser.id}
              </span>
            </div>

            {/* Section 1: Course & Shift Selection */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200 pb-1.5">
                1. {lang === 'ne' ? 'पाठ्यक्रम तथा समय छनोट' : 'Course & Timing Preferences'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'भर्ना हुने पाठ्यक्रम *' : 'Selected Program *'}
                  </label>
                  <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                    required
                  >
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} – {c.titleEn} ({lang === 'ne' ? c.durationNe : c.durationEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'प्राथमिकता शिफ्ट *' : 'Preferred Shift *'}
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                    required
                  >
                    <option value="Morning (6:30 AM – 8:30 AM)">Morning (6:30 AM – 8:30 AM)</option>
                    <option value="Mid-Morning (9:00 AM – 11:00 AM)">Mid-Morning (9:00 AM – 11:00 AM)</option>
                    <option value="Day (11:30 AM – 1:30 PM)">Day (11:30 AM – 1:30 PM)</option>
                    <option value="Afternoon (1:30 PM – 3:30 PM)">Afternoon (1:30 PM – 3:30 PM)</option>
                    <option value="Evening (3:30 PM – 5:30 PM)">Evening (3:30 PM – 5:30 PM)</option>
                    <option value="Late Evening (5:30 PM – 7:00 PM)">Late Evening (5:30 PM – 7:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Personal & Demographic Info */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200 pb-1.5">
                2. {lang === 'ne' ? 'व्यक्तिगत तथा ठेगाना विवरण' : 'Demographics & Address Details'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'जन्म मिति (B.S. / A.D.) *' : 'Date of Birth *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="e.g. 2060-01-15 (B.S.)"
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'लिङ्ग *' : 'Gender *'}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                  >
                    <option value="Male">Male (पुरुष)</option>
                    <option value="Female">Female (महिला)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'गृह जिल्ला *' : 'Home District *'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
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
                    <option value="Other">Other District</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {lang === 'ne' ? 'स्थानीय ठेगाना (गाउँ/नगरपालिका र वडा नं) *' : 'Municipality / Rural Municipality & Ward No. *'}
                </label>
                <input
                  type="text"
                  required
                  value={municipalityWard}
                  onChange={(e) => setMunicipalityWard(e.target.value)}
                  placeholder="e.g. Birendranagar-8, Surkhet OR Dullu-3, Dailekh"
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                />
              </div>
            </div>

            {/* Section 3: Academic Background & Skills */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200 pb-1.5">
                3. {lang === 'ne' ? 'शैक्षिक पृष्ठभूमि तथा कम्प्युटर अनुभव' : 'Academic Background & Skill Level'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'हालको शैक्षिक योग्यता *' : 'Academic Qualification *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. +2 Management / BBS / BCA Running"
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'अध्ययन गरेको क्याम्पस वा विद्यालय *' : 'College / Campus / School *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={previousInstitution}
                    onChange={(e) => setPreviousInstitution(e.target.value)}
                    placeholder="e.g. Mid-Western University Central Campus"
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'कम्प्युटर पूर्व अनुभव *' : 'Prior Computer Experience *'}
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                  >
                    <option value="beginner">Beginner (कम्प्युटर पहिलो पटक सिक्दै)</option>
                    <option value="basic">Basic (सामान्य चलाउन र इन्टरनेट चलाउन आउने)</option>
                    <option value="intermediate">Intermediate (टाइपिङ वा अफिस सामान्य आउने)</option>
                    <option value="advanced">Advanced (प्रोग्रामिङ वा एडभान्स काम गरेको)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'तालिमको मुख्य उद्देश्य *' : 'Primary Training Purpose *'}
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                  >
                    <option value="Employment & Loksewa Exam Preparation">Loksewa (लोकसेवा परीक्षा तयारी)</option>
                    <option value="Banking & Commercial Cooperative Job">Banking / Cooperative Job (बैंकिङ जागिर)</option>
                    <option value="University Semester Syllabus Assistance">University Semester Lab Practical</option>
                    <option value="Personal Career & Freelance Skill">Personal ICT Skill & Web Freelancing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Emergency Guardian Contact */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-200 pb-1.5">
                4. {lang === 'ne' ? 'अभिभावक वा आपतकालीन सम्पर्क' : 'Parent / Guardian Emergency Contact'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'अभिभावकको पूरा नाम *' : 'Guardian Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="e.g. Hari Bahadur Thapa"
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    {lang === 'ne' ? 'अभिभावकको मोबाइल नम्बर *' : 'Guardian Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {lang === 'ne' ? 'कुनै अतिरिक्त माग वा हस्टेल समन्वय' : 'Additional Remarks / Hostel Request'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need hostel accommodation near MWU campus, specific typing speed drill request..."
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] resize-none"
                ></textarea>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs cursor-pointer font-medium"
              >
                {lang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">how_to_reg</span>
                <span>{lang === 'ne' ? 'आवेदन दर्ता गर्नुहोस्' : 'Submit Admission Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
