import Link from 'next/link'

export const metadata = {
  title: 'Contact Us | DNOMO USA',
  description: 'Contact DNOMO for support, returns, or warranty claims. We\'re here to help!',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-[#40E0D0] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-black/70 text-sm uppercase tracking-wider mb-2">Reach Out to Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-black">Your Phone, Wallet<br />and Key Solution</h1>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-2">
              <strong>Note:</strong> Customer to pick from Carbon Fiber Finish or Black Finish
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
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
