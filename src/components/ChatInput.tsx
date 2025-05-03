import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faChevronUp, faChevronDown, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onQuickQuery: (query: string) => void;
}

const QUERY_OPTIONS = [
  {
    text: "Which lights are suitable for use in an operating room?",
    query: "Which lights are suitable for use in an operating room?"
  },
  {
    text: "Lights with 1000W+ and 400h+ lifespan",
    query: "Provide me with all light sources with at least 1000 watts and a lifespan of more than 400 hours."
  },
  {
    text: "Find light by product number",
    query: "Which light has the primary product number 4062172212311?"
  },
  {
    text: "SIRIUS HRI color temperature",
    query: "What is the color temperature of the SIRIUS HRI 330W 2/CS 1/SKU?"
  }
];

export default function ChatInput({ input, isLoading, onInputChange, onSubmit, onReset, onQuickQuery }: ChatInputProps) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(true);

  const handleQueryClick = (query: string) => {
    onQuickQuery(query);
  };

  return (
    <div className="flex flex-col border-t border-gray-200">
      <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm rounded-lg">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOptionsVisible(!isOptionsVisible)}
            className="text-[#2C3E50] hover:text-[#0054A6] transition-colors"
          >
            <FontAwesomeIcon icon={isOptionsVisible ? faChevronUp : faChevronDown} />
          </button>
          <span className="text-sm text-[#2C3E50]">Quick Queries</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-[#2C3E50] hover:text-[#0054A6] transition-colors"
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>
      {isOptionsVisible && (
        <div className="p-3 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="flex flex-wrap gap-2">
            {QUERY_OPTIONS.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQueryClick(option.query)}
                disabled={isLoading}
                className="px-3 py-1.5 text-sm bg-[#F5F7FA] text-[#2C3E50] rounded-lg hover:bg-[#E5E7EB] disabled:opacity-50 transition-colors border border-gray-200"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="p-4">
        <form onSubmit={onSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0054A6] text-[#2C3E50]"
              disabled={isLoading}
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF6B00] w-4 h-4" 
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#E55C00] disabled:opacity-50 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2 w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 