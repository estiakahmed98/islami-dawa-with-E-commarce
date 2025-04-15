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

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = sessionStorage.getItem("redirectPath") || "/";
      router.push(redirectPath);
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("লগইন সফল হয়েছে!");
      } else {
        toast.error("ইমেইল বা পাসওয়ার্ড ভুল!");
      }
    } catch (error) {
      toast.error("লগইন ব্যর্থ হয়েছে!");
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
          <CardTitle className="text-2xl font-bold">লগইন করুন</CardTitle>
          <CardDescription>
            আপনার অ্যাকাউন্টে লগইন করতে আপনার ইমেইল এবং পাসওয়ার্ড ব্যবহার করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Link
                  href="/kitabghor/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">অ্যাকাউন্ট নেই? </span>
            <Link
              href="/kitabghor/signup"
              className="text-primary hover:underline"
            >
              রেজিস্টার করুন
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
