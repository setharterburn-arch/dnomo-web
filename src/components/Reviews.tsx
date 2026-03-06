'use client'

const reviews = [
  {
    id: 1,
    rating: 5,
    text: "This is great. You wouldn't think having a magnet attached to your phone is as useful as it is. I fill up the gas I put it on the metal...",
    author: "Mark Wolf",
    date: "Jan 13, 2024"
  },
  {
    id: 2,
    rating: 5,
    text: "The DNOMO system is legit! Thick every time ideal and Sspure Mas maded holder is extremely quality. Also I have/can slip using my w stile arm...",
    author: "Brandon McGrath",
    date: "Jan 25, 2024"
  },
  {
    id: 3,
    rating: 5,
    text: "I use DNOMO® keeps cards protected, and in place and wallet. I have to worry about working out. No changing pouch some yarn.",
    author: "Larry Holpart",
    date: "Jan 13, 2024"
  },
  {
    id: 4,
    rating: 5,
    text: "I like everything about it, except if you need to use NFC, such as to work a Sonora, it won't work.",
    author: "Chris Allen",
    date: "Jan 6, 2024"
  },
  {
    id: 5,
    rating: 5,
    text: "This cell phone accessory is truly a game changer! No longer do I try to juggle multiple items in my hands! No longer do I have all my essentials connected to one thing!",
    author: "Amanda Osterhaus",
    date: "Jan 14, 2024"
  },
  {
    id: 6,
    rating: 5,
    text: "I absolutely love having my phone, wallet and keys together always. The quality is amazing and My life has been simplified because I don't have to think...",
    author: "Ashley Foote",
    date: "Jun 11, 2024"
  },
  {
    id: 7,
    rating: 5,
    text: "There is NOTHING on the market quite like this, great gift for anyone who is on the go. Simple and much easier to keep track of the essentials, ALL nice...",
    author: "Paige Kennedy",
    date: "Jun 25, 2024"
  },
  {
    id: 8,
    rating: 5,
    text: "Without a doubt this most useful phone phone accessory to come along since the pop socket. This thing holds keys and credit cards. Truly the one thing you will need. It replaces ALL of the phone accessories I've used.",
    author: "Roger Harley",
    date: "Nov 23, 2023"
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#40E0D0] text-sm uppercase tracking-wider mb-2">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold">Customer Reviews</h2>
        </div>

        {/* Rating Summary */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">What our clients say about us</span>
            <span className="font-bold text-xl">4.90</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <button className="bg-[#40E0D0] text-black font-semibold px-6 py-2 rounded-full hover:bg-[#3BC9BB] transition-colors">
            Write a review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={review.rating} />
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                {review.text}
              </p>
              <p className="font-semibold text-sm">— {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
