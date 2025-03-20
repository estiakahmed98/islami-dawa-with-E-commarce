"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { products, categories } from "@/public/BookData";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Number.parseInt(params.id as string);
  const category = categories.find((cat) => cat.id === categoryId);
  const [wishlist, setWishlist] = useState<number[]>([]); // Type as number[]

  const categoryBooks = products.filter(
    (product) => product.category.id === categoryId
  );

  const toggleWishlist = (productId: number) => {
    // Type as number
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  if (!category) {
    return (
      <div className="container mx-auto py-12 px-4">বিভাগ পাওয়া যায়নি</div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted-foreground">
          মোট {categoryBooks.length} টি বই পাওয়া গেছে
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <Link href={`/kitabghorkitabghor/books//${book.id}`}>
              <div className="relative h-64 w-full">
                <Image
                  src={"/placeholder.svg?height=400&width=300"}
                  alt={book.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`kitabghorkitabghor/books//${book.id}`}>
                <h4 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-2">
                  {book.name}
                </h4>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">
                {book.writer.name}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-lg">৳{book.price}</span>
                  {book.discount > 0 && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ৳{book.original_price}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleWishlist(book.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${wishlist.includes(book.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                </button>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">কার্টে যোগ করুন</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
