'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just show success - this can be connected to a backend later
    setSubmitted(true)
    // Open email client as fallback
    const subject = encodeURIComponent('Contact Form Submission from DNOMO Website')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:Alfredsconnection@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#40E0D0]">GET IN TOUCH</h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-black py-12">
        <div className="max-w-2xl mx-auto px-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <input
                type="text"
                placeholder="Zip / Postal Code"
                value={formData.zip}
                onChange={(e) => setFormData({...formData, zip: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              />
              
              <select
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black focus:ring-2 focus:ring-[#40E0D0] focus:outline-none"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
              
              <textarea
                placeholder="Your message..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-white border-0 rounded-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-[#40E0D0] focus:outline-none resize-none"
              />
              
              <button
                type="submit"
                className="w-full bg-[#40E0D0] text-black font-bold py-4 rounded-lg text-lg hover:bg-[#3BC9BB] transition-colors"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✉️</div>
              <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-gray-400 mb-6">Your email client should open with your message. If not, please email us directly.</p>
              <a 
                href="mailto:Alfredsconnection@gmail.com" 
                className="inline-block bg-[#40E0D0] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#3BC9BB] transition-colors"
              >
                Email Us Directly
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Contact Us or Returns</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-1">Email:</p>
                  <a href="mailto:Alfredsconnection@gmail.com" className="text-[#40E0D0] font-semibold text-lg hover:underline">
                    Alfredsconnection@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-gray-600 mb-1">Return ship to:</p>
                  <p className="font-semibold text-lg text-[#40E0D0]">Alfreds Connection, INC.</p>
                </div>

                <div>
                  <p className="text-gray-600 mb-1">Warranty Return Address:</p>
                  <p className="font-semibold">
                    <span className="text-[#40E0D0]">110 Ensminger Dr,</span><br />
                    <span className="text-[#40E0D0]">Glasgow, KY 42141, United States</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Warranty Claims */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Warranty Claims</h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  For warranty claims, please mail the product with your order number and contact info to:
                </p>
                
                <div className="bg-black text-white p-6 rounded-xl">
                  <p className="font-semibold">DNOMO Warranty Claims Processing Center</p>
                  <p>2558 Larkin Road, Suite 110</p>
                  <p>Lexington, KY 40503</p>
                </div>

                <p className="text-sm text-gray-600">
                  Products are covered under a 90-day limited warranty from date of purchase.
                </p>

                <Link href="/terms" className="inline-block text-[#40E0D0] font-semibold hover:underline">
                  View Full Warranty Terms →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions? We're Here to Help!</h2>
          <p className="text-gray-400 mb-8">
            Email us anytime and we'll get back to you within 24-48 hours.
          </p>
          <a 
            href="mailto:Alfredsconnection@gmail.com" 
            className="inline-block bg-[#40E0D0] text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-[#3BC9BB] transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </main>
  )
}
