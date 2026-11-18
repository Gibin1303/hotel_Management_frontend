import {
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  Headphones,
  Zap,
  Star,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: BadgeCheck,
    title: "Verified Hotels",
    description:
      "Every property is carefully verified to provide you a safe and comfortable stay.",
  },

  {
    id: 2,
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description:
      "Your personal information and payments are protected with advanced security.",
  },

  {
    id: 3,
    icon: CreditCard,
    title: "Best Price Guarantee",
    description:
      "Get the best available prices with exclusive hotel deals and offers.",
  },

  {
    id: 4,
    icon: Zap,
    title: "Instant Booking",
    description: "Book your favorite hotel instantly with quick confirmation.",
  },

  {
    id: 5,
    icon: Headphones,
    title: "24/7 Support",
    description: "Our support team is always available whenever you need help.",
  },

  {
    id: 6,
    icon: Star,
    title: "Premium Experience",
    description:
      "Enjoy hand-picked hotels and unforgettable travel experiences.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="
bg-ink-800
py-20
text-pearl-50
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
mx-auto
mb-14
max-w-2xl
text-center
"
        >
          <p
            className="
text-sm
uppercase
tracking-widest
text-brass-300
"
          >
            Why Choose Us
          </p>

          <h2
            className="
mt-3
text-4xl
font-semibold
text-pearl-50
md:text-5xl
"
          >
            A Better Way To Stay
          </h2>

          <p
            className="
mt-5
text-pearl-300
"
          >
            From booking to checkout, we make every step simple, secure and
            memorable.
          </p>
        </div>

        {/* Cards */}

        <div
          className="
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
"
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="
rounded-2xl
border
border-ink-600
bg-ink-700
p-7
transition
hover:-translate-y-1
hover:shadow-lift
"
            >
              <div
                className="
mb-5
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-brass-500
text-ink-900
"
              >
                <feature.icon size={24} />
              </div>

              <h3
                className="
text-xl
font-semibold
text-pearl-50
"
              >
                {feature.title}
              </h3>

              <p
                className="
mt-3
text-sm
leading-6
text-pearl-300
"
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
