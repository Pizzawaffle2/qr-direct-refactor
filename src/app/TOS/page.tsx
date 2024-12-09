'use client';

export default function TermsofServicePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] overflow-hidden">
      <div className="morphing-background" />
      
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text mb-8">
          Terms of Service
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-8 space-y-8">
            {/* Last Updated */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: December 9, 2024
            </p>

            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                1. Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome to QR Direct. By accessing our website and using our services, you agree to these Terms of Service. Please read them carefully.
              </p>
            </section>

            {/* Services */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                2. Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                QR Direct provides QR code generation, link management, analytics, and related services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
              </p>
            </section>

            {/* Account Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                3. Account Terms
              </h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p>You must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be 13 years or older to use this service</li>
                  <li>Provide accurate and complete information</li>
                  <li>Be responsible for maintaining account security</li>
                  <li>Notify us of any security breaches</li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                4. Payment Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Paid services are billed in advance. Refunds are handled according to our refund policy. You are responsible for any applicable taxes.
              </p>
            </section>

            {/* Content Guidelines */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                5. Content Guidelines
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You agree not to use our services for any illegal or unauthorized purpose. We reserve the right to remove content that violates our policies.
              </p>
            </section>

            {/* Privacy and Data */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                6. Privacy and Data
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your use of QR Direct is also governed by our Privacy Policy. By using our services, you agree to our data collection and use practices.
              </p>
            </section>

            {/* Termination */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                7. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We may terminate or suspend your account at any time for violations of these terms. You may terminate your account at any time by contacting support.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                8. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                If you have any questions about these Terms, please contact us at support@qrdirect.com
              </p>
            </section>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            These terms of service were last updated on December 9, 2024. Our terms may change in the future.
          </p>
        </div>
      </div>
    </div>
  );
}