import {
  MapPin,
  Mail,
  Phone,
  //   Facebook ,
  //   Instagram,
  //   Twitter,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Contact"],

  Explore: ["Hotels", "Destinations", "Deals & Offers", "Travel Guides"],

  Support: ["Help Center", "FAQs", "Privacy Policy", "Terms & Conditions"],

  Partners: ["List Your Hotel", "Owner Dashboard", "Partner Support"],
};

export default function Footer() {
  return (
    <footer
      className="
bg-ink-900
text-pearl-200
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
py-16
"
      >
        <div
          className="
grid
gap-10
md:grid-cols-2
lg:grid-cols-5
"
        >
          {/* Brand */}

          <div
            className="
lg:col-span-2
"
          >
            <h2
              className="
font-display
text-4xl
text-pearl-50
"
            >
              StayNest
            </h2>

            <p
              className="
mt-4
max-w-sm
leading-7
text-pearl-300
"
            >
              Discover premium hotels, resorts and unique stays across India
              with easy and secure booking.
            </p>

            <div
              className="
mt-6
space-y-3
text-sm
"
            >
              <div
                className="
flex
items-center
gap-3
"
              >
                <MapPin size={18} className="text-brass-400" />
                India
              </div>

              <div
                className="
flex
items-center
gap-3
"
              >
                <Mail size={18} className="text-brass-400" />
                support@staynest.com
              </div>

              <div
                className="
flex
items-center
gap-3
"
              >
                <Phone size={18} className="text-brass-400" />
                +91 98765 43210
              </div>
            </div>
          </div>

          {/* Links */}

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3
                className="
mb-5
font-semibold
text-pearl-50
"
              >
                {title}
              </h3>

              <ul
                className="
space-y-3
text-sm
"
              >
                {links.map((link) => (
                  <li
                    key={link}
                    className="
cursor-pointer
transition
hover:text-brass-300
"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}

        <div
          className="
mt-14
flex
flex-col
items-center
justify-between
gap-5
border-t
border-ink-700
pt-8
md:flex-row
"
        >
          <p
            className="
text-sm
text-pearl-400
"
          >
            © 2026 StayNest. All rights reserved.
          </p>

          <div
            className="
flex
gap-4
"
          >
            <a
              className="
rounded-full
border
border-ink-600
p-2
transition
hover:text-brass-300
"
            >
              <FaInstagram size={18} />
            </a>

            <a
              className="
rounded-full
border
border-ink-600
p-2
transition
hover:text-brass-300
"
            >
              <FaFacebook size={18} />
            </a>

            <a
              className="
rounded-full
border
border-ink-600
p-2
transition
hover:text-brass-300
"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
