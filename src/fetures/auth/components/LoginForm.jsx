// import { Link, useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";

// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Input } from "@/components/ui/Input";

// import { Button } from "@/components/ui/Button";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// import { loginSchema } from "../schema/loginSchema";

// import { loginApi } from "../services/authApi";

// import { toast } from "sonner";

// export default function LoginForm() {
//   const navigate = useNavigate();

//   const form = useForm({
//     resolver: zodResolver(loginSchema),

//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       await loginApi(data);

//       toast.success("Login successful");

//       navigate("/");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center p-10 w-full h-">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-3xl">Login</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>

//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="email@gmail.com"
//                         {...field}
//                       />
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>

//                     <FormControl>
//                       <Input
//                         type="password"
//                         placeholder="********"
//                         {...field}
//                       />
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button className="w-full">Login</Button>

//               <p className="text-center text-sm">
//                 Don't have account?
//                 <Link to="/register" className="text-blue-600 ml-2">
//                   Register
//                 </Link>
//               </p>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { loginSchema } from "../schema/loginSchema";
import { loginApi } from "../services/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";

const HIGHLIGHTS = [
  {
    title: "Your upcoming stays",
    text: "View, change or cancel bookings in one place.",
  },
  {
    title: "Member rates",
    text: "Direct booking prices, always the lowest we offer.",
  },
  {
    title: "Saved preferences",
    text: "Room type, pillow and floor remembered for next time.",
  },
];

const inputClass =
  "h-11 border-[#dcded7] bg-white text-[#0f2a2e] placeholder:text-[#8f938a] focus-visible:border-[#c8a86b] focus-visible:ring-[#c8a86b]/30";

const labelClass = "text-sm font-medium text-[#33352f]";

export default function LoginForm() {
  // const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  // const form = useForm({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // const { isSubmitting } = form.formState;

  // const onSubmit = async (data) => {
  //   try {
  //     await loginApi(data);

  //     toast.success("Login successful");

  //     navigate("/");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Login failed");
  //   }
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values) => {
    try {
      const { data } = await loginApi(values);

      // data.data is { user, token } from your backend
      dispatch(loginSuccess(data));

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="grid min-h-screen bg-[#f6f6f3] lg:grid-cols-[5fr_6fr]">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#0f2a2e] p-12 text-[#ecede8] lg:flex">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#c8a86b]/20" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#c8a86b]/30" />

        <Link to="/" className="font-serif text-2xl font-semibold text-white">
          Aurelian Hotels
        </Link>

        <div className="relative max-w-md">
          <h1 className="font-serif text-5xl leading-tight text-white">
            Welcome back. Your room is waiting.
          </h1>
          <div className="my-8 h-px w-16 bg-[#c8a86b]" />
          <ul className="space-y-5">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title}>
                <p className="font-semibold text-[#dbc17e]">{h.title}</p>
                <p className="text-sm text-[#b9bcb2]">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-[#b9bcb2]">
          New here?{" "}
          <Link
            to="/register"
            className="text-[#dbc17e] underline underline-offset-4"
          >
            Create an account
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
              Sign in
            </CardTitle>
            <CardDescription className="text-[#6b6f67]">
              Access your bookings and member rates.
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@gmail.com"
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
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className={`${inputClass} pr-11`}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#6b6f67] hover:text-[#0f2a2e]"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
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
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <p className="text-center text-sm text-[#6b6f67] lg:hidden">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#0f2a2e] underline underline-offset-4"
                  >
                    Register
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
