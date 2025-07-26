// pages/index.tsx
import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { Bubbles, Clock, Fuel, Droplets, Wrench, SearchCheck, ShowerHead, Heater, Siren, MapPinHouse } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function Home() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Head>
        <title>J.A. Zepeda Plumbing - Fast Plumbing and Heating Service Since 1972</title>
        <meta name="description" content="Licensed, insured & bonded plumbing services since 1972. Fast sewer & drain cleaning, repairs, and emergency service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section with Logo and Branding */}
        <header className="bg-gradient-to-b from-red-950 to-red-900 text-white relative">
          <div className="px-6 pb-16">
            <div className="max-w-6xl mx-auto text-center">
              {/* Eagle Logo */}
              <div className="mb-8">
                <Image 
                  src="/eagle.png" 
                  alt="J.A. Zepeda Plumbing Eagle Logo"
                  width={220}
                  height={220}
                  className="mx-auto mb-6"
                  priority // Since it's above the fold
                />
              </div>

              {/* Main Title */}
              <h1 className="text-6xl font-bold mb-4 tracking-wide">J.A. ZEPEDA PLUMBING</h1>
              
              {/* Tagline */}
              <p className="text-xl text-red-100 mb-2 font-semibold">FAST PLUMBING & HEATING SERVICE</p>
              
              {/* Credentials */}
              <p className="text-lg text-red-200 mb-2">LICENSED • INSURED • BONDED</p>
              
              {/* Experience */}
              <p className="text-lg text-red-200 mb-8">DOING BUSINESS SINCE 1972</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:210-349-4054" className="bg-white text-red-800 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-lg">
                  📞 Call Now: (210) 349-4054
                </a>
                <a href="#contact" className="bg-blue-950 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-900 transition shadow-lg">
                  Get Free Estimate
                </a>
              </div>
            </div>
          </div>

          {/* Decorative Pattern Border */}
          <div className="h-16 bg-red-900 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex text-red-500 text-lg opacity-60">
                {Array.from({length: 30}).map((_, i) => (
                  <span key={i}>◈━◈━◈━◈━◈━◈━◈━◈━</span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Services Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-red-800">SERVICES OFFERED</h2>
            
            {/* Services Grid - Single unified grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
              {[
                { icon: <Clock className="w-8 h-8" />, title: '24/7 Service', desc: 'Round the clock emergency service' },
                { icon: <Wrench className="w-8 h-8" />, title: 'Plumbing Repairs', desc: 'Expert repair services' },
                { icon: <SearchCheck className="w-8 h-8" />, title: 'Inspection', desc: 'Thorough system inspections' },
                { icon: <Fuel className="w-8 h-8" />, title: 'Gas Testing', desc: 'Safe gas line testing & leak repair' },
                { icon: <Bubbles className="w-8 h-8" />, title: 'Drain Cleaning', desc: 'Professional drain clearing' },
                { icon: <Heater className="w-8 h-8" />, title: 'Water Heaters', desc: 'Installation & repair' },
                { icon: <Droplets className="w-8 h-8" />, title: 'Sewer Service', desc: 'Complete sewer solutions' },
                { icon: <ShowerHead className="w-8 h-8" />, title: 'Faucets', desc: 'Faucet installation & repair' },
                { icon: <MapPinHouse className="w-8 h-8" />, title: 'Residential & Commercial', desc: 'Professional residential and commercial services' },
                { icon: <Siren className="w-8 h-8" />, title: 'Emergency', desc: 'Fast emergency service' }
              ].map((service, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-blue-950 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-fuchsia-900 to-fuchsia-950 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gray-300 rounded-lg overflow-hidden">
                  {/* Placeholder for professional photo */}
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                  {/* Eagle Logo */}
                    <Image 
                      src="/zepeda.JPG" 
                      alt="J.A. Zepeda Plumbing Eagle Logo"
                      width={340}
                      height={320}
                      className="mx-auto mb-6"
                      priority // Since it's above the fold
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6">ABOUT US</h2>
                <p className="text-lg leading-relaxed text-purple-100">
                  Locally owned and operated, we are proud to serve our San Antonio community with top-quality residential and commercial plumbing services. We offer competetive pricing and fast service! Owned by a retired marine cops Vietman veteran with decades of experience, you can trust us to get the job done right. 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-gradient-to-b from-red-900 to-red-950 text-white">
          <div className="pt-16 px-6 max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">GALLERY</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { text: '"Excellent service and very professional."', img: "1" },
                { text: '"Expert repairs done right the first time."', img: "2"},
                { text: '"Quick response and quality work."', img: "3" }
              ].map((item, index) => (
                <div key={index} className={`relative h-64 rounded-lg overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black bg-opacity-60 bg-cover" style={{ backgroundImage: `url(/plumbing-${item.img}.jpg)` }}></div>
                  <div className="relative z-10 text-center p-6">
                    <p className="text-lg font-semibold">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decorative border */}
          <div className="h-12 bg-red-950 relative overflow-hidden mt-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex text-red-500 text-xl opacity-50">
                {Array.from({length: 25}).map((_, i) => (
                  <span key={i}>◈━◈━◈━◈━◈━◈━◈━◈━</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold text-red-900 mb-8">CONTACT US</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">210-349-4054</h3>
                    <p className="text-gray-600">24/7 Emergency Service Available</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">zepma@aol.com</h3>
                    <p className="text-gray-600">Get your free quote today</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-gray-700 font-semibold">Licensed • Bonded • Insured</p>
                    <p className="text-gray-600">Serving San Antonio and surrounding areas</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={form.email}
                       onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      Thank you! We'll contact you within 24 hours.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
                      Sorry, there was an error. Please try again or call us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-900 text-white py-4 px-8 rounded-lg text-lg font-bold hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-red-900 text-white py-8 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-200">© 2025 J.A. Zepeda Plumbing. All rights reserved. • Licensed • Insured • Bonded since 1972</p>
          </div>
        </footer>
      </main>
    </>
  )
}