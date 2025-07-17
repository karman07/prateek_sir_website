import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
                      <Router>
                        <ScrollToTop />
                        <div className="font-sans bg-white min-h-screen text-slate-900 flex flex-col justify-between">
                          <Navbar />
                          <main className="flex-grow">
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/about" element={<AboutUs />} />
                              <Route path="/contact" element={<Contact />} />
                              <Route path="/books" element={<BooksPage />} />
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
                                path="/chapterlist/:bookName"
                                element={<ChapterListPage />}
                              />
                            </Routes>
                          </main>
                          <Footer />
                        </div>
                      </Router>
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
