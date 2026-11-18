// import { useMemo, useState } from "react";
// import { Heart, Star, Hotel } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getAllHotels } from "../../auth/services/hotelApi";
// import { useQuery } from "@tanstack/react-query";

// const HOTELS = [
//   {
//     n: "Harbor Light Inn",
//     c: "Lisbon",
//     p: 92,
//     r: 4.4,
//     a: ["Wi-Fi", "Breakfast", "Harbor view"],
//     g: ["#2f6bff", "#6bd0ff"],
//   },
//   {
//     n: "Casa Alfama",
//     c: "Lisbon",
//     p: 135,
//     r: 4.7,
//     a: ["Rooftop bar", "Wi-Fi", "Pet friendly"],
//     g: ["#ff7a45", "#ffc46b"],
//   },
//   {
//     n: "The Linden House",
//     c: "Berlin",
//     p: 118,
//     r: 4.5,
//     a: ["Gym", "Wi-Fi", "Breakfast"],
//     g: ["#1c8f6b", "#8fe3b5"],
//   },
//   {
//     n: "Spree Studio Hotel",
//     c: "Berlin",
//     p: 76,
//     r: 4.1,
//     a: ["Wi-Fi", "Kitchenette"],
//     g: ["#7a4dff", "#c6a8ff"],
//   },
//   {
//     n: "Grand Meridian",
//     c: "Tokyo",
//     p: 280,
//     r: 4.8,
//     a: ["Pool", "Spa", "Gym", "Wi-Fi"],
//     g: ["#e0345a", "#ff9fb2"],
//   },
//   {
//     n: "Kuro Capsule Stay",
//     c: "Tokyo",
//     p: 45,
//     r: 4.0,
//     a: ["Wi-Fi", "Shared lounge"],
//     g: ["#2b3a4a", "#6c8197"],
//   },
//   {
//     n: "Sakura Garden Ryokan",
//     c: "Kyoto",
//     p: 195,
//     r: 4.9,
//     a: ["Onsen", "Breakfast", "Garden"],
//     g: ["#d9578a", "#ffc2d6"],
//   },
//   {
//     n: "Lakeview Lodge",
//     c: "Zurich",
//     p: 240,
//     r: 4.6,
//     a: ["Lake view", "Spa", "Wi-Fi"],
//     g: ["#0f7fa8", "#7fd6e8"],
//   },
//   {
//     n: "Alpenrose Hotel",
//     c: "Zurich",
//     p: 88,
//     r: 4.2,
//     a: ["Wi-Fi", "Bike rental"],
//     g: ["#3f8f3a", "#b5e27a"],
//   },
//   {
//     n: "Palm Court Resort",
//     c: "Miami",
//     p: 310,
//     r: 4.5,
//     a: ["Pool", "Beach access", "Spa"],
//     g: ["#ff8a3d", "#ffd36b"],
//   },
//   {
//     n: "Ocean Drive Suites",
//     c: "Miami",
//     p: 165,
//     r: 4.3,
//     a: ["Pool", "Wi-Fi", "Kitchenette"],
//     g: ["#0aa5a5", "#8ff0d9"],
//   },
// ];

// const AMENITIES = ["Wi-Fi", "Pool", "Spa", "Breakfast", "Gym", "Pet friendly"];
// const CITIES = [...new Set(HOTELS.map((h) => h.c))].sort();

// const SORTS = {
//   rating: (a, b) => b.r - a.r,
//   priceAsc: (a, b) => a.p - b.p,
//   priceDesc: (a, b) => b.p - a.p,
//   name: (a, b) => a.n.localeCompare(b.n),
// };

// // Radix Select doesn't allow an empty-string value, so "all" stands for "no filter".
// function Field({ label, id, value, onChange, options }) {
//   return (
//     <div className="space-y-1.5">
//       <Label htmlFor={id} className="text-xs text-muted-foreground">
//         {label}
//       </Label>
//       <Select value={value} onValueChange={onChange}>
//         <SelectTrigger id={id} className="w-full">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent>
//           {options.map(([v, text]) => (
//             <SelectItem key={v} value={v}>
//               {text}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// }

// function HotelCard({ hotel, saved, onToggle }) {
//   return (
//     <Card className="overflow-hidden py-0 gap-0">
//       <div
//         className="relative h-36"
//         style={{
//           background: `linear-gradient(135deg, ${hotel.g[0]}, ${hotel.g[1]})`,
//         }}
//       >
//         <Button
//           size="icon"
//           variant={saved ? "destructive" : "secondary"}
//           className="absolute left-2.5 top-2.5 size-9 rounded-full"
//           aria-pressed={saved}
//           aria-label={`Save ${hotel.n}`}
//           onClick={() => onToggle(hotel.n)}
//         >
//           <Heart className={saved ? "fill-current" : ""} />
//         </Button>
//       </div>

//       <CardContent className="space-y-2 p-4">
//         <div className="flex items-baseline justify-between gap-2">
//           <h2 className="font-semibold leading-tight">{hotel.n}</h2>
//           <span className="flex items-center gap-1 text-sm font-semibold">
//             <Star className="size-3.5 fill-amber-400 text-amber-400" />
//             {hotel.r.toFixed(1)}
//           </span>
//         </div>
//         <p className="text-sm text-muted-foreground">{hotel.c}</p>
//         <div className="flex flex-wrap gap-1.5">
//           {hotel.a.map((x) => (
//             <Badge key={x} variant="secondary" className="font-normal">
//               {x}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>

//       <CardFooter className="items-center justify-between px-4 pb-4">
//         <div>
//           <span className="text-xl font-bold">${hotel.p}</span>{" "}
//           <span className="text-sm text-muted-foreground">/ night</span>
//         </div>
//         <Button size="sm">View deal</Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export default function HotelsPage() {
//   const [query, setQuery] = useState("");
//   const [city, setCity] = useState("all");
//   const [max, setMax] = useState("any");
//   const [sort, setSort] = useState("rating");
//   const [active, setActive] = useState([]);
//   const [saved, setSaved] = useState([]);

//   const {
//   data: hotels = [],
//   isLoading,
//   error,
// } = useQuery({
//   queryKey: ["hotels"],

//   queryFn: () => getAllHotels(),
// });
// console.log(hotels, "from react query");

//   const toggle = (list, setList, value) =>
//     setList(
//       list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
//     );

//   const results = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     const limit = max === "any" ? Infinity : Number(max);
//     return HOTELS.filter(
//       (h) =>
//         (city === "all" || h.c === city) &&
//         h.p <= limit &&
//         active.every((a) => h.a.includes(a)) &&
//         (!q || `${h.n} ${h.c} ${h.a.join(" ")}`.toLowerCase().includes(q)),
//     ).sort(SORTS[sort]);
//   }, [query, city, max, sort, active]);

//   return (
//     <div className="min-h-screen bg-muted/40 text-foreground">
//       {/* <header className="sticky top-0 z-10 bg-slate-950 text-white">
//         <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
//           <div className="mr-auto flex items-center gap-2 text-xl font-extrabold tracking-tight">
//             <Hotel className="size-5 text-amber-400" /> Stayly
//           </div>
//           <nav className="hidden gap-5 text-sm text-white/80 sm:flex">
//             <a href="#stays" className="hover:text-white">Stays</a>
//             <a href="#stays" className="hover:text-white">Deals</a>
//           </nav>
//           <Badge variant="secondary" className="bg-white/15 text-white" aria-live="polite">
//             {saved.length} saved
//           </Badge>
//         </div>
//       </header> */}

//       <section className="bg-slate-950 px-5 pb-24 pt-14 text-white">
//         <div className="mx-auto max-w-6xl">
//           <h1 className="mb-4 max-w-[14ch] text-5xl font-extrabold leading-none tracking-tighter sm:text-7xl">
//             Find a stay you’ll remember.
//           </h1>
//           <p className="max-w-[46ch] text-white/75">
//             Compare hotels across cities by price, rating and amenities, then
//             save your favorites.
//           </p>
//         </div>
//       </section>

//       <section className="relative z-[5] mx-auto -mt-10 max-w-6xl px-5">
//         <Card className="p-3.5 shadow-xl">
//           <div className="grid grid-cols-2 gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
//             <div className="col-span-2 space-y-1.5 md:col-span-1">
//               <Label htmlFor="q" className="text-xs text-muted-foreground">
//                 Search
//               </Label>
//               <Input
//                 id="q"
//                 type="search"
//                 placeholder="Hotel, city or amenity"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//             </div>
//             <Field
//               label="City"
//               id="city"
//               value={city}
//               onChange={setCity}
//               options={[["all", "All cities"], ...CITIES.map((c) => [c, c])]}
//             />
//             <Field
//               label="Max price"
//               id="max"
//               value={max}
//               onChange={setMax}
//               options={[
//                 ["any", "Any"],
//                 ["100", "$100"],
//                 ["200", "$200"],
//                 ["300", "$300"],
//               ]}
//             />
//             <Field
//               label="Sort by"
//               id="sort"
//               value={sort}
//               onChange={setSort}
//               options={[
//                 ["rating", "Top rated"],
//                 ["priceAsc", "Price: low to high"],
//                 ["priceDesc", "Price: high to low"],
//                 ["name", "Name"],
//               ]}
//             />
//           </div>
//         </Card>
//       </section>

//       <main id="stays" className="mx-auto max-w-6xl px-5 pb-16 pt-7">
//         <div
//           className="flex gap-2 overflow-x-auto pb-1"
//           role="group"
//           aria-label="Amenity filters"
//         >
//           {AMENITIES.map((a) => (
//             <Button
//               key={a}
//               size="sm"
//               variant={active.includes(a) ? "default" : "outline"}
//               className="rounded-full"
//               aria-pressed={active.includes(a)}
//               onClick={() => toggle(active, setActive, a)}
//             >
//               {a}
//             </Button>
//           ))}
//         </div>

//         <p className="mb-3.5 mt-5 text-lg font-bold" aria-live="polite">
//           {results.length} {results.length === 1 ? "stay" : "stays"}
//           {city !== "all" ? ` in ${city}` : " available"}
//         </p>

//         {results.length ? (
//           <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
//             {results.map((h) => (
//               <li key={h.n}>
//                 <HotelCard
//                   hotel={h}
//                   saved={saved.includes(h.n)}
//                   onToggle={(n) => toggle(saved, setSaved, n)}
//                 />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="py-10 text-muted-foreground">
//             No stays match. Remove a filter or raise the price limit.
//           </p>
//         )}
//       </main>

//       <footer className="border-t py-7 text-center text-sm text-muted-foreground">
//         Sample listings for demonstration. © 2026 Stayly
//       </footer>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, Star, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllHotels } from "../../auth/services/hotelApi";
import { useNavigate } from "react-router-dom";

const SORTS = {
  rating: (a, b) => b.rating - a.rating,
  reviews: (a, b) => b.totalReviews - a.totalReviews,
  name: (a, b) => a.name.localeCompare(b.name),
};

// Images may be plain URL strings or objects like { url } — handle both.
const imageUrl = (img) =>
  !img
    ? null
    : typeof img === "string"
      ? img
      : (img.url ?? img.secure_url ?? img.src ?? null);

// Radix Select doesn't allow an empty-string value, so use real strings for every option.
function Field({ label, id, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([v, text]) => (
            <SelectItem key={v} value={v}>
              {text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function HotelCard({ hotel, saved, onToggle, onClick }) {
  const cover = imageUrl(hotel.images?.[0]);
  const amenities = hotel.amenities ?? [];

  return (
    <Card className="overflow-hidden py-0 gap-0 h-full">
      <div className="relative h-40 bg-gradient-to-br from-slate-700 to-slate-500" onClick={onClick}>
        {cover ? (
          <img
            src={cover}
            alt={hotel.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/60">
            <Hotel className="size-10" />
          </div>
        )}
        {hotel.images?.length > 1 && (
          <Badge className="absolute bottom-2.5 right-2.5 bg-black/60 text-white">
            {hotel.images.length} photos
          </Badge>
        )}
        <Button
          size="icon"
          variant={saved ? "destructive" : "secondary"}
          className="absolute left-2.5 top-2.5 size-9 rounded-full"
          aria-pressed={saved}
          aria-label={`Save ${hotel.name}`}
          onClick={() => onToggle(hotel._id)}
        >
          <Heart className={saved ? "fill-current" : ""} />
        </Button>
      </div>

      <CardContent className="space-y-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-semibold leading-tight">{hotel.name}</h2>
          <span className="flex items-center gap-1 text-sm font-semibold">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {Number(hotel.rating ?? 0).toFixed(1)}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {hotel.description}
        </p>

        {amenities.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {amenities.map((x) => (
              <Badge key={x} variant="secondary" className="font-normal">
                {x}
              </Badge>
            ))}
          </div>
        ) : (
          <h1 className="text-red-500 font-extrabold">NO Amenties added</h1>
        )}
      </CardContent>

      <CardFooter className="mt-auto items-center justify-between px-4 pb-4">
        <span className="text-sm text-muted-foreground">
          {hotel.totalReviews ?? 0}{" "}
          {hotel.totalReviews === 1 ? "review" : "reviews"}
        </span>
        <Button size="sm">View details</Button>
      </CardFooter>
    </Card>
  );
}

export default function HotelsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rating");
  const [active, setActive] = useState([]);
  const [saved, setSaved] = useState([]);

  const navigate = useNavigate();

  const {
    data: hotels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getAllHotels(),
  });

  const toggle = (list, setList, value) =>
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  // Amenity chips are built from whatever amenities exist in the data.
  const amenityOptions = useMemo(
    () => [...new Set(hotels.flatMap((h) => h.amenities ?? []))].sort(),
    [hotels],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hotels
      .filter(
        (h) =>
          active.every((a) => (h.amenities ?? []).includes(a)) &&
          (!q ||
            `${h.name} ${h.description} ${(h.amenities ?? []).join(" ")}`
              .toLowerCase()
              .includes(q)),
      )
      .sort(SORTS[sort]);
  }, [hotels, query, sort, active]);

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <section className="bg-slate-950 px-5 pb-24 pt-14 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 max-w-[14ch] text-5xl font-extrabold leading-none tracking-tighter sm:text-7xl">
            Find a stay you’ll remember.
          </h1>
          <p className="max-w-[46ch] text-white/75">
            Browse our hotels, compare ratings and amenities, then save your
            favorites.
          </p>
        </div>
      </section>

      <section className="relative z-[5] mx-auto -mt-10 max-w-6xl px-5">
        <Card className="p-3.5 shadow-xl">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr]">
            <div className="space-y-1.5">
              <Label htmlFor="q" className="text-xs text-muted-foreground">
                Search
              </Label>
              <Input
                id="q"
                type="search"
                placeholder="Hotel name, description or amenity"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Field
              label="Sort by"
              id="sort"
              value={sort}
              onChange={setSort}
              options={[
                ["rating", "Top rated"],
                ["reviews", "Most reviewed"],
                ["name", "Name"],
              ]}
            />
          </div>
        </Card>
      </section>

      <main id="stays" className="mx-auto max-w-6xl px-5 pb-16 pt-7">
        {amenityOptions.length > 0 && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Amenity filters"
          >
            {amenityOptions.map((a) => (
              <Button
                key={a}
                size="sm"
                variant={active.includes(a) ? "default" : "outline"}
                className="rounded-full"
                aria-pressed={active.includes(a)}
                onClick={() => toggle(active, setActive, a)}
              >
                {a}
              </Button>
            ))}
          </div>
        )}

        {isLoading ? (
          <p className="py-10 text-muted-foreground">Loading hotels…</p>
        ) : error ? (
          <p className="py-10 text-destructive">
            Couldn’t load hotels. {error.message}
          </p>
        ) : (
          <>
            <p className="mb-3.5 mt-5 text-lg font-bold" aria-live="polite">
              {results.length} {results.length === 1 ? "hotel" : "hotels"}
            </p>

            {results.length ? (
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
                {results.map((h) => (
                  <li key={h._id}>
                    <HotelCard
                      hotel={h}
                      saved={saved.includes(h._id)}
                      onToggle={(id) => toggle(saved, setSaved, id)}
                      onClick={() => navigate(`/hoteldetail/${h._id}`)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-10 text-muted-foreground">
                No hotels match your search.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
