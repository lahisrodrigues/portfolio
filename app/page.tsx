import dynamic from "next/dynamic";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/layout/back-to-top";
import Hero from "@/components/sections/hero";
import LoadingScreen from "@/components/ui/loading-screen";

const ProjectsCarousel = dynamic(() => import("@/components/sections/projects-carousel"));
const About            = dynamic(() => import("@/components/sections/about"));
const Timeline         = dynamic(() => import("@/components/sections/timeline"));
const StackAndProjects = dynamic(() => import("@/components/sections/stack-and-projects"));
const Projects         = dynamic(() => import("@/components/sections/projects"));
const ContactForm      = dynamic(() => import("@/components/sections/contact-form"));
const MatrixCanvas     = dynamic(() => import("@/components/ui/matrix-canvas"));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <ProjectsCarousel />
        <About />

        {/* Matrix rain — cobre Processo, Stack e Trajetória */}
        <div className="relative bg-[#e0f2fe] dark:bg-[#0a0f1e]">
          <MatrixCanvas />
          <div className="absolute inset-0 z-[1] pointer-events-none bg-[#e0f2fe]/75 dark:bg-[#0a0f1e]/60" />
          <div className="relative z-[2]">
            <Projects />
            <StackAndProjects />
            <Timeline />
          </div>
        </div>

        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
