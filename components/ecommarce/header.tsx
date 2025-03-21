"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "হোম", href: "/" },
    { name: "সকল বইসমূহ", href: "kitabghor/books/" },
    { name: "বিষয়সমূহ", href: "/categories" },
    { name: "লেখক", href: "/authors" },
    { name: "প্রকাশক", href: "/publishers" },
    { name: "কওমী পাঠ্য কিতাব", href: "/kowmi-books" },
    { name: "বইমেলা 2024", href: "/book-fair-2024" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div>
        <div className="flex items-center gap-10 justify-between h-20">
          <div>
            <Link href="/" className="font-bold text-2xl">
              হিলফুল-ফুযুল
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart, Wishlist & Login */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="ghost">লগইন</Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Login Button */}
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  লগইন
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
