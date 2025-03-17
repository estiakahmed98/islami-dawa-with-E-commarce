"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

export default function PdfViewer({ pdfUrl }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)

  // For demo purposes, we'll just show a placeholder
  // In a real implementation, you would use a PDF viewer library like react-pdf

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    // Assuming the PDF has 10 pages for demo
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">পৃষ্ঠা {currentPage} / 10</span>
          <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage === 10}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 200}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto">
        <div
          className="bg-white shadow-lg"
          style={{
            width: `${(8.5 * zoom) / 100}in`,
            height: `${(11 * zoom) / 100}in`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            <p className="text-lg font-bold mb-2">{pdfUrl ? "PDF বিষয়বস্তু" : "PDF লোড হচ্ছে..."}</p>
            <p className="text-sm text-muted-foreground">পৃষ্ঠা {currentPage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

