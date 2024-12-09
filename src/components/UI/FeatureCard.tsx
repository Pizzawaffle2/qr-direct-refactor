import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function FeatureCard({ href, title, description, icon: Icon, color }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group glass-card rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
    >
      <div className="flex flex-col items-center">
        <Icon className={`w-10 h-10 mb-4 ${color}`} />
        <h3 className={`text-xl font-semibold ${color}`}>{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">{description}</p>
      </div>
    </Link>
  );
}
