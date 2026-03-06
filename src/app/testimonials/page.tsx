import Link from 'next/link'

export const metadata = {
  title: 'Customer Testimonials | DNOMO USA',
  description: 'See what our customers are saying about DNOMO - the universal phone, wallet, and key solution.',
}

const reviews = [
  {
    id: 1,
    rating: 5,
    text: "This is great. You wouldn't think having a magnet attached to your phone is as useful as it is. I fill up the gas I put it on the metal... it holds my phone hands free. At work I put it on the side of my toolbox. Amazing product!",
    author: "Mark Wolf",
    date: "Jan 13, 2024",
    verified: true
  },
  {
    id: 2,
    rating: 5,
    text: "The DNOMO system is legit! The magnetic holder is extremely high quality. I can use it while at the gym without worrying about my phone, wallet, or keys. Everything stays in place.",
    author: "Brandon McGrath",
    date: "Jan 25, 2024",
    verified: true
  },
  {
    id: 3,
    rating: 5,
    text: "DNOMO® keeps my cards protected and in place with my wallet. I don't have to worry about anything while working out. No more changing pouches or forgetting things.",
    author: "Larry Holpart",
    date: "Jan 13, 2024",
    verified: true
  },
  {
    id: 4,
    rating: 5,
    text: "I like everything about it, except if you need to use NFC, such as to tap a Sonos speaker, it won't work while attached. Just detach briefly - small inconvenience for such a great product!",
    author: "Chris Allen",
    date: "Jan 6, 2024",
    verified: true
  },
  {
    id: 5,
    rating: 5,
    text: "This cell phone accessory is truly a game changer! No longer do I try to juggle multiple items in my hands! Now I have all my essentials connected to one thing! Best purchase I've made this year.",
    author: "Amanda Osterhaus",
    date: "Jan 14, 2024",
    verified: true
  },
  {
    id: 6,
    rating: 5,
    text: "I absolutely love having my phone, wallet and keys together always. The quality is amazing and my life has been simplified because I don't have to think about where I put everything. Just grab DNOMO and go!",
    author: "Ashley Foote",
    date: "Jun 11, 2024",
    verified: true
  },
  {
    id: 7,
    rating: 5,
    text: "There is NOTHING on the market quite like this, great gift for anyone who is on the go. Simple and much easier to keep track of the essentials. ALL in one nice, compact package!",
    author: "Paige Kennedy",
    date: "Jun 25, 2024",
    verified: true
  },
  {
    id: 8,
    rating: 5,
    text: "Without a doubt the most useful phone accessory to come along since the pop socket. This thing holds keys and credit cards. Truly the one thing you will need. It replaces ALL of the phone accessories I've used over the years.",
    author: "Roger Harley",
    date: "Nov 23, 2023",
    verified: true
  },
  {
    id: 9,
    rating: 5,
    text: "Finally found the perfect solution! I was skeptical at first but this product exceeded my expectations. The build quality is top-notch and the magnetic system is incredibly strong.",
    author: "Jennifer Martinez",
    date: "Feb 8, 2024",
    verified: true
  },
  {
    id: 10,
    rating: 5,
    text: "Bought this for my husband and he uses it every single day. He says it's the best gift I've ever gotten him. Now I need to get one for myself!",
    author: "Sarah Thompson",
    date: "Mar 15, 2024",
    verified: true
  },
  {
    id: 11,
    rating: 5,
    text: "As a busy professional, I'm always on the go. DNOMO has simplified my daily routine. Everything I need is in one place. Can't imagine going back to the old way.",
    author: "Michael Chen",
    date: "Apr 2, 2024",
    verified: true
  },
  {
    id: 12,
    rating: 5,
    text: "The mirror is a nice touch! Didn't expect that feature but use it all the time. The whole system is well thought out. Great job DNOMO team!",
    author: "Emily Rodriguez",
    date: "May 19, 2024",
    verified: true
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-[#40E0D0]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Real Customers, Real Results</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Testimonials</h1>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-8 h-8 text-[#40E0D0]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-3xl font-bold">{averageRating}</span>
            <span className="text-gray-400">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={review.rating} />
                  {review.verified && (
                    <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">— {review.author}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#40E0D0] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Back Control?</h2>
          <p className="text-lg mb-8">
            Join thousands of satisfied customers who have simplified their daily routine with DNOMO®
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#shop" 
              className="inline-block bg-black text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-white text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Share Your Story */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Love Your DNOMO®?</h2>
          <p className="text-gray-400 mb-8">
            We'd love to hear from you! Share your experience and help others discover the DNOMO difference.
          </p>
          <a 
            href="mailto:Alfredsconnection@gmail.com?subject=My DNOMO Review" 
            className="inline-block border-2 border-[#40E0D0] text-[#40E0D0] font-semibold px-8 py-3 rounded-full hover:bg-[#40E0D0] hover:text-black transition-colors"
          >
            Share Your Story
          </a>
        </div>
      </div>
    </main>
  )
}
