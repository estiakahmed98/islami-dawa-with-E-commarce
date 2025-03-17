import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function RelatedBooks({ books }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">সম্পর্কিত বই</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <Link href={`kitabghor/books//${book.id}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={"/placeholder.svg?height=300&width=200"}
                  alt={book.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`kitabghor/books//${book.id}`}>
                <h4 className="font-semibold text-lg mb-1 hover:text-primary transition-colors line-clamp-2">
                  {book.name}
                </h4>
              </Link>
              <p className="text-sm text-muted-foreground mb-2">
                {book.writer.name}
              </p>
              <div>
                <span className="font-bold">৳{book.price}</span>
                {book.discount > 0 && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ৳{book.original_price}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
