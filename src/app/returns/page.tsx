import Link from 'next/link'

export const metadata = {
  title: 'Returns & Exchanges | DNOMO USA',
  description: 'DNOMO return policy and exchange information. Easy 30-day returns.',
}

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Customer Service</p>
          <h1 className="text-4xl md:text-5xl font-bold">Returns & Exchanges</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          
          {/* Return Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Return Policy</h2>
            <p>
              We want you to be completely satisfied with your DNOMO® purchase. If for any reason you are not 
              satisfied, you may return your product within <strong>30 days</strong> of the original purchase date 
              for a full refund or exchange, subject to the conditions below.
            </p>
          </section>

          {/* Conditions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Return Conditions</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Products must be in original, unused condition with all original packaging</li>
              <li>Products that have been attached to a phone or used are not eligible for return (due to adhesive use)</li>
              <li>Proof of purchase (order number or receipt) is required</li>
              <li>Customer is responsible for return shipping costs</li>
              <li>Refunds will be processed within 5-7 business days after we receive your return</li>
            </ul>
          </section>

          {/* How to Return */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                Email us at <a href="mailto:Alfredsconnection@gmail.com" className="text-[#40E0D0] hover:underline">Alfredsconnection@gmail.com</a> with 
                your order number and reason for return
              </li>
              <li>Wait for confirmation and return authorization from our team</li>
              <li>
                Ship the product to:
                <div className="bg-gray-100 p-4 rounded-lg my-3 not-prose">
                  <p className="font-semibold">Alfreds Connection, INC.</p>
                  <p>110 Ensminger Dr</p>
                  <p>Glasgow, KY 42141, United States</p>
                </div>
              </li>
              <li>Include your order number and contact information with the return</li>
              <li>Use a trackable shipping method for your protection</li>
            </ol>
          </section>

          {/* Exchanges */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Exchanges</h2>
            <p>
              If you'd like to exchange your product for a different color or style, please follow the return 
              process above and place a new order for the item you want. This ensures the fastest processing time.
            </p>
          </section>

          {/* Damaged or Defective */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Damaged or Defective Products</h2>
            <p>
              If your product arrives damaged or is defective, please contact us immediately at{' '}
              <a href="mailto:Alfredsconnection@gmail.com" className="text-[#40E0D0] hover:underline">Alfredsconnection@gmail.com</a>.
              Include photos of the damage and your order number. We will arrange for a replacement or refund at no 
              additional cost to you.
            </p>
            <p className="mt-4">
              For warranty claims on products that develop defects after use, please see our{' '}
              <Link href="/terms" className="text-[#40E0D0] hover:underline">Limited Warranty</Link> policy.
            </p>
          </section>

          {/* Non-Returnable */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Non-Returnable Items</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products that have been attached to a device or used</li>
              <li>Products without original packaging</li>
              <li>Products returned after 30 days from purchase</li>
              <li>Products purchased from unauthorized retailers</li>
            </ul>
          </section>

        </div>

        {/* Contact CTA */}
        <div className="bg-gray-50 p-8 rounded-2xl text-center mt-12">
          <h3 className="text-xl font-bold mb-4">Questions About Returns?</h3>
          <p className="text-gray-600 mb-6">Our team is here to help with any questions about your return or exchange.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:Alfredsconnection@gmail.com" 
              className="inline-block bg-[#40E0D0] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#3BC9BB] transition-colors"
            >
              Email Us
            </a>
            <Link 
              href="/contact" 
              className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
