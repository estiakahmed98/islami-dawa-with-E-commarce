"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { categories, products } from "@/public/BookData";

export default function CategoryCardsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">বিষয়সমূহ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const categoryBooks = products.filter(
            (book) => book.category.id === category.id
          );

          return (
            <Link
              href={`/kitabghor/categories/${category.id}`}
              key={category.id}
              className="hover:no-underline"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    মোট {categoryBooks.length} টি বই
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
