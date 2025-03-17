"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { products } from "@/public/BookData";
import { Heart } from "lucide-react";

interface Category {
  id: string | number;
  name: string;
}

interface Product {
  id: string | number;
  name: string;
  category: { id: string | number };
  price: number;
  original_price: number;
  discount: number;
  writer: { name: string };
  image: string;
}

export default function CategoryBooks({ category }: { category: Category }) {
  const [wishlist, setWishlist] = useState<(string | number)[]>([]); // Fixing the type of wishlist

  // Filter products based on the category
  const categoryBooks = products.filter(
    (product: Product) => product.category.id === category.id
  );

  // Display only the first 8 books
  const displayBooks = categoryBooks.slice(0, 8);

  // Toggle wishlist
  const toggleWishlist = (productId: string | number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">{category.name}</h3>
        {categoryBooks.length > 8 && (
          <Link href={`/categories/${category.id}`}>
            <Button variant="outline">সব দেখুন</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayBooks.map((book: Product) => (
          <Card key={book.id} className="overflow-hidden">
            <Link href={`/books/${book.id}`}>
              <div className="relative h-64 w-full">
                <Image
                  src={book.image}
                  alt={book.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/books/${book.id}`}>
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
