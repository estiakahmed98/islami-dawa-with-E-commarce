"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = sessionStorage.getItem("redirectPath") || "/";
      router.push(redirectPath);
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড মিলছে না!");
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(name, email, password);
      if (success) {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
      } else {
        toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      }
    } catch (error) {
      toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            অ্যাকাউন্ট তৈরি করুন
          </CardTitle>
          <CardDescription>
            নতুন অ্যাকাউন্ট তৈরি করতে নিচের ফর্মটি পূরণ করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">নাম</Label>
              <Input
                id="name"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                placeholder="আপনার ইমেইল"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">পাসওয়ার্ড</Label>
              <Input
                id="password"
                type="password"
                placeholder="পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "অপেক্ষা করুন..." : "রেজিস্টার করুন"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            </span>
            <Link
              href="/kitabghor/signin"
              className="text-primary hover:underline"
            >
              লগইন করুন
            </Link>
          </div>
          <div className="text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              ← হোমপেজে ফিরে যান
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
