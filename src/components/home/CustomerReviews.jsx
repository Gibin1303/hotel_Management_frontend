import ReviewCard from "../common/ReviewCard";

const reviews = [
  {
    id: 1,
    name: "Arjun Nair",
    location: "Kochi, Kerala",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    hotel: "Kumarakom Lake Resort",
    comment:
      "Amazing experience. The room was clean, staff were friendly and the booking process was very smooth.",
  },

  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    hotel: "Taj Palace Mumbai",
    comment:
      "Beautiful property with excellent service. The hotel exceeded our expectations.",
  },

  {
    id: 3,
    name: "Rahul Verma",
    location: "Delhi",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4,
    hotel: "The Leela Goa",
    comment:
      "Great location and comfortable stay. The offers made the booking affordable.",
  },

  {
    id: 4,
    name: "Ananya Menon",
    location: "Bangalore",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    hotel: "Munnar Resort",
    comment: "Perfect place for a family vacation. Highly recommended.",
  },
];

export default function CustomerReviews() {
  return (
    <section
      className="
bg-pearl-50
py-20
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
"
      >
        {/* Heading */}

        <div
          className="
mb-12
text-center
"
        >
          <p
            className="
text-sm
uppercase
tracking-widest
text-brass-600
"
          >
            Guest Experiences
          </p>

          <h2
            className="
mt-3
text-4xl
font-semibold
text-ink-800
"
          >
            What Our Customers Say
          </h2>

          <p
            className="
mx-auto
mt-4
max-w-xl
text-pearl-600
"
          >
            Thousands of travelers trust us for their perfect stay experience.
          </p>
        </div>

        {/* Reviews */}

        <div
          className="
grid
gap-8
md:grid-cols-2
lg:grid-cols-4
"
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
