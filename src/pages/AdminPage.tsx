import React, { useState } from 'react';
import { Language, NavigationPath, GalleryItem, QuestionPaper, StudentEnrollment } from '../types';

interface AdminPageProps {
  lang: Language;
  onNavigate: (path: NavigationPath) => void;
  galleryItems: GalleryItem[];
  questionPapers: QuestionPaper[];
  enrollments: StudentEnrollment[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onTogglePublish: (id: string) => void;
  onAddQuestionPaper: (paper: QuestionPaper) => void;
  onDeleteQuestionPaper: (id: string) => void;
  onUpdateEnrollmentStatus: (id: string, status: 'pending' | 'verified' | 'enrolled') => void;
  onAdminLogout: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  lang,
  onNavigate,
  galleryItems,
  questionPapers,
  enrollments,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onTogglePublish,
  onAddQuestionPaper,
  onDeleteQuestionPaper,
  onUpdateEnrollmentStatus,
  onAdminLogout
}) => {
  const [activeTab, setActiveTab] = useState<'enrollments' | 'papers' | 'gallery' | 'overview'>('enrollments');

  // Enrollments filter & search
  const [enrollmentSearch, setEnrollmentSearch] = useState('');
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState<'all' | 'pending' | 'verified' | 'enrolled'>('all');
  const [selectedEnrollmentForView, setSelectedEnrollmentForView] = useState<StudentEnrollment | null>(null);

  // Question Papers filter & upload state
  const [paperSearch, setPaperSearch] = useState('');
  const [paperBoardFilter, setPaperBoardFilter] = useState('all');
  const [isPaperUploadModalOpen, setIsPaperUploadModalOpen] = useState(false);
  const [deletingPaperId, setDeletingPaperId] = useState<string | null>(null);

  // Paper Form State
  const [paperTitleEn, setPaperTitleEn] = useState('');
  const [paperTitleNe, setPaperTitleNe] = useState('');
  const [paperGroup, setPaperGroup] = useState<'mwu' | 'tu' | 'loksewa' | 'ctevt' | 'diploma'>('mwu');
  const [paperSubjectCode, setPaperSubjectCode] = useState('');
  const [paperSubjectArea, setPaperSubjectArea] = useState<'programming' | 'accounting' | 'operator' | 'hardware' | 'architecture' | 'math' | 'office'>('programming');
  const [paperYear, setPaperYear] = useState('2081');
  const [paperSession, setPaperSession] = useState('Spring 2024');
  const [paperSolutionStatus, setPaperSolutionStatus] = useState<'solution_attached' | 'key_included' | 'question_only'>('solution_attached');
  const [paperPdfUrl, setPaperPdfUrl] = useState('');
  const [paperPdfFileName, setPaperPdfFileName] = useState('');

  // Advanced Paper Settings
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [paperAccessLevel, setPaperAccessLevel] = useState<'public' | 'registered_only'>('public');
  const [paperExamType, setPaperExamType] = useState<'board_final' | 'terminal' | 'model_set' | 'supplementary'>('board_final');
  const [paperFullMarks, setPaperFullMarks] = useState<number>(80);
  const [paperPassMarks, setPaperPassMarks] = useState<number>(32);
  const [paperFacultyDept, setPaperFacultyDept] = useState('Faculty of Science & Technology, Mid-Western University');
  const [paperIsFeatured, setPaperIsFeatured] = useState(false);
  const [paperOcrIndexed, setPaperOcrIndexed] = useState(true);
  const [paperWatermark, setPaperWatermark] = useState('Surkhet Computer Institute - Verified Study Archive');

  // Gallery state
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');
  const [gallerySearch, setGallerySearch] = useState('');
  const [isGalleryUploadOpen, setIsGalleryUploadOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [deletingGalleryItem, setDeletingGalleryItem] = useState<GalleryItem | null>(null);
  const [galTitleNe, setGalTitleNe] = useState('');
  const [galTitleEn, setGalTitleEn] = useState('');
  const [galCategory, setGalCategory] = useState<'lab' | 'classroom' | 'loksewa' | 'events' | 'exam' | 'ceremony'>('lab');
  const [galOrder, setGalOrder] = useState<number>(galleryItems.length + 1);
  const [galStatus, setGalStatus] = useState<'published' | 'draft'>('published');
  const [galImagePreview, setGalImagePreview] = useState('');

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Filtered Enrollments
  const filteredEnrollments = enrollments.filter((enr) => {
    const q = enrollmentSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      enr.fullName.toLowerCase().includes(q) ||
      enr.mobile.includes(q) ||
      enr.email.toLowerCase().includes(q) ||
      enr.courseTitle.toLowerCase().includes(q) ||
      enr.district.toLowerCase().includes(q);

    const matchesStatus =
      enrollmentStatusFilter === 'all' || enr.status === enrollmentStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered Papers
  const filteredPapers = questionPapers.filter((p) => {
    const q = paperSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.titleNe.toLowerCase().includes(q) ||
      p.subjectCode.toLowerCase().includes(q) ||
      p.groupName.toLowerCase().includes(q);

    const matchesBoard = paperBoardFilter === 'all' || p.group === paperBoardFilter;
    return matchesSearch && matchesBoard;
  });

  // Filtered Gallery Items
  const filteredGallery = galleryItems.filter((item) => {
    const q = gallerySearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleNe.toLowerCase().includes(q);

    const matchesCat = galleryCategoryFilter === 'all' || item.category === galleryCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Paper PDF File selection
  const handlePdfFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaperPdfFileName(file.name);
      const url = URL.createObjectURL(file);
      setPaperPdfUrl(url);
    }
  };

  const handlePaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitleEn || !paperSubjectCode) return;

    const boardNames: Record<string, { en: string; ne: string }> = {
      mwu: { en: 'Mid-Western University (MWU)', ne: 'मध्यपश्चिम विश्वविद्यालय' },
      tu: { en: 'Tribhuvan University (TU)', ne: 'त्रिभुवन विश्वविद्यालय' },
      loksewa: { en: 'Pradesh Lok Sewa Aayog', ne: 'कर्णाली प्रदेश लोकसेवा आयोग' },
      ctevt: { en: 'CTEVT Technical Board', ne: 'सीटीईभिटी प्राविधिक बोर्ड' },
      diploma: { en: 'Institute Examination Cell', ne: 'इन्स्टिच्युट डिप्लोमा शाखा' }
    };

    const newPaper: QuestionPaper = {
      id: 'paper_' + Date.now(),
      ref: `QP-${paperYear}-${paperSubjectCode.toUpperCase()}`,
      title: paperTitleEn,
      titleNe: paperTitleNe || paperTitleEn,
      subjectCode: paperSubjectCode.toUpperCase(),
      details: `${paperExamType.replace('_', ' ').toUpperCase()} · ${paperSession} · ${paperFullMarks} Marks`,
      detailsNe: `${paperYear} सालको आधिकारिक परीक्षा प्रश्नपत्र तथा समाधान`,
      group: paperGroup,
      groupName: boardNames[paperGroup]?.en || 'Academic Board',
      groupNameNe: boardNames[paperGroup]?.ne || 'शैक्षिक बोर्ड',
      subject: paperSubjectArea,
      year: paperYear,
      session: paperSession,
      sessionNe: `${paperYear} शैक्षिक सत्र`,
      format: 'PDF (Verified OCR)',
      size: '2.4 MB',
      solutionStatus: paperSolutionStatus,
      pdfUrl: paperPdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',

      // Advanced Settings
      accessLevel: paperAccessLevel,
      examType: paperExamType,
      fullMarks: Number(paperFullMarks),
      passMarks: Number(paperPassMarks),
      facultyDepartment: paperFacultyDept,
      isFeatured: paperIsFeatured,
      ocrIndexed: paperOcrIndexed,
      watermarkText: paperWatermark,
      uploadedAt: new Date().toISOString().split('T')[0]
    };

    onAddQuestionPaper(newPaper);
    setIsPaperUploadModalOpen(false);
    showToast(`Question Paper "${newPaper.subjectCode}" successfully archived with advanced settings.`);
    
    // Reset form
    setPaperTitleEn('');
    setPaperTitleNe('');
    setPaperSubjectCode('');
    setPaperPdfFileName('');
    setPaperPdfUrl('');
  };

  // CSV Export for Enrollments
  const handleExportEnrollmentsCSV = () => {
    const headers = [
      'Registration ID',
      'Student Name',
      'Mobile',
      'Email',
      'Date of Birth',
      'Gender',
      'District',
      'Municipality & Ward',
      'Qualification',
      'Previous College',
      'Course',
      'Shift',
      'Experience Level',
      'Purpose',
      'Guardian Name',
      'Guardian Phone',
      'Status',
      'Enrolled At'
    ];

    const rows = filteredEnrollments.map((enr) => [
      enr.id,
      `"${enr.fullName}"`,
      enr.mobile,
      enr.email,
      `"${enr.dateOfBirth}"`,
      enr.gender,
      enr.district,
      `"${enr.municipalityWard}"`,
      `"${enr.academicQualification}"`,
      `"${enr.previousInstitution}"`,
      `"${enr.courseTitle}"`,
      `"${enr.preferredShift}"`,
      enr.computerExperience,
      `"${enr.trainingPurpose}"`,
      `"${enr.guardianName}"`,
      enr.guardianPhone,
      enr.status,
      enr.enrolledAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `surkhet_institute_enrollments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Enrollment roster exported as CSV.');
  };

  // Gallery handlers
  const handleOpenGalleryUpload = (item?: GalleryItem) => {
    if (item) {
      setEditingGalleryItem(item);
      setGalTitleNe(item.titleNe);
      setGalTitleEn(item.titleEn);
      setGalCategory(item.category);
      setGalOrder(item.order);
      setGalStatus(item.status);
      setGalImagePreview(item.imageUrl);
    } else {
      setEditingGalleryItem(null);
      setGalTitleNe('');
      setGalTitleEn('');
      setGalCategory('lab');
      setGalOrder(galleryItems.length + 1);
      setGalStatus('published');
      setGalImagePreview('https://lh3.googleusercontent.com/aida-public/AB6AXuBry_a2EAI_yyYQUF9RDqy5tn3gJkh9Cvl1jk-X4peblNhoF8YjkxS4w5qRMhD-xmZrTuP8Ngz_80EEnriBQJ577l6reWnJ5XEda-cdaCDIn5UAPMl2iI-g5n8hW5TqnIfIZzswzs1XCs6mlk2JU7sBs0pVUgGqoujEFVKcmN8L0LZp561JR_7L2QonBWvCXmzBzqMYJhbGGn0agismxbq7jJZbSllpMGYb6tDcJ6zPPsB6yZX0coBs');
    }
    setIsGalleryUploadOpen(true);
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitleNe || !galTitleEn) return;

    if (editingGalleryItem) {
      onUpdateGalleryItem({
        ...editingGalleryItem,
        titleNe: galTitleNe,
        titleEn: galTitleEn,
        category: galCategory,
        order: Number(galOrder),
        status: galStatus,
        imageUrl: galImagePreview || editingGalleryItem.imageUrl
      });
      showToast('Photo record updated.');
    } else {
      const newItem: GalleryItem = {
        id: 'g_' + Date.now(),
        order: Number(galOrder),
        titleNe: galTitleNe,
        titleEn: galTitleEn,
        descNe: 'प्रशासनिक कन्सोलबाट थपिएको आधिकारिक तस्बिर अभिलेख।',
        descEn: 'Newly registered and archived institutional photograph.',
        category: galCategory,
        categoryLabelNe: galCategory === 'lab' ? 'कम्प्युटर ल्याब' : galCategory === 'classroom' ? 'कक्षाकोठा' : galCategory === 'events' ? 'दीक्षान्त' : 'परीक्षा',
        categoryLabelEn: galCategory.toUpperCase(),
        dateNe: '२०८१',
        dateEn: '2024',
        size: '2.1 MB',
        status: galStatus,
        imageUrl: galImagePreview || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBry_a2EAI_yyYQUF9RDqy5tn3gJkh9Cvl1jk-X4peblNhoF8YjkxS4w5qRMhD-xmZrTuP8Ngz_80EEnriBQJ577l6reWnJ5XEda-cdaCDIn5UAPMl2iI-g5n8hW5TqnIfIZzswzs1XCs6mlk2JU7sBs0pVUgGqoujEFVKcmN8L0LZp561JR_7L2QonBWvCXmzBzqMYJhbGGn0agismxbq7jJZbSllpMGYb6tDcJ6zPPsB6yZX0coBs'
      };
      onAddGalleryItem(newItem);
      showToast('New photo added to gallery.');
    }

    setIsGalleryUploadOpen(false);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf9f7] min-h-screen">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xs shadow-xl flex items-center gap-3 text-xs border border-stone-700 animate-fade-in">
          <span className="material-symbols-outlined text-sm text-[#f8c9c6]">check_circle</span>
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-stone-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Official Admin Strip with Logout Action */}
      <div className="w-full bg-stone-900 text-stone-200 px-4 lg:px-10 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#f8c9c6] text-base">admin_panel_settings</span>
          <span className="font-semibold text-white">
            {lang === 'ne' 
              ? 'प्रशासनिक सामग्री नियन्त्रण तथा भर्ना व्यवस्थापन कन्सोल' 
              : 'Administrative Management & Admissions Console'}
          </span>
          <span className="hidden md:inline-block text-stone-600">·</span>
          <span className="hidden md:inline-block text-stone-400">
            Govt. Regd. 21700 · Surkhet-8
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-stone-300">
            Faculty Admin: <strong className="text-white">Er. Prakash Adhikari</strong>
          </span>
          <button
            onClick={onAdminLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-xs border border-stone-700 cursor-pointer transition-colors"
            title="Lock and sign out of admin"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Management Shell: 2-Column Split Console */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-6 lg:py-8 flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN: Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
          {/* Institute Officer Badge Card */}
          <div className="bg-white p-4 border border-stone-200 rounded-xs shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 bg-[#701518] text-white flex items-center justify-center font-serif text-lg font-bold rounded-xs">
              स
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold text-stone-900 leading-tight">
                सुरखेत इन्स्टिच्युट
              </span>
              <span className="text-[11px] text-stone-500 font-medium">Administration Desk</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="bg-white border border-stone-200 rounded-xs shadow-xs p-1.5 flex flex-col space-y-1">
            <div className="px-2.5 py-1 text-[10px] uppercase text-stone-500 font-semibold tracking-wider">
              Registers &amp; Modules
            </div>

            {/* Tab 1: Enrollments Ledger */}
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xs text-xs transition-colors text-left cursor-pointer ${
                activeTab === 'enrollments'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              type="button"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">how_to_reg</span>
                <span>{lang === 'ne' ? 'भर्ना भएका विद्यार्थीहरू' : 'Student Enrollments'}</span>
              </span>
              <span className={`text-[11px] font-mono tabular-nums ${activeTab === 'enrollments' ? 'text-white' : 'text-stone-500'}`}>
                {enrollments.length}
              </span>
            </button>

            {/* Tab 2: Question Papers Repository */}
            <button
              onClick={() => setActiveTab('papers')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xs text-xs transition-colors text-left cursor-pointer ${
                activeTab === 'papers'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              type="button"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>{lang === 'ne' ? 'प्रश्नपत्र बैंक अपलोड' : 'Question Papers (PDF)'}</span>
              </span>
              <span className={`text-[11px] font-mono tabular-nums ${activeTab === 'papers' ? 'text-white' : 'text-stone-500'}`}>
                {questionPapers.length}
              </span>
            </button>

            {/* Tab 3: Photo Gallery */}
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xs text-xs transition-colors text-left cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#701518] text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              type="button"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">photo_library</span>
                <span>{lang === 'ne' ? 'फोटो ग्यालरी' : 'Photo Gallery'}</span>
              </span>
              <span className={`text-[11px] font-mono tabular-nums ${activeTab === 'gallery' ? 'text-white' : 'text-stone-500'}`}>
                {galleryItems.length}
              </span>
            </button>
          </nav>
        </aside>

        {/* RIGHT COLUMN: Tab Content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: ENROLLED STUDENTS LEDGER */}
          {/* ========================================================= */}
          {activeTab === 'enrollments' && (
            <div className="space-y-6">
              {/* Top Banner with Stats & Export */}
              <div className="bg-white p-5 border border-stone-200 rounded-xs shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-0.5">
                    Admission Roster Ledger
                  </div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    {lang === 'ne' ? 'भर्ना भएका विद्यार्थीहरूको सूची' : 'Registered Student Course Enrollments'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Comprehensive student dossiers, academic records, and batch shift allotments.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportEnrollmentsCSV}
                    className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Export CSV Roster</span>
                  </button>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 border border-stone-200 rounded-xs shadow-xs">
                  <span className="text-xs text-stone-500 block mb-1">Total Registered Applications</span>
                  <span className="font-serif text-2xl font-bold text-stone-900">{enrollments.length}</span>
                </div>
                <div className="bg-white p-4 border border-stone-200 rounded-xs shadow-xs">
                  <span className="text-xs text-stone-500 block mb-1">Confirmed / Enrolled</span>
                  <span className="font-serif text-2xl font-bold text-emerald-700">
                    {enrollments.filter(e => e.status === 'enrolled').length}
                  </span>
                </div>
                <div className="bg-white p-4 border border-stone-200 rounded-xs shadow-xs">
                  <span className="text-xs text-stone-500 block mb-1">Pending Review</span>
                  <span className="font-serif text-2xl font-bold text-amber-700">
                    {enrollments.filter(e => e.status === 'pending').length}
                  </span>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="bg-white p-3 border border-stone-200 rounded-xs shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="relative w-full sm:w-80">
                  <input
                    className="w-full bg-stone-50 border border-stone-300 pl-8 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                    placeholder="Search by student name, phone, course..."
                    type="text"
                    value={enrollmentSearch}
                    onChange={(e) => setEnrollmentSearch(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-stone-400 text-sm pointer-events-none">
                    search
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-stone-500 whitespace-nowrap">Filter Status:</label>
                  <select
                    className="bg-stone-50 border border-stone-300 px-2 py-1 text-xs text-stone-900 rounded-xs cursor-pointer focus:outline-none focus:border-[#701518]"
                    value={enrollmentStatusFilter}
                    onChange={(e) => setEnrollmentStatusFilter(e.target.value as any)}
                  >
                    <option value="all">All Applications ({enrollments.length})</option>
                    <option value="pending">Pending Review</option>
                    <option value="verified">Verified</option>
                    <option value="enrolled">Confirmed Enrolled</option>
                  </select>
                </div>
              </div>

              {/* Enrollments Data Table */}
              <div className="bg-white border border-stone-200 rounded-xs shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[11px]">
                        <th className="py-3 px-4">Student Dossier</th>
                        <th className="py-3 px-4 min-w-[150px]">Course &amp; Shift</th>
                        <th className="py-3 px-4 min-w-[130px]">Origin &amp; Address</th>
                        <th className="py-3 px-4 min-w-[140px]">Academic Background</th>
                        <th className="py-3 px-4 min-w-[100px]">Status</th>
                        <th className="py-3 px-4 text-right min-w-[130px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredEnrollments.map((enr) => (
                        <tr key={enr.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-semibold text-stone-900 block text-sm">
                              {enr.fullName}
                            </span>
                            <span className="text-[11px] text-stone-500 block">
                              Tel: {enr.mobile} · {enr.email}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              Reg: {enr.id} · {enr.enrolledAt.split(' ')[0]}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-[#701518] block">
                              {enr.courseTitle}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {enr.preferredShift}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-stone-800 block">
                              {enr.district}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {enr.municipalityWard}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-stone-800 block">
                              {enr.academicQualification}
                            </span>
                            <span className="text-[11px] text-stone-500 block">
                              {enr.previousInstitution}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Skill: {enr.computerExperience}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={enr.status}
                              onChange={(e) => {
                                onUpdateEnrollmentStatus(enr.id, e.target.value as any);
                                showToast(`Status for ${enr.fullName} updated to ${e.target.value}.`);
                              }}
                              className={`text-[11px] font-semibold border px-2 py-1 rounded-xs cursor-pointer ${
                                enr.status === 'enrolled'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : enr.status === 'verified'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="verified">Verified</option>
                              <option value="enrolled">Enrolled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedEnrollmentForView(enr)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xs transition-colors cursor-pointer font-medium"
                            >
                              View Dossier
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                  <span>Showing {filteredEnrollments.length} of {enrollments.length} candidate applications</span>
                  <span>Surkhet Computer Institute Front Desk Roster</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: UPLOAD QUESTION PAPERS WITH ADVANCED SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'papers' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white p-5 border border-stone-200 rounded-xs shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-0.5">
                    Examination Repository Console
                  </div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    {lang === 'ne' ? 'प्रश्नपत्र बैंक तथा पीडीएफ अपलोड' : 'Question Paper Bank & PDF Uploader'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Upload official board questions, model solutions, and configure advanced examination metadata.
                  </p>
                </div>

                <button
                  onClick={() => setIsPaperUploadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold px-4 py-2.5 rounded-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">upload_file</span>
                  <span>Upload Question Paper (PDF)</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="bg-white p-3 border border-stone-200 rounded-xs shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="relative w-full sm:w-80">
                  <input
                    className="w-full bg-stone-50 border border-stone-300 pl-8 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                    placeholder="Search by title, subject code (e.g. CSIT, BCA)..."
                    type="text"
                    value={paperSearch}
                    onChange={(e) => setPaperSearch(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-stone-400 text-sm pointer-events-none">
                    search
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-stone-500 whitespace-nowrap">Filter Board:</label>
                  <select
                    className="bg-stone-50 border border-stone-300 px-2 py-1 text-xs text-stone-900 rounded-xs cursor-pointer focus:outline-none focus:border-[#701518]"
                    value={paperBoardFilter}
                    onChange={(e) => setPaperBoardFilter(e.target.value)}
                  >
                    <option value="all">All Boards</option>
                    <option value="mwu">Mid-Western University (MWU)</option>
                    <option value="tu">Tribhuvan University (TU)</option>
                    <option value="loksewa">Loksewa Aayog</option>
                    <option value="ctevt">CTEVT Technical</option>
                    <option value="diploma">Institute Diplomas</option>
                  </select>
                </div>
              </div>

              {/* Papers Ledger Table */}
              <div className="bg-white border border-stone-200 rounded-xs shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[11px]">
                        <th className="py-3 px-4">Subject &amp; Paper Title</th>
                        <th className="py-3 px-4 min-w-[140px]">Board &amp; Year</th>
                        <th className="py-3 px-4 min-w-[140px]">Solution Status</th>
                        <th className="py-3 px-4 min-w-[150px]">Advanced Settings</th>
                        <th className="py-3 px-4 text-right min-w-[130px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredPapers.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-semibold text-stone-900 block text-sm">
                              {p.title}
                            </span>
                            <span className="text-[11px] text-stone-500 block">
                              Code: <strong className="text-stone-700">{p.subjectCode}</strong> · {p.ref}
                            </span>
                            {p.pdfUrl && (
                              <span className="text-[10px] text-stone-400 font-mono">
                                File: {p.format} · {p.size}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-[#701518] block">
                              {p.groupName}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {p.year} B.S. · {p.session}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {p.solutionStatus === 'solution_attached' && (
                              <span className="text-emerald-700 font-medium">Solution Attached</span>
                            )}
                            {p.solutionStatus === 'key_included' && (
                              <span className="text-stone-700 font-medium">Answer Key Included</span>
                            )}
                            {p.solutionStatus === 'question_only' && (
                              <span className="text-stone-500">Question Only</span>
                            )}
                          </td>
                          <td className="py-3 px-4 space-y-0.5 text-[11px]">
                            <div className="text-stone-600">
                              Access: <strong className="text-stone-800">{p.accessLevel === 'registered_only' ? 'Registered Students' : 'Public'}</strong>
                            </div>
                            <div className="text-stone-500">
                              Type: {p.examType ? p.examType.replace('_', ' ') : 'Board Final'}
                              {p.fullMarks ? ` · ${p.fullMarks} Marks` : ''}
                            </div>
                            {p.ocrIndexed && (
                              <span className="text-stone-400 block text-[10px]">OCR Searchable: Yes</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                showToast(`Opening PDF document preview: ${p.title}`);
                              }}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xs font-medium cursor-pointer"
                            >
                              View PDF
                            </button>
                            <button
                              onClick={() => setDeletingPaperId(p.id)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-red-50 text-red-700 hover:text-red-800 rounded-xs font-medium cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                  <span>Showing {filteredPapers.length} question papers</span>
                  <span>Surkhet Computer Institute Exam Archive</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PHOTO GALLERY LEDGER */}
          {/* ========================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white p-5 border border-stone-200 rounded-xs shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-0.5">
                    Archival Media Console
                  </div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    {lang === 'ne' ? 'फोटो ग्यालरी अभिलेख' : 'Photo Gallery Ledger'}
                  </h2>
                </div>

                <button
                  onClick={() => handleOpenGalleryUpload()}
                  className="inline-flex items-center gap-1.5 bg-[#701518] hover:bg-[#8f2024] text-white text-xs font-semibold px-4 py-2 rounded-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
                  <span>Add New Photo</span>
                </button>
              </div>

              {/* Table */}
              <div className="bg-white border border-stone-200 rounded-xs shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[11px]">
                        <th className="py-3 px-4 w-12 text-center">#</th>
                        <th className="py-3 px-4 min-w-[70px]">Image</th>
                        <th className="py-3 px-4 min-w-[220px]">Title &amp; Archival Record</th>
                        <th className="py-3 px-4 min-w-[120px]">Category</th>
                        <th className="py-3 px-4 min-w-[100px]">Status</th>
                        <th className="py-3 px-4 text-right min-w-[140px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredGallery.map((item, index) => (
                        <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-3 px-4 text-center font-mono text-stone-400 text-xs">
                            {item.order || index + 1}
                          </td>
                          <td className="py-3 px-4">
                            <img
                              src={item.imageUrl}
                              alt={item.titleEn}
                              className="w-12 h-9 object-cover rounded-xs border border-stone-200 bg-stone-100"
                              referrerPolicy="no-referrer"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-stone-900 block">
                              {item.titleEn}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {item.dateEn} · {item.batch || 'General'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-600">
                            {item.categoryLabelEn}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                onTogglePublish(item.id);
                                showToast(`Toggled visibility for ${item.titleEn}`);
                              }}
                              className={`text-[11px] font-medium cursor-pointer ${
                                item.status === 'published' ? 'text-emerald-700 hover:underline' : 'text-stone-500 hover:underline'
                              }`}
                            >
                              {item.status === 'published' ? 'Published' : 'Draft'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleOpenGalleryUpload(item)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xs transition-colors cursor-pointer font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeletingGalleryItem(item)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-red-50 text-red-700 hover:text-red-800 rounded-xs transition-colors cursor-pointer font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: VIEW FULL STUDENT ENROLLMENT DOSSIER */}
      {/* ========================================================= */}
      {selectedEnrollmentForView && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedEnrollmentForView(null)}
        >
          <div 
            className="bg-white max-w-xl w-full rounded-xs shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#f8c9c6]">
                  Candidate ID: {selectedEnrollmentForView.id}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  {selectedEnrollmentForView.fullName}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedEnrollmentForView(null)}
                className="text-stone-400 hover:text-white p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Status Header */}
              <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xs">
                <div>
                  <span className="text-stone-500 block text-[11px]">Current Enrollment Status:</span>
                  <span className="font-semibold text-stone-900 uppercase tracking-wide">
                    {selectedEnrollmentForView.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onUpdateEnrollmentStatus(selectedEnrollmentForView.id, 'enrolled');
                      setSelectedEnrollmentForView({ ...selectedEnrollmentForView, status: 'enrolled' });
                      showToast('Status marked as Enrolled.');
                    }}
                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xs font-semibold cursor-pointer"
                  >
                    Confirm Enrolled
                  </button>
                  <button
                    onClick={() => {
                      onUpdateEnrollmentStatus(selectedEnrollmentForView.id, 'verified');
                      setSelectedEnrollmentForView({ ...selectedEnrollmentForView, status: 'verified' });
                      showToast('Status marked as Verified.');
                    }}
                    className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xs font-semibold cursor-pointer"
                  >
                    Mark Verified
                  </button>
                </div>
              </div>

              {/* Course & Shift */}
              <div className="border border-stone-200 p-3 rounded-xs space-y-1">
                <span className="font-bold text-[#701518] block">Applied Program</span>
                <div className="text-sm font-serif font-bold text-stone-900">
                  {selectedEnrollmentForView.courseTitle}
                </div>
                <div className="text-stone-600">
                  Shift: <strong className="text-stone-800">{selectedEnrollmentForView.preferredShift}</strong>
                </div>
              </div>

              {/* Personal Details Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xs">
                <div>
                  <span className="text-stone-500 block text-[11px]">Contact Mobile:</span>
                  <span className="font-semibold text-stone-900">{selectedEnrollmentForView.mobile}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Email Address:</span>
                  <span className="font-semibold text-stone-900">{selectedEnrollmentForView.email}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Date of Birth:</span>
                  <span className="text-stone-900">{selectedEnrollmentForView.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Gender:</span>
                  <span className="text-stone-900">{selectedEnrollmentForView.gender}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">District of Origin:</span>
                  <span className="text-stone-900 font-medium">{selectedEnrollmentForView.district}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Local Municipality &amp; Ward:</span>
                  <span className="text-stone-900">{selectedEnrollmentForView.municipalityWard}</span>
                </div>
              </div>

              {/* Academic & Skill Background */}
              <div className="border border-stone-200 p-3 rounded-xs space-y-2">
                <span className="font-bold text-stone-900 block">Academic Background</span>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Qualification:</span>
                    <span>{selectedEnrollmentForView.academicQualification}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Institution Attended:</span>
                    <span>{selectedEnrollmentForView.previousInstitution}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Prior Computer Skill:</span>
                    <span className="capitalize">{selectedEnrollmentForView.computerExperience}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Training Purpose:</span>
                    <span>{selectedEnrollmentForView.trainingPurpose}</span>
                  </div>
                </div>
              </div>

              {/* Guardian Info */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-1">
                <span className="font-bold text-stone-900 block">Emergency / Guardian Contact</span>
                <div className="text-stone-700">
                  {selectedEnrollmentForView.guardianName} · Phone: <strong className="text-stone-900">{selectedEnrollmentForView.guardianPhone}</strong>
                </div>
                {selectedEnrollmentForView.additionalNotes && (
                  <div className="pt-1 text-stone-600 text-[11px]">
                    <em>Notes: "{selectedEnrollmentForView.additionalNotes}"</em>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedEnrollmentForView(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-xs font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: UPLOAD QUESTION PAPER (PDF) WITH ADVANCED SETTINGS */}
      {/* ========================================================= */}
      {isPaperUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
          onClick={() => setIsPaperUploadModalOpen(false)}
        >
          <div 
            className="bg-white max-w-2xl w-full rounded-xs shadow-2xl border border-stone-300 overflow-hidden flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#701518] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#fce8e6] font-semibold">
                  Examination Archive Management
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  Upload Question Paper (PDF) &amp; Configure Settings
                </h3>
              </div>
              <button 
                onClick={() => setIsPaperUploadModalOpen(false)}
                className="text-white/80 hover:text-white p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handlePaperSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Primary Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Question Paper Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BSc. CSIT 1st Semester C Programming Board Exam"
                    value={paperTitleEn}
                    onChange={(e) => setPaperTitleEn(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Question Paper Title (Nepali)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा: बीएससी सीएसआईटी प्रथम सेमेस्टर सी प्रोग्रामिङ बोर्ड परीक्षा"
                    value={paperTitleNe}
                    onChange={(e) => setPaperTitleNe(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Academic Board / University *
                    </label>
                    <select
                      value={paperGroup}
                      onChange={(e) => setPaperGroup(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-300 px-2 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                    >
                      <option value="mwu">Mid-Western University (MWU)</option>
                      <option value="tu">Tribhuvan University (TU)</option>
                      <option value="loksewa">Loksewa Aayog (Karnali)</option>
                      <option value="ctevt">CTEVT Technical</option>
                      <option value="diploma">Institute Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Subject Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CSC-109 / BCA-101"
                      value={paperSubjectCode}
                      onChange={(e) => setPaperSubjectCode(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Subject Area
                    </label>
                    <select
                      value={paperSubjectArea}
                      onChange={(e) => setPaperSubjectArea(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-300 px-2 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                    >
                      <option value="programming">C / Programming</option>
                      <option value="accounting">Financial Accounting &amp; Tally</option>
                      <option value="operator">Computer Operator Skills</option>
                      <option value="hardware">Hardware &amp; Networks</option>
                      <option value="architecture">Microprocessor &amp; Architecture</option>
                      <option value="math">Discrete Mathematics</option>
                      <option value="office">Office Package</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Examination Year (B.S.)
                    </label>
                    <select
                      value={paperYear}
                      onChange={(e) => setPaperYear(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 px-2 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                    >
                      <option value="2081">2081 B.S. (2024)</option>
                      <option value="2080">2080 B.S. (2023)</option>
                      <option value="2079">2079 B.S. (2022)</option>
                      <option value="2078">2078 B.S. (2021)</option>
                      <option value="2077">2077 B.S. (2020)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Session / Term
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spring 2024 / Regular"
                      value={paperSession}
                      onChange={(e) => setPaperSession(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Solution / Answer Key
                    </label>
                    <select
                      value={paperSolutionStatus}
                      onChange={(e) => setPaperSolutionStatus(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-300 px-2 py-2 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                    >
                      <option value="solution_attached">Solution Attached</option>
                      <option value="key_included">Answer Key Included</option>
                      <option value="question_only">Question Paper Only</option>
                    </select>
                  </div>
                </div>

                {/* PDF File Picker */}
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs space-y-2">
                  <label className="block text-stone-800 font-semibold">
                    Upload PDF Document *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfFileSelect}
                    className="w-full text-xs text-stone-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xs file:border file:border-stone-300 file:bg-white file:text-xs file:font-semibold hover:file:bg-stone-100 cursor-pointer"
                  />
                  {paperPdfFileName && (
                    <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                      <span>Selected file: {paperPdfFileName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ========================================== */}
              {/* ADVANCED SETTINGS PANEL */}
              {/* ========================================== */}
              <div className="pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="flex items-center justify-between w-full p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xs font-semibold transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-[#701518]">tune</span>
                    <span>Advance Settings &amp; Examination Controls</span>
                  </span>
                  <span className="material-symbols-outlined text-base">
                    {showAdvancedSettings ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {showAdvancedSettings && (
                  <div className="mt-3 p-4 bg-stone-50 border border-stone-200 rounded-xs space-y-3 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Document Access Permission
                        </label>
                        <select
                          value={paperAccessLevel}
                          onChange={(e) => setPaperAccessLevel(e.target.value as any)}
                          className="w-full bg-white border border-stone-300 px-3 py-1.5 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                        >
                          <option value="public">Public (Open for all scholars)</option>
                          <option value="registered_only">Registered Students Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Examination Pattern
                        </label>
                        <select
                          value={paperExamType}
                          onChange={(e) => setPaperExamType(e.target.value as any)}
                          className="w-full bg-white border border-stone-300 px-3 py-1.5 text-stone-900 rounded-xs focus:outline-none focus:border-[#701518] cursor-pointer"
                        >
                          <option value="board_final">Board Final Examination</option>
                          <option value="terminal">Mid-Term / Internal Test</option>
                          <option value="model_set">Official Model Examination Set</option>
                          <option value="supplementary">Chance / Supplementary Exam</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Full Marks &amp; Pass Marks
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={paperFullMarks}
                            onChange={(e) => setPaperFullMarks(Number(e.target.value))}
                            placeholder="Full: 80"
                            className="w-1/2 bg-white border border-stone-300 px-2 py-1.5 text-stone-900 rounded-xs"
                          />
                          <input
                            type="number"
                            value={paperPassMarks}
                            onChange={(e) => setPaperPassMarks(Number(e.target.value))}
                            placeholder="Pass: 32"
                            className="w-1/2 bg-white border border-stone-300 px-2 py-1.5 text-stone-900 rounded-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-medium mb-1">
                          Department / Faculty Attribution
                        </label>
                        <input
                          type="text"
                          value={paperFacultyDept}
                          onChange={(e) => setPaperFacultyDept(e.target.value)}
                          placeholder="Faculty of Science & Tech"
                          className="w-full bg-white border border-stone-300 px-3 py-1.5 text-stone-900 rounded-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Archival Watermark Text
                      </label>
                      <input
                        type="text"
                        value={paperWatermark}
                        onChange={(e) => setPaperWatermark(e.target.value)}
                        placeholder="Surkhet Computer Institute - Free Archive"
                        className="w-full bg-white border border-stone-300 px-3 py-1.5 text-stone-900 rounded-xs"
                      />
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-6 text-stone-700">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paperOcrIndexed}
                          onChange={(e) => setPaperOcrIndexed(e.target.checked)}
                          className="rounded text-[#701518]"
                        />
                        <span>Enable Full-Text OCR Search Indexing</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paperIsFeatured}
                          onChange={(e) => setPaperIsFeatured(e.target.checked)}
                          className="rounded text-[#701518]"
                        />
                        <span>Pin to Featured Repository Top</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPaperUploadModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  <span>Publish Question Paper</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Paper Confirm */}
      {deletingPaperId && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setDeletingPaperId(null)}
        >
          <div 
            className="bg-white max-w-sm w-full rounded-xs shadow-2xl border border-stone-300 p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-base font-bold text-stone-900">
              Delete Question Paper
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to remove this examination document from the repository?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingPaperId(null)}
                className="px-3 py-1.5 border border-stone-300 text-stone-700 rounded-xs text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteQuestionPaper(deletingPaperId);
                  setDeletingPaperId(null);
                  showToast('Question paper deleted from archive.');
                }}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xs text-xs font-semibold cursor-pointer"
              >
                Delete Paper
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Gallery Item Confirm */}
      {deletingGalleryItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setDeletingGalleryItem(null)}
        >
          <div 
            className="bg-white max-w-sm w-full rounded-xs shadow-2xl border border-stone-300 p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-base font-bold text-stone-900">
              Delete Photo Record
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Remove "{deletingGalleryItem.titleEn}" from the photo ledger?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeletingGalleryItem(null)}
                className="px-3 py-1.5 border border-stone-300 text-stone-700 rounded-xs text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteGalleryItem(deletingGalleryItem.id);
                  setDeletingGalleryItem(null);
                  showToast('Photo removed from gallery.');
                }}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xs text-xs font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload/Edit Gallery Modal */}
      {isGalleryUploadOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsGalleryUploadOpen(false)}
        >
          <div 
            className="bg-white max-w-lg w-full rounded-xs shadow-2xl border border-stone-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-stone-900">
                {editingGalleryItem ? 'Edit Photo Record' : 'Upload & Register New Photo'}
              </h3>
              <button 
                onClick={() => setIsGalleryUploadOpen(false)}
                className="text-stone-500 hover:text-stone-900 p-1"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form className="p-5 space-y-4 text-xs" onSubmit={handleGallerySubmit}>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Title (Nepali) *</label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  placeholder="उदा: आधुनिक कम्प्युटर ल्याब सत्र"
                  required
                  type="text"
                  value={galTitleNe}
                  onChange={(e) => setGalTitleNe(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Title (English) *</label>
                <input
                  className="w-full bg-stone-50 border border-stone-300 px-3 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs"
                  placeholder="e.g. Advanced Practical Computer Lab"
                  required
                  type="text"
                  value={galTitleEn}
                  onChange={(e) => setGalTitleEn(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Category</label>
                  <select
                    className="w-full bg-stone-50 border border-stone-300 px-2 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs cursor-pointer"
                    value={galCategory}
                    onChange={(e) => setGalCategory(e.target.value as any)}
                  >
                    <option value="lab">Computer Lab</option>
                    <option value="classroom">Classroom</option>
                    <option value="loksewa">Loksewa &amp; Exam</option>
                    <option value="events">Ceremonies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Status</label>
                  <select
                    className="w-full bg-stone-50 border border-stone-300 px-2 py-2 text-stone-900 focus:outline-none focus:border-[#701518] rounded-xs cursor-pointer"
                    value={galStatus}
                    onChange={(e) => setGalStatus(e.target.value as any)}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGalleryUploadOpen(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#701518] hover:bg-[#8f2024] text-white rounded-xs font-semibold cursor-pointer"
                >
                  {editingGalleryItem ? 'Save Changes' : 'Upload to Archive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
