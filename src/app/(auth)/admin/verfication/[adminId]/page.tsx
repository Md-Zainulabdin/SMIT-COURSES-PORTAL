"use client";
// Import necessary modules and components

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the form schema
const formSchema = z.object({
  key: z.string().min(6, "Admin key must be at least 6 characters").max(50),
});

type AdminVerificationFormValues = z.infer<typeof formSchema>;

// Define the AdminVerification component
interface AdminVerificationProps {
  adminId: string;
}

const AdminVerification: React.FC<AdminVerificationProps> = ({ adminId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<AdminVerificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      key: "",
    },
  });

  async function onSubmit(data: AdminVerificationFormValues) {
    setLoading(true);

    try {
      // Add your admin verification logic here
      // For example, send a request to the server to verify the admin key
      // You can use the `adminId` prop in your API request
      // Redirect or perform any other action after successful admin key verification
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
              name="key"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-normal text-muted-foreground">
                    Enter admin key
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="w-full">
              Verify Admin Key
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminVerification;
