"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  BookOpen,
  LibraryBig,
  Layers,
  Archive,
  Book,
  Pen,
  School,
  BookType,
  AudioLines,
  MessageSquareQuote,
  House,
  Tag,
  User,
  Store,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/ecommarce/CartContext";
import { useWishlist } from "@/components/ecommarce/WishlistContext";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistCount } = useWishlist();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "হোম", href: "/", icon: House },
    { name: "সকল বইসমূহ", href: "/kitabghor/books", icon: Book },
    { name: "বিষয়সমূহ", href: "/kitabghor/categories", icon: Tag },
    { name: "লেখক", href: "/kitabghor/authors", icon: User },
    { name: "প্রকাশক", href: "/kitabghor/publishers", icon: Store },
    {
      name: "কওমী পাঠ্য কিতাব",
      icon: LibraryBig,
      children: [
        { name: "দাওরায়ে হাদীস", href: "#", icon: BookOpen },
        { name: "মাদানী নেসাব", href: "#", icon: Layers },
        { name: "মকতব বিভাগ", href: "#", icon: School },
        { name: "হিফজ বিভাগ", href: "#", icon: Book },
        { name: "তাকমীল বিভাগ", href: "#", icon: Pen },
        { name: "ফতওয়া বিভাগ", href: "#", icon: Archive },
        { name: "জামাতে তাফসীর", href: "#", icon: Book },
        { name: "জামাতে কিরাত", href: "#", icon: AudioLines },
        { name: "জামাতে নাহব", href: "#", icon: MessageSquareQuote },
        { name: "জামাতে হাদীস", href: "#", icon: BookType },
        { name: "জামাতে শরহে বেকায়া", href: "#", icon: School },
        { name: "জামাতে মেশকাত", href: "#", icon: BookOpen },
      ],
    },
    {
      name: "বইমেলা 2024",
      href: "/kitabghor/book-fair",
      icon: CalendarCheck,
    },
  ];

  const totalCartItems =
    cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-slate-200 shadow-sm">
      <div>
        <div className="container flex items-center gap-10 justify-between h-20 px-4 md:px-8">
          <div>
            <Link href="/" className="font-bold text-2xl">
              হিলফুল-ফুযুল প্রকাশনী
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return item.children ? (
                <div key={item.name} className="relative group">
                  <button
                    className={`text-gray-700 flex items-center hover:text-primary transition-colors ${item.children.some((child) => child.href === pathname) ? "text-primary font-semibold" : ""}`}
                  >
                    <item.icon className="h-4 w-4 mr-2  text-gray-500" />
                    {item.name}
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded w-64 hidden group-hover:block z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center px-4 py-2 hover:bg-gray-100 text-sm ${pathname === child.href ? "text-primary font-semibold" : "text-gray-700"}`}
                      >
                        <child.icon className="h-4 w-4 mr-2 text-gray-500" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center transition-colors ${isActive ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}`}
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 mr-2 text-gray-500" />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/kitabghor/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {hasMounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/kitabghor/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {hasMounted && totalCartItems > 0 && (
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

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t px-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return item.children ? (
                  <div key={item.name}>
                    <p
                      className={`font-semibold ${item.children.some((child) => child.href === pathname) ? "text-primary" : "text-gray-700"}`}
                    >
                      {item.name}
                    </p>
                    <div className="ml-4 mt-1 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`flex items-center text-sm ${pathname === child.href ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <child.icon className="h-4 w-4 mr-2 text-gray-500" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center ${isActive ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && (
                      <item.icon className="h-4 w-4 mr-2 text-gray-500" />
                    )}
                    {item.name}
                  </Link>
                );
              })}
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
