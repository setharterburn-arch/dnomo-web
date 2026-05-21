import Link from 'next/link'

export const metadata = {
  title: 'Order Confirmed | DNOMO USA',
  description: 'Your order has been confirmed.',
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-8xl mb-8">✓</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-400 mb-8">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-[#40E0D0] text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-[#3BC9BB] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}