import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/layout/back-to-top";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import StackAndProjects from "@/components/sections/stack-and-projects";
import Timeline from "@/components/sections/timeline";
import Projects from "@/components/sections/projects";
import ContactForm from "@/components/sections/contact-form";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <StackAndProjects />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
