import Link from 'next/link'

export const metadata = {
  title: 'Magnet Safety | DNOMO USA',
  description: 'Important safety information about DNOMO magnetic products. Learn about magnet safety and device compatibility.',
}

export default function MagnetSafetyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Important Information</p>
          <h1 className="text-4xl md:text-5xl font-bold">Magnet Safety</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          
          {/* Overview */}
          <section className="mb-12">
            <div className="bg-[#40E0D0]/10 border-l-4 border-[#40E0D0] p-6 rounded-r-lg mb-8">
              <p className="text-lg font-medium m-0">
                DNOMO® products contain strong magnets. While these magnets are safe for everyday use with most 
                smartphones, please read the following important safety information.
              </p>
            </div>
          </section>

          {/* Device Compatibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Device Compatibility</h2>
            <p>
              DNOMO® is designed to work safely with all modern smartphones, including iPhones and Android devices. 
              The magnets in our products will not damage your phone, affect its performance, or erase data.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">✓ Safe to use with:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>All iPhones (including MagSafe compatible models)</li>
                <li>All Android smartphones</li>
                <li>Modern tablets and e-readers</li>
                <li>Wireless charging capable devices</li>
              </ul>
            </div>
          </section>

          {/* Cautions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Important Cautions</h2>
            <p>Strong magnets may interfere with certain devices and items. Please keep DNOMO® away from:</p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="font-bold text-red-700 mb-3">⚠️ Medical Devices</h3>
                <ul className="text-sm space-y-2">
                  <li><strong>Pacemakers</strong> - Keep at least 6 inches (15 cm) away</li>
                  <li><strong>Insulin pumps</strong> - Magnets may affect operation</li>
                  <li><strong>Defibrillators</strong> - Consult your doctor</li>
                  <li><strong>Other implanted devices</strong> - Consult manufacturer</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-700 mb-3">⚠️ Magnetic Media & Cards</h3>
                <ul className="text-sm space-y-2">
                  <li><strong>Magnetic stripe cards</strong> - May be demagnetized</li>
                  <li><strong>Hotel key cards</strong> - May stop working</li>
                  <li><strong>Old floppy disks/tapes</strong> - Data may be erased</li>
                  <li><strong>Some ID badges</strong> - Check if magnetic</li>
                </ul>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 italic">
              Note: Modern credit cards with chips (EMV) and contactless (NFC) are not affected by magnets. 
              DNOMO® includes an RFID/NFC blocking card to protect your cards.
            </p>
          </section>

          {/* NFC Consideration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">NFC & Contactless Payments</h2>
            <p>
              The RFID/NFC blocking card included with DNOMO® products is designed to protect your credit cards 
              from unauthorized scanning. However, this means:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>
                <strong>Contactless payments (Apple Pay, Google Pay):</strong> Work normally when the phone is 
                detached from the DNOMO wallet portion
              </li>
              <li>
                <strong>NFC readers (Sonos, smart home devices):</strong> May not work while phone is attached 
                to DNOMO; simply detach the phone to use NFC features
              </li>
            </ul>
          </section>

          {/* Safe Use Guidelines */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Safe Use Guidelines</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Keep away from children who might swallow small magnets</li>
              <li>Do not place near mechanical watches (may affect accuracy)</li>
              <li>Keep away from CRT monitors or TVs (if you still have them)</li>
              <li>Store away from magnetic compasses if precision is needed</li>
              <li>Not recommended for use with silicone phone cases (magnets won't hold as well)</li>
            </ul>
          </section>

          {/* Children Warning */}
          <section className="mb-12">
            <div className="bg-red-100 border border-red-300 p-6 rounded-lg">
              <h3 className="font-bold text-red-700 mb-3">⚠️ Warning: Keep Away From Children</h3>
              <p className="text-red-800 text-sm">
                Small magnets can be dangerous if swallowed. If two or more magnets are swallowed, they can 
                attract each other through intestinal walls, causing serious injury or death. Seek immediate 
                medical attention if magnet ingestion is suspected.
              </p>
            </div>
          </section>

        </div>

        {/* Questions CTA */}
        <div className="bg-gray-50 p-8 rounded-2xl text-center mt-12">
          <h3 className="text-xl font-bold mb-4">Questions About Safety?</h3>
          <p className="text-gray-600 mb-6">If you have any concerns about using DNOMO® with your specific device or medical condition, please contact us.</p>
          <a 
            href="mailto:Alfredsconnection@gmail.com" 
            className="inline-block bg-[#40E0D0] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#3BC9BB] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  )
}
