import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CalendarCheck, LogOut, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown menu.jsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { useAuth } from "@/fetures/auth/hooks/useAuth";
import HotelForm from "../ownerManage/ownerfeatures/HotelForm";
import Modal from "../../components/common/Modal";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/hotels", label: "Hotels" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const OwnerLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/allhotels", label: "MY Hotels" },
  { to: "/reports", label: "Reports" },
  { to: "/users", label: "All Users" },
  { to: "/profile", label: "Profile" },
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("") || "U";

const desktopLink = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-[#dbc17e] ${
    isActive ? "text-[#dbc17e]" : "text-[#ecede8]"
  }`;

const mobileLink = ({ isActive }) =>
  `block rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-white/5 ${
    isActive ? "text-[#dbc17e]" : "text-[#ecede8]"
  }`;

/**
 * Props:
 *  user:     { name, email } or null when logged out
 *  onLogout: function called when the user clicks Logout
 *
 * */

export default function Navbar({ user = null, onLogout }) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const close = () => setOpen(false);

  const navigate = useNavigate();

  const handleChange = () => {
    setOpen(true);
  };

  // const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f2a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f2a2e]/85">
      <nav
        aria-label="Main"
        className="mx-auto flex  h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl font-semibold text-white">
          Aurelian<span className="text-[#c8a86b]"> Hotels</span>
        </Link>

        {/* Desktop links */}
        {/* <ul className="hidden items-center gap-8 md:flex">
          {(user?.role === "CUSTOMER" || "OWNER" ? LINKS : OwnerLinks).map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={desktopLink}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul> */}

        <ul className="hidden items-center gap-8 md:flex ">
          {user?.role != "ADMIN" &&
            (["CUSTOMER", "OWNER"].includes(user?.role)
              ? LINKS
              : OwnerLinks
            ).map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={desktopLink}>
                  {l.label}
                </NavLink>
              </li>
            ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
       
          {( user?.role === "CUSTOMER") ? (
            <Button className="w-56 bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f]">
              <Link to="/register" state={{ role: "OWNER" }}>
                Become Owner..?
              </Link>
            </Button>
          ) : user?.role === "OWNER" ?
         (
            <button
              className="w-56 rounded-md bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] px-4 py-2 font-semibold text-[#091c1f]"
              onClick={() => setModal(true)}
            >
              Create Hotel
            </button>
          ):null}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open account menu"
                  className="rounded-full outline-none ring-[#c8a86b] focus-visible:ring-2"
                >
                  <Avatar className="h-9 w-9 border border-[#c8a86b]/50">
                    <AvatarFallback className="bg-[#16323a] text-sm font-semibold text-[#dbc17e]">
                      {getInitials(user?.name || "A")}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{user.name}</p>
                  {user.email && (
                    <p className="text-xs font-normal text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/my-bookings">
                    <CalendarCheck size={16} /> My bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-destructive"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-[#ecede8] hover:bg-white/10 hover:text-white"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f] hover:brightness-105"
              >
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 border-l border-white/10 bg-[#0f2a2e] p-0 text-[#ecede8] [&>button]:text-white"
          >
            <SheetHeader className="border-b border-white/10 p-5 text-left">
              <SheetTitle className="font-serif text-xl text-white">
                Aurelian<span className="text-[#c8a86b]"> Hotels</span>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation
              </SheetDescription>
            </SheetHeader>

            <ul className="space-y-1 p-3">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    onClick={close}
                    className={mobileLink}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-2 space-y-3 border-t border-white/10 p-5">
              {user ? (
                <>
                  <p className="text-sm text-[#b9bcb2]">
                    Signed in as{" "}
                    <span className="font-semibold text-white">
                      {user.name}
                    </span>
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={close}
                  >
                    <Link to="/my-bookings">My bookings</Link>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f]"
                    onClick={() => {
                      close();
                      onLogout?.();
                      navigate("/login")
                    }}
                  >
                    Logout
                  </Button>

                 

                  {user?.role === "CUSTOMER" ? (
                    <Button className="w-56 bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f]">
                      <Link to="/register" state={{ role: "OWNER" }}>
                        Become Owner..?
                      </Link>
                    </Button>
                  ) : (
                    <button
                      className="w-56 rounded-md bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] px-4 py-2 font-semibold text-[#091c1f]"
                      onClick={() => setModal(true)}
                    >
                      Create Hotel
                    </button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    onClick={close}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f]"
                    onClick={close}
                  >
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
          {user?.role === "ADMIN" && (
            <Button className="w-56 bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f]">
              <Link to="/register" state={{ role: "ADMIN" }}>
                Admin Login
              </Link>
            </Button>
          )}
        </Sheet>
      </nav>

      <Modal open={modal} onOpenChange={setModal}>
        <HotelForm
          // onSubmit={(data) => {
          //   console.log(data);
          //   setModal(false);
          // }}
          onSuccess={() => setModal(false)}
        />
      </Modal>
    </header>
  );
}
