

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input.jsx";
import { Button } from "@/components/ui/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { registerSchema } from "../schema/registerSchema";
import { registerApi } from "../services/authApi";

const BENEFITS = [
  { title: "Member rates", text: "Save up to 15% on every direct booking." },
  { title: "Free room upgrade", text: "Subject to availability at check-in." },
  {
    title: "Faster bookings",
    text: "Saved details and your full stay history.",
  },
];

const inputClass =
  "h-11 border-[#dcded7] bg-white text-[#0f2a2e] placeholder:text-[#8f938a] focus-visible:border-[#c8a86b] focus-visible:ring-[#c8a86b]/30";

const labelClass = "text-sm font-medium text-[#33352f]";

function PasswordToggle({ shown, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#6b6f67] hover:text-[#0f2a2e]"
    >
      {shown ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const roles = ["ADMIN", "CUSTOMER", "OWNER"];
  const [ADMIN, CUSTOMER, OWNER] = roles;

const isOwner = location.state?.role === "OWNER";
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });



  const { isSubmitting } = form.formState;

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        ...(isOwner && { role: "OWNER" }),
      };

      console.log(payload, "regiter api payload");

      await registerApi(payload);

      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="grid h-auto bg-[#f6f6f3] lg:grid-cols-[4fr_6fr]">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#0f2a2e] p-12 text-[#ecede8] lg:flex">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#c8a86b]/20" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#c8a86b]/30" />

        <Link to="/" className="font-serif text-2xl font-semibold text-white">
          Aurelian Hotels
        </Link>

        <div className="relative max-w-md">
          <h1 className="font-serif text-5xl leading-tight text-white">
            Your room is better when we know you.
          </h1>
          <div className="my-8 h-px w-16 bg-[#c8a86b]" />
          <ul className="space-y-5">
            {BENEFITS.map((b) => (
              <li key={b.title}>
                <p className="font-semibold text-[#dbc17e]">{b.title}</p>
                <p className="text-sm text-[#b9bcb2]">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-[#b9bcb2]">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-[#dbc17e] underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </aside>

      {/* Form panel */}
      <section className="flex flex-col items-center justify-center px-5 py-12 sm:px-10">
        <Link
          to="/"
          className="mb-8 font-serif text-2xl font-semibold text-[#0f2a2e] lg:hidden"
        >
          Aurelian Hotels
        </Link>

        <Card className="w-full max-w-md rounded-2xl border border-[#dcded7] bg-white shadow-xl shadow-[#0f2a2e]/10">
          <CardHeader>
            <CardTitle className="font-serif text-3xl font-semibold text-[#0f2a2e]">
              Create your account
            </CardTitle>
            <CardDescription className="text-[#6b6f67]">
              Join to book direct and unlock member rates.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          autoComplete="name"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@gmail.com"
                          autoComplete="email"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="At least 8 characters"
                            autoComplete="new-password"
                            className={`${inputClass} pr-11`}
                            {...field}
                          />
                          <PasswordToggle
                            shown={showPassword}
                            onToggle={() => setShowPassword((s) => !s)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        Confirm password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            className={`${inputClass} pr-11`}
                            {...field}
                          />
                          <PasswordToggle
                            shown={showConfirm}
                            onToggle={() => setShowConfirm((s) => !s)}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full bg-gradient-to-br from-[#dbc17e] via-[#c8a86b] to-[#a98a4e] font-semibold text-[#091c1f] shadow-lg shadow-[#c8a86b]/40 hover:brightness-105 disabled:opacity-60"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>

                <p className="text-center text-sm text-[#6b6f67] lg:hidden">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="text-[#0f2a2e] underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
