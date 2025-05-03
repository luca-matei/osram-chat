export default function Footer() {
  return (
    <div className="text-center text-xs text-gray-500 py-4 space-y-2">
      <div className="max-w-7xl mx-auto px-4 text-left">
        <p>
          © 2025{' '}
          <a 
            href="https://lucamatei.eu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#FF6B00] transition-colors"
          >
            Luca Matei
          </a>
          . Interface design and implementation.
        </p>
        <p className="mt-2">
          Disclaimer: This is an independent project and is not affiliated with, endorsed by, or sponsored by OSRAM GmbH or any of its subsidiaries. 
          OSRAM is a registered trademark of OSRAM GmbH. All product names, logos, and brands are property of their respective owners. 
          This project is created for educational and demonstration purposes only.
        </p>
      </div>
    </div>
  );
} 