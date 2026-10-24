export type Language = 'ne' | 'en';

export type NavigationPath = 
  | 'home' 
  | 'about-us' 
  | 'courses' 
  | 'study-materials' 
  | 'gallery' 
  | 'notices' 
  | 'contact' 
  | 'admin-login';

export interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  district: string;
  qualification: string;
  createdAt: string;
}

export interface StudentEnrollment {
  id: string;
  userId?: string;
  fullName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  district: string;
  municipalityWard: string;
  academicQualification: string;
  previousInstitution: string;
  courseId: string;
  courseTitle: string;
  preferredShift: string;
  computerExperience: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  trainingPurpose: string;
  guardianName: string;
  guardianPhone: string;
  additionalNotes?: string;
  enrolledAt: string;
  status: 'pending' | 'verified' | 'enrolled';
}

export interface QuestionPaper {
  id: string;
  ref: string;
  title: string;
  titleNe: string;
  subjectCode: string;
  details: string;
  detailsNe: string;
  group: 'mwu' | 'tu' | 'loksewa' | 'ctevt' | 'diploma';
  groupName: string;
  groupNameNe: string;
  subject: 'programming' | 'accounting' | 'operator' | 'hardware' | 'architecture' | 'math' | 'office';
  year: string;
  session: string;
  sessionNe: string;
  format: string;
  size: string;
  solutionStatus: 'solution_attached' | 'key_included' | 'question_only';
  pdfUrl?: string;
  
  // Advanced Settings
  accessLevel?: 'public' | 'registered_only';
  examType?: 'board_final' | 'terminal' | 'model_set' | 'supplementary';
  fullMarks?: number;
  passMarks?: number;
  facultyDepartment?: string;
  isFeatured?: boolean;
  ocrIndexed?: boolean;
  watermarkText?: string;
  uploadedAt?: string;
}

export interface GalleryItem {
  id: string;
  order: number;
  titleEn: string;
  titleNe: string;
  descEn: string;
  descNe: string;
  category: 'lab' | 'classroom' | 'loksewa' | 'events' | 'exam' | 'ceremony';
  categoryLabelEn: string;
  categoryLabelNe: string;
  dateEn: string;
  dateNe: string;
  size: string;
  status: 'published' | 'draft';
  imageUrl: string;
  batch?: string;
  locationEn?: string;
  locationNe?: string;
  leadEn?: string;
  leadNe?: string;
}

export interface NoticeItem {
  id: string;
  titleNe: string;
  titleEn: string;
  dateNe: string;
  dateEn: string;
  category: 'exam' | 'admission' | 'holiday' | 'event';
  categoryLabel: string;
  isUrgent?: boolean;
  contentNe: string;
  contentEn: string;
  fileAttachment?: string;
}

export interface CourseItem {
  id: string;
  code: string;
  titleNe: string;
  titleEn: string;
  durationNe: string;
  durationEn: string;
  tag: string;
  tagColor: string;
  descNe: string;
  descEn: string;
  focusNe: string;
  focusEn: string;
  badgeNe: string;
  badgeEn: string;
  syllabus: { topic: string; details: string }[];
  timings: string[];
}
