import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import TechStack from "@/components/sections/tech-stack";
import ContactForm from "@/components/sections/contact-form";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
