import React, { useState, useMemo, useEffect } from 'react';
import { Language, NavigationPath, QuestionPaper } from '../types';
import { QUESTION_PAPERS } from '../data/mockData';

interface StudyMaterialsPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
  selectedPaperTitle?: string;
  onClearPaperSelection?: () => void;
  questionPapers?: QuestionPaper[];
}

export const StudyMaterialsPage: React.FC<StudyMaterialsPageProps> = ({
  lang,
  onNavigate,
  selectedPaperTitle,
  onClearPaperSelection,
  questionPapers
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedPaperTitle || '');
  const [groupFilter, setGroupFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [simulatedEmpty, setSimulatedEmpty] = useState(false);

  // Modals state
  const [activeModalDoc, setActiveModalDoc] = useState<string | null>(null);
  const [requestModalMode, setRequestModalMode] = useState<'request' | 'contribute' | null>(null);
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Current paper list
  const papersList = questionPapers && questionPapers.length > 0 ? questionPapers : QUESTION_PAPERS;

  // Sync selectedPaperTitle when navigated from Home
  useEffect(() => {
    if (selectedPaperTitle) {
      setSearchTerm(selectedPaperTitle);
    }
  }, [selectedPaperTitle]);

  const filteredPapers = useMemo(() => {
    if (simulatedEmpty) return [];

    return papersList.filter((paper) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.titleNe.toLowerCase().includes(q) ||
        paper.subjectCode.toLowerCase().includes(q) ||
        paper.details.toLowerCase().includes(q) ||
        paper.groupName.toLowerCase().includes(q);

      const matchesGroup = groupFilter === 'all' || paper.group === groupFilter;
      const matchesSubject = subjectFilter === 'all' || paper.subject === subjectFilter;
      const matchesYear = yearFilter === 'all' || paper.year === yearFilter;
      
      const matchesType =
        typeFilter === 'all' ||
        (typeFilter === 'solution' && paper.solutionStatus === 'solution_attached') ||
        (typeFilter === 'model-set' && paper.solutionStatus === 'key_included') ||
        (typeFilter === 'past-paper' && paper.solutionStatus === 'question_only');

      return matchesSearch && matchesGroup && matchesSubject && matchesYear && matchesType;
    });
  }, [searchTerm, groupFilter, subjectFilter, yearFilter, typeFilter, simulatedEmpty]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setGroupFilter('all');
    setSubjectFilter('all');
    setYearFilter('all');
    setTypeFilter('all');
    setSimulatedEmpty(false);
    if (onClearPaperSelection) onClearPaperSelection();
  };

  const handleContributeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback('Thank you! Your paper contribution has been submitted for review.');
    setTimeout(() => {
      setRequestModalMode(null);
      setFormFeedback(null);
      setToastMessage('Paper successfully queued for verification.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1500);
  };

  const handleDownloadTrigger = (paperTitle: string) => {
    setActiveModalDoc(null);
    setToastMessage(`Downloading verified document: ${paperTitle} (PDF)`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded shadow-xl flex items-center gap-3 text-xs border border-stone-700 animate-fade-in">
          <span className="material-symbols-outlined text-sm text-[#ffa7a1]">check_circle</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-stone-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Editorial Header Section */}
      <section className="bg-stone-50 border-b border-stone-200 py-8 lg:py-12 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
            <div className="space-y-2">
              <div className="text-xs text-stone-500 font-medium">
                Academic Repository · Karnali Province
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-bold tracking-tight">
                {lang === 'ne' 
                  ? 'प्रश्नपत्र बैंक तथा शैक्षिक स्रोत सामग्री भण्डार' 
                  : 'Question Paper Bank & Academic Resource Archive'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                {lang === 'ne' ? (
                  'मध्यपश्चिम विश्वविद्यालय (MU), त्रिभुवन विश्वविद्यालय (TU), सीटीईभिटी, र कर्णाली लोकसेवा आयोगका परीक्षार्थीहरूका लागि संकलित विगतका प्रश्नपत्रहरू तथा समाधानहरूको सार्वजनिक पुस्तकालय।'
                ) : (
                  'A public repository of syllabus-aligned past question papers, official model examination sets, and verified solutions compiled for university, CTEVT, and Loksewa candidates in Surkhet.'
                )}
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-stone-600 shrink-0">
              <div>
                <span className="font-serif text-2xl font-bold text-stone-900 block leading-tight">142</span>
                <span className="text-stone-500">Catalogued Papers</span>
              </div>
              <div className="h-8 w-px bg-stone-200"></div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#701518] block leading-tight">100%</span>
                <span className="text-stone-500">Free Public Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Console */}
      <section className="bg-stone-50 border-b border-stone-200 py-4 px-4 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Search Input */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg pointer-events-none">
              search
            </span>
            <input
              className="w-full bg-white border border-stone-300 pl-10 pr-16 py-2 text-xs md:text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#6d1115] focus:outline-none transition-colors rounded"
              placeholder={lang === 'ne' ? 'शीर्षक, विषय कोड वा संस्थाबाट खोज्नुहोस् (उदा: CSIT, Tally, Loksewa, BCA)...' : 'Search by paper title, subject code, semester, or board (e.g. CSIT, Tally, Loksewa, BCA)...'}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
            <div>
              <label className="text-[11px] text-stone-600 block mb-1 font-medium" htmlFor="groupFilter">
                Program / Board
              </label>
              <select
                id="groupFilter"
                className="w-full bg-white border border-stone-300 text-stone-800 text-xs py-1.5 px-2 focus:border-[#6d1115] focus:outline-none cursor-pointer rounded"
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
              >
                <option value="all">All Boards</option>
                <option value="mwu">Mid-Western University (MWU)</option>
                <option value="tu">Tribhuvan University (TU)</option>
                <option value="loksewa">Loksewa Aayog (Karnali)</option>
                <option value="ctevt">CTEVT Technical</option>
                <option value="diploma">Institute Diplomas (DCA)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-1 font-medium" htmlFor="subjectFilter">
                Subject Area
              </label>
              <select
                id="subjectFilter"
                className="w-full bg-white border border-stone-300 text-stone-800 text-xs py-1.5 px-2 focus:border-[#6d1115] focus:outline-none cursor-pointer rounded"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="all">All Subjects</option>
                <option value="programming">C / Structured Programming</option>
                <option value="accounting">Financial Accounting &amp; Tally</option>
                <option value="operator">Computer Operator Skills</option>
                <option value="hardware">Computer Hardware &amp; Networks</option>
                <option value="architecture">Microprocessor &amp; Architecture</option>
                <option value="math">Discrete Mathematics</option>
                <option value="office">Office Package &amp; Typology</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-1 font-medium" htmlFor="yearFilter">
                Exam Year
              </label>
              <select
                id="yearFilter"
                className="w-full bg-white border border-stone-300 text-stone-800 text-xs py-1.5 px-2 focus:border-[#6d1115] focus:outline-none cursor-pointer rounded"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="all">All Years</option>
                <option value="2081">2081 B.S. (2024)</option>
                <option value="2080">2080 B.S. (2023)</option>
                <option value="2079">2079 B.S. (2022)</option>
                <option value="2078">2078 B.S. (2021)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-600 block mb-1 font-medium" htmlFor="typeFilter">
                Document Content
              </label>
              <select
                id="typeFilter"
                className="w-full bg-white border border-stone-300 text-stone-800 text-xs py-1.5 px-2 focus:border-[#6d1115] focus:outline-none cursor-pointer rounded"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="past-paper">Past Examination Papers</option>
                <option value="model-set">Official Model Sets</option>
                <option value="solution">Papers with Solved Keys</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium py-1.5 px-3 border border-stone-300 transition-colors flex items-center justify-center gap-1 cursor-pointer rounded h-[34px]"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Quick Keyword Shortcuts */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-stone-500 border-t border-stone-200">
            <div>
              Showing <span className="font-semibold text-stone-900">{filteredPapers.length}</span> verified documents
            </div>
            <div className="flex items-center gap-2">
              <span className="text-stone-400">Quick Filters:</span>
              <button
                onClick={() => setSearchTerm('BCA 1st')}
                className="text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
              >
                BCA 1st
              </button>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <button
                onClick={() => setSearchTerm('Loksewa')}
                className="text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
              >
                Loksewa
              </button>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <button
                onClick={() => setSearchTerm('Tally')}
                className="text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
              >
                Tally ERP
              </button>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <button
                onClick={() => setSearchTerm('CSIT')}
                className="text-stone-600 hover:text-stone-900 hover:underline cursor-pointer"
              >
                BSc. CSIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Papers Table */}
      <section className="max-w-7xl mx-auto w-full px-4 lg:px-10 py-8">
        <div className="bg-white border border-stone-200 rounded shadow-sm overflow-hidden">
          {filteredPapers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 text-stone-600 text-[11px] uppercase tracking-wider border-b border-stone-200 font-semibold">
                    <th className="py-3 px-4 w-12 text-center">Ref</th>
                    <th className="py-3 px-4 min-w-[260px]">Document Title &amp; Course Details</th>
                    <th className="py-3 px-4 min-w-[140px]">Board</th>
                    <th className="py-3 px-4 min-w-[110px]">Year / Session</th>
                    <th className="py-3 px-4 min-w-[110px]">Format</th>
                    <th className="py-3 px-4 min-w-[130px]">Solution Status</th>
                    <th className="py-3 px-4 text-right min-w-[180px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPapers.map((paper) => (
                    <tr key={paper.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono text-stone-400 text-xs">
                        {paper.ref}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setActiveModalDoc(paper.title)}
                          className="font-semibold text-stone-900 hover:text-[#6d1115] text-left cursor-pointer"
                        >
                          {lang === 'ne' ? paper.titleNe : paper.title}
                        </button>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {lang === 'ne' ? paper.detailsNe : paper.details}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">
                        {lang === 'ne' ? paper.groupNameNe : paper.groupName}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-stone-800">{paper.year} B.S.</span>
                        <span className="block text-[11px] text-stone-500">
                          {lang === 'ne' ? paper.sessionNe : paper.session}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                        {paper.format} · {paper.size}
                      </td>
                      <td className="py-3.5 px-4">
                        {paper.solutionStatus === 'solution_attached' && (
                          <span className="text-[#6d1115] font-medium text-xs">
                            Solution attached
                          </span>
                        )}
                        {paper.solutionStatus === 'key_included' && (
                          <span className="text-stone-700 font-medium text-xs">
                            Answer key included
                          </span>
                        )}
                        {paper.solutionStatus === 'question_only' && (
                          <span className="text-stone-400 text-xs">
                            Question only
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end whitespace-nowrap">
                          <button
                            onClick={() => setActiveModalDoc(paper.title)}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium px-2.5 py-1 transition-colors cursor-pointer rounded-xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadTrigger(paper.title)}
                            className="bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-medium px-3 py-1 transition-colors cursor-pointer rounded-xs"
                          >
                            PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Clean Empty State */
            <div className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-3">
                <h3 className="font-serif text-lg text-stone-900 font-bold">
                  {lang === 'ne' ? 'कुनै पनि कागजात फेला परेन' : 'No Academic Documents Found'}
                </h3>
                <p className="text-xs text-stone-500">
                  No examination papers match your current search criteria. Try clearing filters or searching for general terms like "BCA", "CSIT", or "Loksewa".
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium py-2 px-4 border border-stone-300 transition-colors cursor-pointer rounded"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setRequestModalMode('request')}
                    className="bg-[#6d1115] text-white text-xs font-medium py-2 px-4 transition-colors cursor-pointer rounded"
                  >
                    Request Question Paper
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Footer */}
          <div className="bg-stone-50 px-4 py-3 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <div>
              Showing {filteredPapers.length} of {QUESTION_PAPERS.length} total entries
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 bg-white border border-stone-300 text-stone-400 cursor-not-allowed rounded">
                Previous
              </button>
              <button className="px-3 py-1 bg-[#701518] text-white font-bold rounded-xs">
                1
              </button>
              <button className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 cursor-pointer rounded-xs">
                2
              </button>
              <button className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 cursor-pointer rounded-xs">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Hard Copy Printing Section */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 border border-stone-200 rounded-xs shadow-xs space-y-3">
            <div className="text-xs font-serif font-bold text-[#701518] uppercase tracking-wider">
              {lang === 'ne' ? 'मुद्रित संकलन तथा पुस्तकालय शाखा' : 'Hard Copy Printing & Dispatch'}
            </div>
            <h3 className="font-serif text-lg text-stone-900 font-bold">
              {lang === 'ne' ? 'मुद्रित प्रश्नपत्र पुस्तिका वा ल्याब म्यानुअल आवश्यक छ?' : 'Need Spiral-Bound Past Question Booklets?'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed text-justify">
              {lang === 'ne' ? (
                'दैलेख, जुम्ला, जाजरकोट, कालिकोट र सल्यानबाट आउने परीक्षार्थीहरूले वर्षगत रूपमा स्पाइरल बाइन्डिङ गरिएका प्रश्नपुस्तिका तथा प्रयोगात्मक समाधानहरू हाम्रो प्रशासनिक शाखा (मध्यपश्चिम विश्वविद्यालय गेटबाट ५० मिटर पूर्व) बाट सिधै संकलन गर्न सक्नुहुन्छ।'
              ) : (
                'Students traveling from Dailekh, Jumla, Jajarkot, Kalikot, and Salyan can collect spiral-bound, year-wise past question booklets and solved lab manuals directly from our front administration desk, located 50m East of Mid-Western University Central Campus Gate.'
              )}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-500 border-t border-stone-100">
              <span>Hours: 6:30 AM – 5:30 PM (Sun–Fri)</span>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <span>Enquiries: +977 984-8041820</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 border border-stone-200 rounded-xs shadow-xs space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900">
              {lang === 'ne' ? 'नयाँ प्रश्नपत्र पठाउनुहोस्' : 'Contribute Recent Exam Papers'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'ne'
                ? 'हालसालै परीक्षा दिनुभएको छ भने प्रश्नपत्रको सफा फोटो वा स्क्यान पठाउनुहोस्। हाम्रो टोलीले समाधान तयार गरी सार्वजनिक गर्नेछ।'
                : 'Help fellow students across Karnali. Submit clean scans or photos of recent university or Loksewa examination papers.'}
            </p>
            <button
              onClick={() => setRequestModalMode('contribute')}
              className="w-full bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-medium py-2 px-3 transition-colors cursor-pointer rounded-xs"
            >
              Submit Exam Paper
            </button>
          </div>
        </div>
      </section>

      {/* Document Reader Modal */}
      {activeModalDoc && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl rounded-xs">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                  Verified Exam Resource
                </span>
                <h3 className="font-serif text-lg text-stone-900 font-bold mt-0.5">
                  {activeModalDoc}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalDoc(null)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                <div className="font-semibold text-stone-900">Mid-Western University / Examination Cell</div>
                <div className="text-stone-500">Official syllabus aligned question and solution key format.</div>
              </div>
              <p className="leading-relaxed">
                This document includes end-term examination questions, section-wise mark distributions, and step-by-step model solutions prepared by accredited instructors.
              </p>
              <div className="grid grid-cols-2 gap-2 text-stone-500 text-[11px] pt-1">
                <div>Language: Nepali &amp; English</div>
                <div>Status: Verified and OCR-checked</div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveModalDoc(null)}
                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer rounded-xs"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadTrigger(activeModalDoc)}
                className="px-4 py-1.5 bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold cursor-pointer rounded-xs shadow-xs"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contribute/Request Modal */}
      {requestModalMode && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 max-w-lg w-full p-6 space-y-4 shadow-2xl rounded">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                  {requestModalMode === 'contribute' ? 'Paper Submission' : 'Resource Request'}
                </span>
                <h3 className="font-serif text-base text-stone-900 font-bold mt-0.5">
                  {requestModalMode === 'contribute' 
                    ? 'Submit an Examination Paper for Digital Archive' 
                    : 'Request Uncatalogued Question Paper'}
                </h3>
              </div>
              <button
                onClick={() => setRequestModalMode(null)}
                className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleContributeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Institution / Board Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-Western University, CTEVT, Loksewa"
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-[#6d1115] rounded"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Course Title, Subject &amp; Year *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BCA 2nd Semester C++, 2080 B.S."
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-[#6d1115] rounded"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Your Full Name &amp; Contact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name, +977 98XXXXXXXX"
                  className="w-full bg-stone-50 border border-stone-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-[#6d1115] rounded"
                />
              </div>

              {formFeedback && (
                <div className="p-3 bg-stone-100 border border-stone-300 text-stone-800 text-xs rounded">
                  {formFeedback}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setRequestModalMode(null)}
                  className="px-3.5 py-1.5 bg-stone-100 text-stone-700 text-xs font-medium cursor-pointer rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#6d1115] text-white text-xs font-semibold hover:bg-[#8d2929] cursor-pointer rounded shadow-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
