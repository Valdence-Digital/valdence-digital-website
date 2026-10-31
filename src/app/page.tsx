import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import BackToTop from '@/components/ui/BackToTop'
import { buildHomeJsonLd, serializeJsonLd } from '@/lib/structured-data'

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildHomeJsonLd()) }}
      />
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <About />
      <Reviews />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
