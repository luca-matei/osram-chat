import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface PDFViewerProps {
  pdfName: string;
  onClose: () => void;
}

export default function PDFViewer({ pdfName, onClose }: PDFViewerProps) {
  const pdfUrl = `https://assets.lucamatei.net/files/osram/${pdfName}`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90vw] h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#2C3E50]">{pdfName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-[#2C3E50] transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title={pdfName}
          />
        </div>
      </div>
    </div>
  );
} 