import Link from 'next/link';

export default function Success() {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Thank You!</h1>
        <p>Your subscription was successful. You can now access all premium features.</p>
        <Link href="/" className="text-blue-500 underline">
          Go to Homepage
        </Link>
      </div>
    );
  }
  