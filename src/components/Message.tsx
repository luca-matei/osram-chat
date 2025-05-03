interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const formattedContent = content.split('\n').map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));

  return (
    <div
      className={`flex ${
        role === 'user' ? 'justify-end' : 'justify-start'
      } animate-slide-in`}
    >
      <div
        className={`max-w-[70%] transform transition-all duration-300 whitespace-pre-wrap p-4 rounded-lg ${
          role === 'user'
            ? 'text-[#0054A6] italic bg-[#F5F7FA]'
            : 'text-gray-700 bg-white'
        }`}
      >
        {formattedContent}
      </div>
    </div>
  );
} 