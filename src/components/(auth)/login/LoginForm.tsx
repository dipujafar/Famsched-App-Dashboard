"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { LoginFormValues, loginSchema } from "./Schema";
import LogoSection from "../LogoSection";
import { useLoginMutation } from "@/redux/api/authApi";
import { Error_Modal } from "@/utils/modals";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });




  // form submitting for login 
  const onSubmit = async (values: LoginFormValues) => {
    try {
      const formattedValues: Record<string, string> = {
        email: values.email as string,
        password: values.password as string,
        fcmToken: "asfdasfsdafsd"
      };
      const res = await login(formattedValues).unwrap();
      // @ts-ignore
      if (jwtDecode(res?.data?.accessToken)?.role !== "admin") {
        Error_Modal({ title: "You are not valid admin" });
        return;
      }
      // if(jwtDecode(res?.data?.accessToken)?.rp)



      dispatch(
        setUser({
          user: jwtDecode(res?.data?.accessToken),
          token: res?.data?.accessToken,
        })
      );
      toast.success("Login Success", { duration: 1000 });
      route.push("/dashboard");
    }
    catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.errorSources?.[0]?.message || error?.data?.message });
    }
  };





  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Side - Purple Gradient with Logo */}
      <div className="flex-1 ">
        <LogoSection />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center px-12">
        {/* Login Form */}
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Log In</h2>
            <p className="text-gray-600">
              Access the Taste Point using your email and password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email/Phone Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Enter your email or phone number"
                          className="pl-10 h-12 border-gray-300 focus:border-main-color focus:ring-main-color"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10 h-12 border-gray-300 focus:border-main-color focus:ring-main-color"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="text-left">
                <Link
                  href="/forget-password"
                  className="text-sm text-main-color hover:text-red-700"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                style={{ background: "linear-gradient(90deg, #3C353B 0%, #785E57 100%)" }}
                className="w-full h-12 bg-main-color hover:bg-red-600 text-white font-medium text-base"
                disabled={isLoading}
              >
                Log In {isLoading && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
