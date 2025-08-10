import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaYoutube, FaTimes, FaInfoCircle } from "react-icons/fa"; // ✅ Import icons

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import { BooksProvider } from "./contexts/BooksContext";
import { ResearchProvider } from "./contexts/ResearchContext";
import { CourseProvider } from "./contexts/CourseContext";
import BooksPage from "./pages/BooksPage";
import BookDetails from "./pages/BookDetails";
import AllResearchPage from "./pages/AllResearchPage";
import ResearchDetails from "./pages/ResearchDetails";
import AllCoursesPage from "./pages/AllCoursesPage";
import { PodcastProvider } from "@/contexts/PodcastContext";
import PodcastPage from "./pages/PodcastPage";
import ScrollToTop from "./components/ScrollToTop";
import { StudentProvider } from "./contexts/StudentContext";
import AdministrativePositions from "./pages/AdministrativePositions";
import JournalPublications from "./pages/JournalPublications";
import Workshops from "./pages/Workshops";
import ChapterListPage from "./pages/ChapterListPage";
import { AdminPositionsProvider } from "./contexts/AdminPositionsContext";
import { WorkshopsProvider } from "./contexts/WorkshopsContext";
import { JournalProvider } from "./contexts/JournalContext";
import { ChapterProvider } from "./contexts/ChapterContext";
import { TestimonialProvider } from "./contexts/TestimonialContext";
import { PoemProvider } from "./contexts/PoemContext";
import PoemsPage from "./pages/PoemsPage";
import StudentsPage from "./pages/StudentsPage";
import { PublicationsProvider } from "./contexts/PublicationsContext";
import PublicationsPage from "./pages/publications";
import ConferencesPage from "./pages/Conferences";
import { ConferencesProvider } from "./contexts/ConferencesContext";
import { ArticlesProvider } from "./contexts/ArticlesContext";
import ArticlesPage from "./pages/ArticlesPage";
import MLBookResources from "./pages/ResourcePage";

// Migration Notification Component (Floating)
const MigrationNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-sm">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-3 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-1 right-1 text-white hover:text-blue-200 transition-colors"
          aria-label="Close notification"
        >
          <FaTimes size={12} />
        </button>
        <div className="flex items-start pr-4">
          <FaInfoCircle className="text-blue-200 mr-2 mt-0.5 flex-shrink-0" size={16} />
          <div className="text-xs">
            <p className="font-semibold mb-1">Instructor Resources</p>
            <p className="text-blue-100 leading-relaxed">
              Explore My Machine Learning with Python: Principles and Practical Techniques on
              <a 
                href="/resources" 
                className="font-medium underline hover:text-white transition-colors"
              >
              {" "}Resources 
              </a>
            
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaviconIcon: React.FC = () => (
  <a
    href="https://www.youtube.com/@parteekbhatia/videos"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit YouTube Channel"
    className="fixed bottom-4 right-4 z-50 group"
  >
    <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-transform transform group-hover:scale-110 group-hover:shadow-xl">
      <FaYoutube size={28} />
    </div>
  </a>
);

const App: React.FC = () => {
  return (
    <BooksProvider>
      <ResearchProvider>
        <CourseProvider>
          <PodcastProvider>
            <StudentProvider>
              <AdminPositionsProvider>
                <WorkshopsProvider>
                  <JournalProvider>
                    <ChapterProvider>
                      <TestimonialProvider>
                        <PoemProvider>
                          <PublicationsProvider>
                            <ConferencesProvider>
                              <ArticlesProvider>
                          <Router>
                            <ScrollToTop />

                            {/* ✅ Migration Notification floating above YouTube icon */}
                            <MigrationNotification />

                            {/* ✅ YouTube favicon floating at bottom-right */}
                            <FaviconIcon />

                            <div className="font-sans bg-white min-h-screen text-slate-900 flex flex-col justify-between">
                              <Navbar />
                              <main className="flex-grow">
                                <Routes>
                                  <Route path="/" element={<Home />} />
                                  <Route path="/about" element={<AboutUs />} />
                                  <Route
                                    path="/contact"
                                    element={<Contact />}
                                  />
                                  <Route
                                    path="/books"
                                    element={<BooksPage />}
                                  />
                                  <Route
                                    path="/books/:id"
                                    element={<BookDetails />}
                                  />
                                  <Route
                                    path="/research"
                                    element={<AllResearchPage />}
                                  />
                                  <Route
                                    path="/research/:id"
                                    element={<ResearchDetails />}
                                  />
                                  <Route
                                    path="/courses"
                                    element={<AllCoursesPage />}
                                  />
                                  <Route
                                    path="/podcast"
                                    element={<PodcastPage />}
                                  />
                                  <Route
                                    path="/administrative"
                                    element={<AdministrativePositions />}
                                  />
                                  <Route
                                    path="/journals"
                                    element={<JournalPublications />}
                                  />
                                  <Route
                                    path="/workshops"
                                    element={<Workshops />}
                                  />
                                  <Route
                                    path="/chapterlist"
                                    element={<ChapterListPage />}
                                  />
                                  <Route
                                    path="/chapterlist/:bookName"
                                    element={<ChapterListPage />}
                                  />
                                 <Route
                                    path="/students"
                                    element={<StudentsPage />}
                                  />
                                  <Route
                                    path="/poems"
                                    element={<PoemsPage />}
                                  />
                                  <Route
                                    path="/publications"
                                    element={<PublicationsPage />}
                                  />
                                  <Route
                                    path="/conferences"
                                    element={<ConferencesPage />}
                                  />
                                  <Route
                                    path="/articles"
                                    element={<ArticlesPage />}
                                  />
                                  <Route
                                    path="/resources"
                                    element={<MLBookResources />}
                                  />
                                </Routes>
                              </main>
                              <Footer />
                            </div>
                          </Router>
                          </ArticlesProvider>
                          </ConferencesProvider>
                          </PublicationsProvider>
                        </PoemProvider>
                      </TestimonialProvider>
                    </ChapterProvider>
                  </JournalProvider>
                </WorkshopsProvider>
              </AdminPositionsProvider>
            </StudentProvider>
          </PodcastProvider>
        </CourseProvider>
      </ResearchProvider>
    </BooksProvider>
  );
};

export default App;