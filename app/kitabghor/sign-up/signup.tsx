"use client";

import { useForm } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormFieldset,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { FormError } from "@/components/FormError";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define proper types
type SignUpValues = {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
};

const SignupForm = () => {
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const form = useForm<SignUpValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    console.log(values);
    await signUp.email(
      {
        name: values.name,
        password: values.password,
        email: values.email,
        role: "user",
        phone: values.phone,
        address: values.address,
      },
      {
        onRequest: () => {
          setFormError("");
          toast.loading;
        },
        onSuccess: () => {
          toast.success("Login Successful");
          router.push("/admin");
        },
        onError: (ctx) => {
          setFormError(ctx.error.message);
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Create your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormFieldset>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your address"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormFieldset>
            <FormError message={formError} />
            <Button type="submit" className="mt-4 w-full">
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="mt-5 space-x-1 text-center text-sm">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
