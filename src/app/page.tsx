import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <header className="w-full bg-blue-500 text-white py-6 shadow-md">
        <h1 className="text-center text-4xl font-bold">QR Direct</h1>
      </header>

      <main className="container mx-auto p-6 flex flex-col items-center mt-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Welcome to QR Direct
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-center max-w-2xl">
          Manage your QR codes, payments, and analytics all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full">
          <Link
            href="/qr-generator"
            className="glass-morphism p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold text-blue-500">QR Code Generator</h3>
            <p className="mt-2 text-gray-600">Create dynamic QR codes effortlessly.</p>
          </Link>

          <Link
            href="/payment"
            className="glass-morphism p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold text-green-500">Payment Options</h3>
            <p className="mt-2 text-gray-600">Subscribe to unlock premium features.</p>
          </Link>

          <Link
            href="/analytics"
            className="glass-morphism p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold text-purple-500">Analytics</h3>
            <p className="mt-2 text-gray-600">Track the performance of your QR codes.</p>
          </Link>

          <Link
            href="/about"
            className="glass-morphism p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-700">About Us</h3>
            <p className="mt-2 text-gray-600">Learn more about QR Direct and our mission.</p>
          </Link>
        </div>
      </main>

      <footer className="w-full bg-gray-200 dark:bg-gray-800 py-6 mt-10 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; 2024 QR Direct. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
