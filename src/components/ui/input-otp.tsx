'use client';

import * as React from 'react';
import { OTPInput, type SlotProps } from 'input-otp';
import { Dot } from 'lucide-react';

import { cn } from '~/lib/utils';

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, ...props }, ref) => (
  <OTPInput ref={ref} containerClassName={cn('flex items-center gap-2', className)} {...props} />
));
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  SlotProps & React.ComponentPropsWithoutRef<'div'>
>(({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-sm transition-all',
        isActive && '',
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && <FakeCaret />}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-4 w-px animate-caret-blink bg-white duration-1000" />
    </div>
  );
}

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
