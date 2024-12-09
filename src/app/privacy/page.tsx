'use client';

export default function PrivacyPolicyPage() {
 return (
   <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] overflow-hidden">
     <div className="morphing-background" />
     
     <div className="container mx-auto px-4 sm:px-6 py-16">
       <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text mb-8">
         Privacy Policy
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
               At QR Direct, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
             </p>
           </section>

           {/* Information We Collect */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               2. Information We Collect
             </h2>
             <div className="space-y-2 text-gray-600 dark:text-gray-400">
               <p>We collect information that you provide directly to us:</p>
               <ul className="list-disc pl-6 space-y-2">
                 <li>Account information (name, email, password)</li>
                 <li>Profile information</li>
                 <li>Payment details</li>
                 <li>QR code content and analytics data</li>
                 <li>Communications with us</li>
               </ul>
             </div>
           </section>

           {/* How We Use Information */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               3. How We Use Your Information
             </h2>
             <div className="space-y-2 text-gray-600 dark:text-gray-400">
               <p>We use the information we collect to:</p>
               <ul className="list-disc pl-6 space-y-2">
                 <li>Provide, maintain, and improve our services</li>
                 <li>Process your transactions</li>
                 <li>Send you technical notices and support messages</li>
                 <li>Respond to your comments and questions</li>
                 <li>Monitor and analyze usage patterns</li>
               </ul>
             </div>
           </section>

           {/* Data Sharing */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               4. Information Sharing
             </h2>
             <p className="text-gray-600 dark:text-gray-400">
               We do not sell your personal information. We may share your information with third parties only in the following circumstances:
             </p>
             <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
               <li>With your consent</li>
               <li>To comply with legal obligations</li>
               <li>With service providers who assist our operations</li>
               <li>In connection with a business transfer or merger</li>
             </ul>
           </section>

           {/* Data Security */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               5. Data Security
             </h2>
             <p className="text-gray-600 dark:text-gray-400">
               We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
             </p>
           </section>

           {/* Your Rights */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               6. Your Rights
             </h2>
             <p className="text-gray-600 dark:text-gray-400">
               You have the right to access, correct, or delete your personal information. You may also have rights to restrict processing or data portability under applicable laws.
             </p>
           </section>

           {/* Cookies */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               7. Cookies and Tracking
             </h2>
             <p className="text-gray-600 dark:text-gray-400">
               We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
             </p>
           </section>

           {/* Contact */}
           <section className="space-y-4">
             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
               8. Contact Us
             </h2>
             <p className="text-gray-600 dark:text-gray-400">
               If you have questions about this Privacy Policy or our practices, please contact us at privacy@qrdirect.com
             </p>
           </section>
         </div>

         {/* Footer Note */}
         <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
           This privacy policy is effective as of December 9, 2024 and will remain in effect except with respect to any changes in its provisions in the future.
         </p>
       </div>
     </div>
   </div>
 );
}