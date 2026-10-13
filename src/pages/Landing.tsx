import { Link } from 'react-router-dom'
import { Courses } from '../components/landing/Courses'
import { Faq } from '../components/landing/Faq'
import { Footer } from '../components/landing/Footer'
import { Hero } from '../components/landing/Hero'
import { Nav } from '../components/landing/Nav'
import { Paths } from '../components/landing/Paths'
import { Pricing } from '../components/landing/Pricing'
import { Testimonials } from '../components/landing/Testimonials'

export default function Landing() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Paths />
        <Courses />
        <Testimonials />
        <Pricing />
        <Faq />

        <section className="border-t border-line py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="max-w-2xl text-3xl font-bold sm:text-5xl">Tu primera línea de código está a un registro de distancia</h2>
            <Link
              to="/registro"
              className="mt-8 inline-block rounded-lg bg-mark px-6 py-3.5 font-semibold text-mark-ink transition-colors hover:bg-[#ffd566]"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
