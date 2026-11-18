import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  XCircle,
  CalendarDays,
  Users,
  BedDouble,
  Mail,
  Phone,
  User,
  Printer,
  Home,
  CreditCard,
  ArrowRight,
  X,
  Smartphone,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { getAdminBooking } from "@/fetures/admin/AdminService/Adminservice";
import { createPayment, verifyPayment } from "../services";
import { toast } from "sonner";
// import { modal } from "node_modules/@base-ui/react/menubar/MenubarDataAttributes.mjs";

/* ---------- helpers ---------- */

const formatINR = (n = 0) => `₹${Number(n).toLocaleString("en-IN")}`;

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

// Dates come back as UTC midnight, so format in UTC to avoid off-by-one days.
const dateParts = (iso) => {
  const d = new Date(iso);
  const fmt = (opts) =>
    new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", ...opts }).format(d);
  return {
    day: fmt({ day: "numeric" }),
    month: fmt({ month: "short", year: "numeric" }),
    weekday: fmt({ weekday: "long" }),
  };
};

const STATUS = {
  confirmed: {
    icon: CheckCircle2,
    title: "Booking confirmed",
    text: "Your reservation is all set. We’ve saved the details below.",
    tone: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    iconTone: "text-emerald-600",
  },
  pending: {
    icon: Clock,
    title: "Payment pending",
    text: "Complete your payment to confirm this reservation.",
    tone: "bg-amber-50 text-amber-800 ring-amber-200",
    iconTone: "text-amber-600",
  },
  cancelled: {
    icon: XCircle,
    title: "Booking cancelled",
    text: "This reservation has been cancelled.",
    tone: "bg-red-50 text-red-800 ring-red-200",
    iconTone: "text-red-600",
  },
};

const getStatusKey = (booking) => {
  if (booking.bookingStatus === "CANCELLED") return "cancelled";
  if (
    booking.bookingStatus === "CONFIRMED" &&
    booking.paymentStatus !== "PENDING"
  )
    return "confirmed";
  return "pending";
};

const PAYMENT_METHODS = [
  {
    id: "razorpay",
    name: "Razorpay",
    hint: "UPI, cards, net banking, wallets",
    icon: Smartphone,
  },
  {
    id: "stripe",
    name: "Stripe",
    hint: "International and card payments",
    icon: CreditCard,
  },
];

/* ---------- small pieces ---------- */

const Pill = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const Row = ({ label, children, bold }) => (
  <div className="flex items-start justify-between gap-6 py-2.5 text-sm">
    <dt className="text-slate-500">{label}</dt>
    <dd
      className={`text-right break-all ${
        bold ? "font-semibold text-slate-900" : "text-slate-800"
      }`}
    >
      {children}
    </dd>
  </div>
);

const Section = ({ title, children }) => (
  <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
    <h2 className="mb-2 text-base font-semibold text-slate-900">{title}</h2>
    {children}
  </section>
);

const Skeleton = () => (
  <div className="mx-auto max-w-3xl animate-pulse space-y-4 p-5">
    <div className="h-8 w-56 rounded bg-slate-200" />
    <div className="h-20 rounded-2xl bg-slate-200" />
    <div className="h-52 rounded-2xl bg-slate-200" />
    <div className="h-40 rounded-2xl bg-slate-200" />
  </div>
);

/* ---------- payment modal (same file) ---------- */

const PaymentModal = ({ open, onClose, amount, loading, onConfirm }) => {
  const [selected, setSelected] = useState("razorpay");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && !loading && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center print:hidden"
      onClick={() => !loading && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pay-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="pay-title" className="text-lg font-semibold text-slate-900">
              Choose how to pay
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              You’ll pay{" "}
              <span className="font-medium text-slate-800">{amount}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div role="radiogroup" className="mt-5 space-y-3">
          {PAYMENT_METHODS.map(({ id, name, hint, icon: Icon }) => {
            const active = selected === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={loading}
                onClick={() => setSelected(id)}
                className={`flex w-full items-center gap-4 rounded-xl p-4 text-left ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                  active
                    ? "bg-teal-50 ring-2 ring-teal-700"
                    : "bg-white ring-slate-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    active
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-900">
                    {name}
                  </span>
                  <span className="block text-xs text-slate-500">{hint}</span>
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    active ? "border-teal-700" : "border-slate-300"
                  }`}
                >
                  {active && (
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-700" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onConfirm(selected)}
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Starting payment…
            </>
          ) : (
            <>Pay {amount}</>
          )}
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5" /> Payments are processed
          securely
        </p>
      </div>
    </div>
  );
};

/* ---------- page ---------- */

const BookingSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payOpen, setPayOpen] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getAdminBooking(id),
    enabled: !!id,
  });

  const { mutateAsync: createPaymentMutation } = useMutation({
    mutationFn: createPayment,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Skeleton />
      </div>
    );
  }

  const booking = data?.data;

  if (isError || !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-5">
        <div className="max-w-sm rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200">
          <h1 className="text-lg font-semibold text-slate-900">
            We couldn’t find this booking
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Check the link and try again, or go back to the home page.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Go to home
          </button>
        </div>
      </div>
    );
  }

  const {
    bookingNumber,
    hotelId,
    customerId,
    checkIn,
    checkOut,
    guests,
    roomsBooked,
    priceDetails: price = {},
    paymentStatus,
    createdAt,
  } = booking;

  const statusKey = getStatusKey(booking);
  const status = STATUS[statusKey];
  const StatusIcon = status.icon;

  const cin = dateParts(checkIn);
  const cout = dateParts(checkOut);

  const bookedOn = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(createdAt));

  const guestText =
    plural(guests?.adults ?? 0, "adult") +
    (guests?.children ? `, ${plural(guests.children, "child")}` : "");

  const openPay = () => setPayOpen(true);

  const handlePay = async (method) => {
    try {
      setPayLoading(true);

      if (method === "razorpay") {
        const paymentData = await createPaymentMutation({
          bookingId: booking._id,
          gateway: "RAZORPAY",
        });

        const options = {
          key: paymentData.key,

          amount: paymentData.amount,

          currency: paymentData.currency,

          order_id: paymentData.orderId,

          name: "Aurelian Hotels",

          description: "Hotel Booking Payment",

          handler: async function (response) {
            console.log(response, "handler");

            await verifyPayment({
              bookingId: booking._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setPayOpen(false);
            setTimeout(() => {
              navigate("/");
            }, 1000);
            toast.success("Amount paid successfully");
          },

          modal: {
            ondismiss: function () {
              setPayLoading(false);
              setPayOpen(false);
              toast.info("Payment Cancelled");
            },
          },
        };
        // };

        const razorpay = new window.Razorpay(options);

        razorpay.open();
      }

      if (method === "stripe") {
        const paymentData = await createPaymentMutation({
          bookingId: booking._id,
          gateway: "STRIPE",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 print:bg-white">
      <div className="mx-auto max-w-3xl space-y-4">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Booking summary
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Booking number{" "}
            <span className="font-medium tabular-nums text-slate-800">
              {bookingNumber}
            </span>
          </p>
        </header>

        {/* Status banner */}
        <div
          role="status"
          className={`flex items-start gap-3 rounded-2xl p-4 ring-1 ${status.tone}`}
        >
          <StatusIcon
            className={`mt-0.5 h-5 w-5 shrink-0 ${status.iconTone}`}
          />
          <div className="flex-1">
            <p className="font-semibold">{status.title}</p>
            <p className="text-sm opacity-90">{status.text}</p>
          </div>
          {statusKey === "pending" && (
            <button
              onClick={openPay}
              className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 sm:inline-flex print:hidden"
            >
              Pay {formatINR(price.totalAmount)}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Stay card */}
        <section className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
          <div className="bg-teal-900 p-6 text-white">
            <p className="text-sm font-medium text-teal-200">{hotelId?.name}</p>

            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-xs text-teal-200">
                  Check-in · {cin.weekday}
                </p>
                <p className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
                  {cin.day}
                </p>
                <p className="mt-1 text-sm font-medium">{cin.month}</p>
              </div>

              <div className="flex flex-col items-center gap-1 text-xs text-teal-200">
                <span className="h-px w-8 bg-teal-300/60 sm:w-16" />
                <span className="whitespace-nowrap">
                  {plural(price.totalNights ?? 1, "night")}
                </span>
                <span className="h-px w-8 bg-teal-300/60 sm:w-16" />
              </div>

              <div className="text-right">
                <p className="text-xs text-teal-200">
                  Check-out · {cout.weekday}
                </p>
                <p className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
                  {cout.day}
                </p>
                <p className="mt-1 text-sm font-medium">{cout.month}</p>
              </div>
            </div>
          </div>

          <dl className="grid grid-cols-2 divide-x divide-slate-200 sm:grid-cols-3">
            <div className="p-4 sm:px-6">
              <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users className="h-3.5 w-3.5" /> Guests
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                {guestText}
              </dd>
            </div>
            <div className="p-4 sm:px-6">
              <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                <BedDouble className="h-3.5 w-3.5" /> Rooms
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                {roomsBooked}
              </dd>
            </div>
            <div className="col-span-2 border-t border-slate-200 p-4 sm:col-span-1 sm:border-t-0 sm:px-6">
              <dt className="flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" /> Booked on
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                {bookedOn}
              </dd>
            </div>
          </dl>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Guest */}
          <Section title="Guest">
            <dl className="divide-y divide-slate-100">
              <div className="flex items-center gap-3 py-2.5 text-sm">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-slate-800">{customerId?.name}</span>
              </div>
              <div className="flex items-center gap-3 py-2.5 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="break-all text-slate-800">
                  {customerId?.email}
                </span>
              </div>
              <div className="flex items-center gap-3 py-2.5 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span
                  className={
                    customerId?.phone ? "text-slate-800" : "text-slate-400"
                  }
                >
                  {customerId?.phone || "Not provided"}
                </span>
              </div>
            </dl>
          </Section>

          {/* Price */}
          <Section title="Price details">
            <dl className="divide-y divide-slate-100">
              <Row
                label={`${formatINR(price.pricePerNight)} × ${plural(
                  price.totalNights ?? 1,
                  "night",
                )}${roomsBooked > 1 ? ` × ${plural(roomsBooked, "room")}` : ""}`}
              >
                {formatINR(price.subtotal)}
              </Row>
              <Row label="Platform fee">
                {price.platformFee ? formatINR(price.platformFee) : "Free"}
              </Row>
              <Row label="Payment">
                <Pill
                  className={
                    paymentStatus === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }
                >
                  {paymentStatus?.charAt(0) +
                    paymentStatus?.slice(1).toLowerCase()}
                </Pill>
              </Row>
            </dl>
            <div className="mt-2 flex items-baseline justify-between border-t border-slate-200 pt-4">
              <span className="font-semibold text-slate-900">Total</span>
              <span className="text-2xl font-bold tabular-nums text-slate-900">
                {formatINR(price.totalAmount)}
              </span>
            </div>
          </Section>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row print:hidden">
          {statusKey === "pending" && (
            <button
              onClick={openPay}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <CreditCard className="h-4 w-4" />
              Pay {formatINR(price.totalAmount)}
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button
            onClick={() => navigate("/")}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
              statusKey === "pending"
                ? "bg-white text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50"
                : "flex-1 bg-teal-700 text-white hover:bg-teal-800"
            }`}
          >
            <Home className="h-4 w-4" />
            Go home
          </button>
        </div>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        amount={formatINR(price.totalAmount)}
        loading={payLoading}
        onConfirm={handlePay}
      />
    </div>
  );
};

export default BookingSummary;
