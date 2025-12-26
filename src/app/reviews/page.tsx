const clientReviews = [
  {
    quote: "Procut Web transformed our raw footage into a masterpiece! Their attention to detail and creative vision are unparalleled. Highly recommend!",
    clientName: "Sarah J.",
    project: "E-commerce Ad Campaign",
  },
  {
    quote: "The team at Procut Web is incredibly talented. They delivered our YouTube series with such professionalism and artistic flair. Our audience loves the new look!",
    clientName: "David K.",
    project: "YouTube Channel Revamp",
  },
  {
    quote: "Working with Procut Web was a seamless experience. They understood our needs perfectly and produced an Instagram Reel that significantly boosted our engagement.",
    clientName: "Emily R.",
    project: "Instagram Reel Series",
  },
  {
    quote: "Exceptional quality and timely delivery! Procut Web exceeded our expectations with their motion graphics work for our corporate video.",
    clientName: "Mark L.",
    project: "Corporate Explainer Video",
  },
];

export default function Reviews() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-4 bg-black text-white">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">What Our Clients Say</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl text-center mb-16">
        Hear directly from our satisfied clients about their experience working with Procut Web.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        {clientReviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg p-8 shadow-lg flex flex-col hover:shadow-neon-purple transition-shadow duration-300"
          >
            <blockquote className="text-xl italic text-gray-200 mb-6 flex-grow">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <div className="text-right">
              <p className="text-neon-blue text-lg font-semibold">- {review.clientName}</p>
              {review.project && (
                <p className="text-gray-400 text-md">{review.project}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
