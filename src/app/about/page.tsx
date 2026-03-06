import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About DNOMO | Your Phone, Wallet and Key Solution',
  description: 'Learn about DNOMO - the universal cell phone accessory system that gives you control over your phone, wallet, and keys.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Who We Are</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DNOMO®</h1>
          <p className="text-xl text-gray-300 italic">
            "If necessity is the mother of invention, discontent is the father of progress." 
            <span className="text-[#40E0D0]"> – David Rockefeller</span>
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-xl leading-relaxed">
              DNOMO® was born when our founder, Dr. H, a busy dentist in Lexington, KY, became tired of being 
              controlled by his phone, wallet, and keys every day. He began searching online and in stores for 
              a product to reduce the stress that keeping up with these items caused.
            </p>
            <p className="text-xl leading-relaxed">
              There were many products out there that remedied one issue, but in doing so, created a new problem! 
              Frustrated with the lack of a true solution, he decided to create an all-inclusive, universal cell 
              phone accessory system that gives you control over your phone, wallet, and keys...all day, every day!
            </p>
            <p className="text-xl leading-relaxed font-semibold">
              Two years later, the DNOMO was born and as they say, "the rest is history!"
            </p>
          </div>
        </div>
      </div>

      {/* Take Control Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Take Back Control</h2>
          <p className="text-lg text-gray-700 mb-8">
            Most of us, upon leaving the house in the mornings, check to make sure we have our phone, wallet, 
            and keys. These are items that are such an integral part of our day, that if we misplace them, it 
            can cause unwanted confusion and chaos!
          </p>
          <p className="text-lg text-gray-700 mb-8">
            The problems that can arise by not being in control of your phone, wallet, and keys are many, but 
            thankfully, there is finally a product that alleviates them all!
          </p>
          <p className="text-2xl font-bold text-[#40E0D0]">
            Are you ready to take back control?
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#40E0D0] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Universal */}
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">It's UNIVERSAL</h3>
              <p className="text-xl mb-2">Fits all non-flip smartphones</p>
              <p className="text-sm text-gray-700">(not recommended for use with silicone cases)</p>
            </div>
            
            {/* Transferrable */}
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">It's TRANSFERRABLE</h3>
              <ul className="text-lg space-y-2">
                <li>• Time to change or upgrade your phone, keep DNOMO®</li>
                <li>• Simply peel DNOMO® from the old phone & apply new adhesive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Note */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Phone, Wallet and Key Solution</h2>
          <p className="text-lg text-gray-600">
            <strong>Note:</strong> Customer to pick from Carbon Fiber Finish or Black Finish
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience DNOMO?</h2>
          <Link href="/products" className="inline-block bg-[#40E0D0] text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-[#3BC9BB] transition-colors">
            SHOP NOW
          </Link>
        </div>
      </div>
    </main>
  )
}
