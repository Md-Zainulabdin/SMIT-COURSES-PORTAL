"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2, "Email is required!").max(50),
  password: z
    .string()
    .min(8, "Your password must contain at least 8 characters")
    .max(50),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  role: "admin" | "user";
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data?.email,
        password: data.password,
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="form-area">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {role === "user" && (
              <div>
                {/* Additional fields for user role, e.g., Login with Google */}
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Login with Google
                  </FormLabel>
                  <FormControl>
                    {/* Add your Google login button or any other additional fields for user role */}
                    {/* For example, <GoogleLoginButton {...additionalProps} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}

            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-white p-2 w-full rounded-md transition-colors"
            >
              Login
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
