import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Books from "./components/Books";
import Statistics from "./components/Statistics";
import { BooksProvider } from "./contexts/BooksContext";
import ResearchWorkTable from "./components/ResearchWorkTable";
import { ResearchProvider } from "./contexts/ResearchContext";
import CourseList from "./components/CourseList";
import { CourseProvider } from "./contexts/CourseContext";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <BooksProvider>
      <ResearchProvider>
         <CourseProvider>
      <div className="font-sans bg-white min-h-screen text-slate-900">
        <Navbar />
        <Hero />
        <AboutMe />
        <Books />
        <Statistics />
        <ResearchWorkTable/>
        <CourseList/>
        <Testimonials/>
        <Footer/>
      </div>
      </CourseProvider>
      </ResearchProvider>
    </BooksProvider>
  );
};

export default App;
