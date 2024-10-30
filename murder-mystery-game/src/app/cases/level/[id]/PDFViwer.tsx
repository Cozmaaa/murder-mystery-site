/*
This is the renderer that opens the PDF file from the frontend ./public folder
*/

"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface PDFViewerProps {
  fileUrl: string;
  scale: number;
}

interface DocumentLoadSuccessParams {
  numPages: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl, scale }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);

  function onDocumentLoadSuccess({ numPages }: DocumentLoadSuccessParams) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error while loading document! ", error.message);
    setError(error);
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <Document
      file={fileUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={onDocumentLoadError}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale}  renderTextLayer={false} renderAnnotationLayer={false}/>
      ))}
    </Document>
  );
};

export default PDFViewer;
