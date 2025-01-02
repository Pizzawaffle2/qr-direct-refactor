// src/components/ui/switch.tsx
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

// Maintain existing prop interface for backwards compatibility
interface SwitchProps {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

// Create internal RadixUI switch with all features
const RadixSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200',
      'dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-700',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0',
        'transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
));
RadixSwitch.displayName = 'Switch';

// Main Switch component that supports both old and new usage
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps & React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ isChecked, onChange, label, className, disabled, ...props }, ref) => {
  // If using legacy props (isChecked/onChange), use those
  const isLegacyUsage = isChecked !== undefined || onChange !== undefined;

  if (isLegacyUsage) {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        {label && (
          <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
        )}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
            aria-label={label || 'Toggle switch'}
            disabled={disabled}
          />
          <div className={cn(
            "w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer",
            "peer-checked:bg-blue-600 peer-checked:dark:bg-blue-500 transition-all",
            disabled && "opacity-50 cursor-not-allowed"
          )}>
            <div
              className={cn(
                'w-5 h-5 bg-white rounded-full shadow-md transform transition-transform',
                isChecked ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </div>
        </label>
      </div>
    );
  }

  // If using new props (Radix style), use RadixSwitch
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      )}
      <RadixSwitch ref={ref} disabled={disabled} {...props} />
    </div>
  );
});

Switch.displayName = 'Switch';

export { Switch };
export default Switch;