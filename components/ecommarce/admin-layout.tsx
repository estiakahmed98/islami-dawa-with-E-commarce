"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "./mode-toggle";
import { signOut, useSession } from "@/lib/auth-client";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  ShoppingCart,
  Settings,
  Package,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", href: "/kitabghor/dashboard", icon: LayoutDashboard },
  { title: "Books", href: "/kitabghor/books/", icon: BookOpen },
  { title: "Categories", href: "/kitabghor/categories", icon: BookOpen },
  { title: "Orders", href: "/kitabghor/orders", icon: ShoppingCart },
  { title: "Customers", href: "/kitabghor/customers", icon: Users },
  { title: "Inventory", href: "/kitabghor/inventory", icon: Package },
  { title: "Messages", href: "/kitabghor/messages", icon: MessageSquare },
  { title: "Settings", href: "/kitabghor/settings", icon: Settings },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const session = useSession();

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={`bg-card fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/kitabghor/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-primary">KitabGhor</span>
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                Admin
              </span>
            </Link>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {sidebarItems.map(({ title, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors
                      ${pathname === href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="ml-3">{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {session.data?.user?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.data?.user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              size="sm"
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.replace("/");
                      router.refresh();
                    },
                  },
                })
              }
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-card border-b sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 h-9" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <ModeToggle />
              <Button
                className="bg-indigo-600 py-2 px-4 text-white rounded-xl"
                onClick={() => router.push("/admin")}
              >
                Back To Islami Dawa
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
