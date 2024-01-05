"use client";
// Import necessary modules and components

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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

// Define the form schema
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

// Define the LoginForm component
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

            <Button disabled={loading} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>

      {role === "user" && (
        <div className="py-6">
          <Separator />
        </div>
      )}

      <div>
        {role === "user" && (
          <Button className="w-full" variant={"outline"} size={"lg"}>
            <div className="p-3 flex items-center gap-2 text-muted-foreground">
              <FcGoogle size={24} /> Login with Google
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
