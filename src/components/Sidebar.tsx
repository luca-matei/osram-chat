import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PDFViewer from './PDFViewer';

interface SidebarProps {
  pdfs: string[];
  isPdfsLoading: boolean;
}

export default function Sidebar({ pdfs, isPdfsLoading }: SidebarProps) {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 rounded-l-lg flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-[#0054A6] flex items-center">
        <FontAwesomeIcon icon={faFilePdf} className="mr-2 text-[#FF6B00] w-4 h-4" />
        PDF Documents
      </h2>
      <ul className="space-y-2 overflow-y-auto flex-1">
        {isPdfsLoading ? (
          <li className="p-2 text-gray-500 text-sm flex items-center">
            <span className="animate-pulse">Loading PDFs...</span>
          </li>
        ) : pdfs.length === 0 ? (
          <li className="p-2 text-gray-500 text-sm flex items-center">
            No PDFs available
          </li>
        ) : (
          pdfs.map((pdf, index) => (
            <li 
              key={index} 
              className="p-2 rounded cursor-pointer text-gray-500 hover:text-[#2C3E50] transition-colors flex items-center text-sm"
              onClick={() => setSelectedPdf(pdf)}
            >
              <FontAwesomeIcon icon={faFilePdf} className="mr-2 text-[#FF6B00] w-4 h-4 flex-shrink-0" />
              <span className="truncate">{pdf}</span>
            </li>
          ))
        )}
      </ul>
      {selectedPdf && (
        <PDFViewer
          pdfName={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </div>
  );
} 