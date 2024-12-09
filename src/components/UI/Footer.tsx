export default function Footer() {
    return (
      <footer className="relative w-full border-t border-gray-200/30 dark:border-gray-700/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">QR Direct</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Simplifying QR code management for everyone.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/qr-generator" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    QR Generator
                  </a>
                </li>
                <li>
                  <a href="/analytics" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/TOS" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200/30 dark:border-gray-700/30 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} QR Direct. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }