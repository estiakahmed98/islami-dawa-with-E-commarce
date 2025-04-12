"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/ecommarce/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "হোম", href: "/" },
    { name: "সকল বইসমূহ", href: "/books" },
    { name: "বিষয়সমূহ", href: "/categories" },
    { name: "লেখক", href: "/authors" },
    { name: "প্রকাশক", href: "/publishers" },
    { name: "কওমী পাঠ্য কিতাব", href: "/kowmi-books" },
    { name: "বইমেলা 2024", href: "/book-fair-2024" },
  ];

  // Calculate total quantity of items in the cart
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div>
        <div className="flex items-center gap-10 justify-between h-20 px-4 md:px-8">
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
            <Link href="/kitabghor/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/kitabghor/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
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
          <div className="md:hidden py-4 border-t px-4">
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
              <Link href="/signin">
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
