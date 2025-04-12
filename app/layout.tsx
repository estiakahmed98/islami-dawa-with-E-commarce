// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import { Toaster } from "@/components/ui/sonner";
// import TreeProvider from "@/providers/treeProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "ইসলামি দাওয়াহ ইনস্টিটিউট বাংলাদেশ",
//   description: "ইসলামি দাওয়াহ ইনস্টিটিউট বাংলাদেশ",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="light"
//           disableTransitionOnChange
//         >
//           <TreeProvider>{children}</TreeProvider>
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import TreeProvider from "@/providers/treeProvider";
import { CartProvider } from "@/components/ecommarce/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ইসলামি দাওয়াহ ইনস্টিটিউট বাংলাদেশ",
  description: "ইসলামি দাওয়াহ ইনস্টিটিউট বাংলাদেশ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TreeProvider>
            <CartProvider>
              {" "}
              {/* Wrap with CartProvider */}
              {children}
            </CartProvider>
          </TreeProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
