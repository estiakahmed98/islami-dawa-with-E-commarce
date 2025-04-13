"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/public/BookData";

const uniqueAuthors = Array.from(
  new Map(products.map((book) => [book.writer.id, book.writer])).values()
);

export default function AuthorCategoriesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">লেখক অনুযায়ী বই</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uniqueAuthors.map((author) => {
          const authoredBooks = products.filter(
            (book) => book.writer.id === author.id
          );

          return (
            <Link
              href={`/kitabghor/authors/${author.id}`}
              key={author.id}
              className="hover:no-underline"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{author.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    মোট {authoredBooks.length} টি বই
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
