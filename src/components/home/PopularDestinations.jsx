import { destinations } from "@/lib/constants";
import DestinationCard from "../common/DestinationCard";

export default function PopularDestinations() {
  return (
    <section
      className="
py-20
bg-background
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
"
      >
        {/* Header */}

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
            Explore Places
          </p>

          <h2
            className="
mt-3
text-4xl
font-semibold
"
          >
            Popular Destinations
          </h2>

          <p
            className="
mx-auto
mt-4
max-w-xl
text-muted-foreground
"
          >
            Discover amazing hotels and resorts around the world.
          </p>
        </div>

        {/* Grid */}

        <div
          className="
grid
gap-8
sm:grid-cols-2
lg:grid-cols-3
"
        >
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
