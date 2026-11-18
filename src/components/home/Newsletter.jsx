import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section
      className="
bg-ink-800
py-20
"
    >
      <div
        className="
mx-auto
max-w-5xl
px-6
"
      >
        <div
          className="
relative
overflow-hidden
rounded-3xl
border
border-ink-600
bg-ink-700
px-6
py-12
text-center
md:px-16
"
        >
          {/* Decoration */}

          <div
            className="
absolute
right-0
top-0
h-40
w-40
rounded-full
bg-brass-500/20
blur-3xl
"
          />

          <div
            className="
relative
z-10
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
              Stay Updated
            </p>

            <h2
              className="
mt-4
text-4xl
font-semibold
text-pearl-50
md:text-5xl
"
            >
              Get Exclusive Hotel Deals
            </h2>

            <p
              className="
mx-auto
mt-4
max-w-xl
text-pearl-300
"
            >
              Subscribe to receive special offers, discounts and travel
              inspiration straight to your inbox.
            </p>

            {/* Form */}

            <form
              className="
mx-auto
mt-8
flex
max-w-xl
flex-col
gap-3
sm:flex-row
"
            >
              <div
                className="
relative
flex-1
"
              >
                <Mail
                  className="
absolute
left-4
top-1/2
-translate-y-1/2
text-pearl-500
"
                  size={18}
                />

                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="
h-12
bg-pearl-50
pl-11
text-ink-800
"
                />
              </div>

              <Button
                className="
h-12
bg-brass-500
text-ink-900
hover:bg-brass-600
"
              >
                Subscribe
                <Send size={16} />
              </Button>
            </form>

            <p
              className="
mt-5
text-xs
text-pearl-400
"
            >
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
