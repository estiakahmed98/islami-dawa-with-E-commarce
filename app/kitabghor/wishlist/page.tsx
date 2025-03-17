"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"

// Sample wishlist items for demo
const initialWishlistItems = [
  {
    id: 1,
    productId: 2,
    name: "হিন্দু-ভাইবোনদের প্রতি ভালোবাসার পয়গাম",
    price: 125.49,
    original_price: 155.49,
    discount: 19,
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    productId: 7,
    name: "বড়দিনের উপহার",
    price: 150.49,
    original_price: 185.49,
    discount: 19,
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 3,
    productId: 14,
    name: "৩০ হাজার খ্রিস্টানদের গুরু যেভাবে মুবাল্লিগ",
    price: 185.99,
    original_price: 230.99,
    discount: 19,
    image: "/placeholder.svg?height=200&width=150",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">আপনার উইশলিস্ট</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">আপনার উইশলিস্ট খালি</h2>
          <p className="text-muted-foreground mb-6">আপনার উইশলিস্টে কোন পণ্য নেই। পছন্দের বই যোগ করতে শপিং চালিয়ে যান।</p>
          <Link href="/books">
            <Button>শপিং চালিয়ে যান</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <Link href={`/books/${item.productId}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <button
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              <CardContent className="p-4">
                <Link href={`/books/${item.productId}`}>
                  <h4 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </h4>
                </Link>
                <div className="flex items-center justify-between mt-2 mb-4">
                  <div>
                    <span className="font-bold text-lg">৳{item.price}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through ml-2">৳{item.original_price}</span>
                    )}
                  </div>
                  {item.discount > 0 && (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">{item.discount}% ছাড়</span>
                  )}
                </div>
                <Button className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  কার্টে যোগ করুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

