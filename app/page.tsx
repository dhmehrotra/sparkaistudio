import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProjectsCarousel from "@/components/projects-carousel"
import About from "@/components/about"
import Approach from "@/components/approach"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <ProjectsCarousel />
        <About />
        <Approach />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
