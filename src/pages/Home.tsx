import AboutMe from '@/components/AboutMe'
import Books from '@/components/Books'
import CourseList from '@/components/CourseList'
import Hero from '@/components/Hero'
import PodcastList from '@/components/PodcastList'
import ResearchWorkTable from '@/components/ResearchWorkTable'
import Statistics from '@/components/Statistics'
import Testimonials from '@/components/Testimonials'
import StudentList from '@/components/StudentList'

export default function Home() {
  return (
    <div>
        <Hero />
        <AboutMe />
        <Books />
        <Statistics />
        <ResearchWorkTable/>
        <CourseList/>
        <StudentList/>
        <PodcastList/>
        <Testimonials/>
    </div>
  )
}
