import Link from 'next/link'

export const metadata = {
  title: 'Terms & Conditions | DNOMO USA',
  description: 'DNOMO warranty information, terms of service, and legal policies.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          
          {/* Limited Warranty */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Limited Warranty</h2>
            <p>
              Doctor Nomo, LLC ("Doctor Nomo") warrants that its products will be free from defects in 
              workmanship and materials under normal use for 90 days from the date of purchase, subject to 
              conditions contained in this limited warranty.
            </p>
            <p>
              This Limited Warranty does not cover normal wear and tear of the product; damage caused by misuse, 
              mishandling, lack of care, accident or abuse; damage caused by improper or unauthorized repair or 
              maintenance; damage to a product that has been modified or altered; and damage to any product other 
              than the product, including without limitation damage to any device used in connection with the product.
            </p>
            <p>
              This Limited Warranty is non-transferable and covers only the original end purchaser and only applies 
              to products purchased from an authorized Doctor Nomo retailer who are required to follow Doctor Nomo's 
              quality controls.
            </p>
          </section>

          {/* Warranty Claim Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Warranty Claim Process</h2>
            <p>
              To make a warranty claim, please mail the product via traceable method, along with the original order 
              number and your name, phone number, physical address, and email address to the following address:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg my-6">
              <p className="font-semibold">DNOMO Warranty Claims Processing Center</p>
              <p>2558 Larkin Road, Suite 110</p>
              <p>Lexington, KY 40503</p>
            </div>
            <p>
              Upon inspection, if Doctor Nomo determines there is a warrantable defect in the product, Doctor Nomo 
              will, at its option, provide a product replacement or provide a refund of the purchase price within 
              30 days. The customer is responsible for shipping costs to return the product to Doctor Nomo, and 
              Doctor Nomo will pay shipping costs for the return shipment of the replacement.
            </p>
          </section>

          {/* Sole and Exclusive Remedy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Sole and Exclusive Remedy</h2>
            <p>
              If a workmanship or material defect arises for a covered product during the warranty period, Doctor 
              Nomo reserves the right in its discretion to send you a replacement product that is the same or of a 
              similar style or a substitute equivalent to customer's original purchased product that may not be of 
              like kind (depending on availability).
            </p>
            <p>
              Replacement products are covered by this limited warranty for the remainder of the original applicable 
              warranty period (in addition to any other rights you may have at law). In the event of a defect, these 
              are customer's sole and exclusive remedies.
            </p>
          </section>

          {/* Warranty Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Warranty Disclaimers</h2>
            <p className="uppercase text-sm">
              EXCEPT AS EXPRESSLY SET FORTH ABOVE, EACH PRODUCT IS PROVIDED SOLELY ON AN "AS IS" BASIS. DOCTOR NOMO 
              MAKES NO OTHER WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING 
              WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND 
              NON-INFRINGEMENT. TO THE EXTENT ANY IMPLIED WARRANTY CANNOT BE DISCLAIMED, SUCH WARRANTY WILL BE 
              CONFORMED TO THE MINIMUM PERIOD SO REQUIRED.
            </p>
            <p className="mt-4 text-gray-600">
              Some States do not allow limitations on how long an implied warranty lasts, so the above limitation 
              may not apply to you.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#40E0D0] mb-4">Limitation of Liability</h2>
            <p className="uppercase text-sm">
              TO THE EXTENT PERMITTED BY LAW, DOCTOR NOMO, ITS EMPLOYEES, AGENTS, AND SUPPLIERS SHALL NOT BE LIABLE 
              TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR EXEMPLARY DAMAGES 
              ARISING OUT OF THE USE OF OR INABILITY TO USE THE PRODUCT, INCLUDING WITHOUT LIMITATION DAMAGE TO ANY 
              DEVICE USED IN CONNECTION WITH THE PRODUCT.
            </p>
            <p className="uppercase text-sm mt-4">
              IF THIS LIMITATION OF LIABILITY IS NOT PERMITTED BY LAW, OR IS NOT EFFECTIVE AT LAW, THEN TO THE 
              EXTENT PERMITTED BY LAW, AND NOTWITHSTANDING ANY DAMAGES THAT YOU MIGHT INCUR FOR ANY REASON 
              WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES IN TORT (INCLUDING NEGLIGENCE), THE ENTIRE LIABILITY 
              OF DOCTOR NOMO AND ANY OF ITS SUPPLIERS SHALL BY LIMITED TO THE AMOUNT ACTUALLY PAID BY YOU FOR THE 
              PRODUCT.
            </p>
            <p className="mt-4 text-gray-600">
              Some States do not allow the exclusion or limitation of incidental or consequential damages, so the 
              above limitation or exclusion may not apply to you.
            </p>
          </section>

        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-block bg-[#40E0D0] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#3BC9BB] transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
