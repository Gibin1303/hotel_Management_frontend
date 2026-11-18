import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Hotel,
  BedDouble,
  CalendarCheck,
  Settings,
  LogOut,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/fetures/auth/hooks/useAuth";
import { useState } from "react";

const OwnerSidebar = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Hotels",
      path: "/allhotels",
      icon: Hotel,
    },
    // {
    //   name: "Rooms",
    //   path: "/rooms/add",
    //   icon: BedDouble,
    // },
    {
      name: "Bookings",
      path: "/bookings",
      icon: CalendarCheck,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const navClass = ({ isActive }) =>
    `
    group flex items-center gap-3 px-4 py-3 rounded-xl
    transition-all duration-300
    ${
      isActive
        ? "bg-[#c8a86b] text-[#0f2a2e] shadow-lg"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }
    `;

  return (
    <aside
      className="
      w-72 min-h-screen
      bg-[#0f2a2e]
      text-white
      flex flex-col
      gap-4
      px-5 py-6
      border-r border-white/10
fixed     
 left-0
      top-16
    "
    >
      {/* Logo */}
      <div className="mb-10">
        <h1
          className="
          text-2xl 
          font-bold 
          tracking-wide
          text-[#c8a86b]
        "
        >
          Aurelian
        </h1>

        <p className="text-sm text-gray-400">Owner Dashboard</p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.name} to={item.path} className={navClass}>
              <Icon
                size={20}
                className="
                group-hover:scale-110
                transition
                "
              />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}

      <div
        className="
        border-t 
        border-white/10
        pt-5
      "
      >
        <div
          className="
          flex 
          items-center 
          gap-3
          mb-4
        "
          onClick={() => setOpen(!open)}
        >
          <div
            className="
            w-10 h-10 
            rounded-full
            bg-[#c8a86b]
            flex
            items-center
            justify-center
            text-[#0f2a2e]
          "
          >
            <UserRound size={20} />
          </div>

          <div>
            <p className="font-semibold">{user.name}</p>

            <p className="text-xs text-gray-400">Premium Member</p>
          </div>
        </div>
        {open && (
          <button
            className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          text-red-400
          hover:bg-red-500/10
          transition
          absolute
          top-30
          "
          >
            <LogOut size={20} />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default OwnerSidebar;
