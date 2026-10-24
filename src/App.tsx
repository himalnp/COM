/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Language, 
  NavigationPath, 
  GalleryItem, 
  QuestionPaper, 
  StudentUser, 
  StudentEnrollment, 
  CourseItem 
} from './types';
import { 
  INITIAL_GALLERY, 
  INITIAL_STUDENT_USERS, 
  INITIAL_ENROLLMENTS, 
  QUESTION_PAPERS 
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { StudyMaterialsPage } from './pages/StudyMaterialsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CoursesPage } from './pages/CoursesPage';
import { NoticesPage } from './pages/NoticesPage';
import { AboutPage } from './pages/AboutPage';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AuthModal } from './components/AuthModal';
import { EnrollmentModal } from './components/EnrollmentModal';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('scicc_lang');
      return saved === 'en' ? 'en' : 'ne';
    } catch {
      return 'ne';
    }
  });

  const [currentPath, setCurrentPath] = useState<NavigationPath>('home');

  // Persisted state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('scicc_gallery');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GALLERY;
  });

  const [studentUsers, setStudentUsers] = useState<StudentUser[]>(() => {
    try {
      const saved = localStorage.getItem('scicc_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STUDENT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    try {
      const saved = localStorage.getItem('scicc_current_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>(() => {
    try {
      const saved = localStorage.getItem('scicc_enrollments');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ENROLLMENTS;
  });

  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>(() => {
    try {
      const saved = localStorage.getItem('scicc_papers');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return QUESTION_PAPERS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('scicc_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Modal states
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalRedirectMsg, setAuthModalRedirectMsg] = useState<string | undefined>(undefined);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState<CourseItem | null>(null);

  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
  const [selectedPaperTitle, setSelectedPaperTitle] = useState<string | undefined>(undefined);

  // Sync language with document attributes
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    try {
      localStorage.setItem('scicc_lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  // Persist gallery items
  useEffect(() => {
    try {
      localStorage.setItem('scicc_gallery', JSON.stringify(galleryItems));
    } catch {
      // ignore
    }
  }, [galleryItems]);

  // Persist student users
  useEffect(() => {
    try {
      localStorage.setItem('scicc_users', JSON.stringify(studentUsers));
    } catch {
      // ignore
    }
  }, [studentUsers]);

  // Persist current logged-in user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('scicc_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('scicc_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Persist enrollments
  useEffect(() => {
    try {
      localStorage.setItem('scicc_enrollments', JSON.stringify(enrollments));
    } catch {
      // ignore
    }
  }, [enrollments]);

  // Persist question papers
  useEffect(() => {
    try {
      localStorage.setItem('scicc_papers', JSON.stringify(questionPapers));
    } catch {
      // ignore
    }
  }, [questionPapers]);

  // Persist admin auth state in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('scicc_admin_auth', isAdminAuthenticated ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isAdminAuthenticated]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  const handleNavigate = (path: NavigationPath) => {
    if (path === 'admin-login' && !isAdminAuthenticated) {
      setIsAdminLoginModalOpen(true);
      return;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin passkey handlers
  const handleAdminNavClick = () => {
    if (isAdminAuthenticated) {
      setCurrentPath('admin-login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginModalOpen(false);
    setCurrentPath('admin-login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPath('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student authentication handlers
  const handleOpenAuth = (mode: 'login' | 'register' = 'login', redirectMsg?: string) => {
    setAuthModalMode(mode);
    setAuthModalRedirectMsg(redirectMsg);
    setIsAuthModalOpen(true);
  };

  const handleStudentLoginSuccess = (user: StudentUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleRegisterUser = (newUser: StudentUser) => {
    setStudentUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
  };

  const handleStudentLogout = () => {
    setCurrentUser(null);
  };

  // Enrollment handlers
  const handleOpenEnrollModal = (course?: CourseItem) => {
    setSelectedEnrollCourse(course || null);
    setIsEnrollModalOpen(true);
  };

  const handleSubmitEnrollment = (newEnrollment: StudentEnrollment) => {
    setEnrollments((prev) => [newEnrollment, ...prev]);
  };

  const handleUpdateEnrollmentStatus = (id: string, status: 'pending' | 'verified' | 'enrolled') => {
    setEnrollments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  // Question Papers handlers
  const handleAddQuestionPaper = (newPaper: QuestionPaper) => {
    setQuestionPapers((prev) => [newPaper, ...prev]);
  };

  const handleDeleteQuestionPaper = (id: string) => {
    setQuestionPapers((prev) => prev.filter((p) => p.id !== id));
  };

  // Gallery handlers
  const handleAddGalleryItem = (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateGalleryItem = (updatedItem: GalleryItem) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTogglePublish = (id: string) => {
    setGalleryItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === 'published' ? 'draft' : 'published'
          };
        }
        return item;
      })
    );
  };

  const handleSelectCourseFromHome = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPath('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewPaperFromHome = (title: string) => {
    setSelectedPaperTitle(title);
    setCurrentPath('study-materials');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7] text-stone-900">
      {/* Universal Fixed Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminClick={handleAdminNavClick}
        currentUser={currentUser}
        onOpenAuthModal={() => handleOpenAuth('login')}
        onStudentLogout={handleStudentLogout}
      />

      {/* Main Screen Content with offset for fixed header */}
      <main className="w-full pt-[96px] sm:pt-[102px] min-h-screen bg-[#faf9f7] flex-grow">
        {currentPath === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectCourse={handleSelectCourseFromHome}
            onPreviewPaper={handlePreviewPaperFromHome}
          />
        )}

        {currentPath === 'study-materials' && (
          <StudyMaterialsPage
            lang={lang}
            onNavigate={handleNavigate}
            selectedPaperTitle={selectedPaperTitle}
            onClearPaperSelection={() => setSelectedPaperTitle(undefined)}
            questionPapers={questionPapers}
          />
        )}

        {currentPath === 'gallery' && (
          <GalleryPage
            lang={lang}
            onNavigate={handleNavigate}
            galleryItems={galleryItems}
          />
        )}

        {currentPath === 'contact' && (
          <ContactPage
            lang={lang}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentPath === 'admin-login' && (
          <AdminPage
            lang={lang}
            onNavigate={handleNavigate}
            galleryItems={galleryItems}
            questionPapers={questionPapers}
            enrollments={enrollments}
            onAddGalleryItem={handleAddGalleryItem}
            onUpdateGalleryItem={handleUpdateGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onTogglePublish={handleTogglePublish}
            onAddQuestionPaper={handleAddQuestionPaper}
            onDeleteQuestionPaper={handleDeleteQuestionPaper}
            onUpdateEnrollmentStatus={handleUpdateEnrollmentStatus}
            onAdminLogout={handleAdminLogout}
          />
        )}

        {currentPath === 'courses' && (
          <CoursesPage
            lang={lang}
            onNavigate={handleNavigate}
            initialCourseId={selectedCourseId}
            onOpenEnrollModal={handleOpenEnrollModal}
          />
        )}

        {currentPath === 'notices' && (
          <NoticesPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === 'about-us' && (
          <AboutPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Universal Institutional Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop lang={lang} />

      {/* Admin Password Gate Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
        lang={lang}
      />

      {/* Student Registration & Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleStudentLoginSuccess}
        lang={lang}
        users={studentUsers}
        onRegisterUser={handleRegisterUser}
        initialMode={authModalMode}
        redirectMessage={authModalRedirectMsg}
      />

      {/* Institutional Course Enrollment Modal (Multi-field, requires auth) */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        selectedCourse={selectedEnrollCourse}
        currentUser={currentUser}
        onOpenAuth={(msg) => {
          setIsEnrollModalOpen(false);
          handleOpenAuth('register', msg);
        }}
        onSubmitEnrollment={handleSubmitEnrollment}
        lang={lang}
      />
    </div>
  );
}
