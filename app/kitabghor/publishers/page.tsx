"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/public/BookData";

// Extract unique publishers
const uniquePublishers = Array.from(
  new Map(products.map((book) => [book.publisher.id, book.publisher])).values()
);

export default function PublisherCategoriesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">প্রকাশক অনুযায়ী বই</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uniquePublishers.map((publisher) => {
          const booksByPublisher = products.filter(
            (book) => book.publisher.id === publisher.id
          );

          return (
            <Link
              href={`/kitabghor/publishers/${publisher.id}`}
              key={publisher.id}
              className="hover:no-underline"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {publisher.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    মোট {booksByPublisher.length} টি বই
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
