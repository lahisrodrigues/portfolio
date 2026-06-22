import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/layout/back-to-top";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import StackAndProjects from "@/components/sections/stack-and-projects";
import Timeline from "@/components/sections/timeline";
import Projects from "@/components/sections/projects";
import ContactForm from "@/components/sections/contact-form";
import MatrixCanvas from "@/components/ui/matrix-canvas";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />

        {/* Matrix rain unificada — cobre Trajetória, Stack+Projetos e Processo */}
        <div className="relative bg-[#e0f2fe] dark:bg-[#0a0f1e]">
          <MatrixCanvas />
          <div className="absolute inset-0 z-[1] pointer-events-none bg-[#e0f2fe]/75 dark:bg-[#0a0f1e]/60" />
          <div className="relative z-[2]">
            <Timeline />
            <StackAndProjects />
            <Projects />
          </div>
        </div>

        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
