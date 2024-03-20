import * as React from 'react';

import { cn } from '~/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: React.ReactNode };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="absolute top-2 left-3 text-[10px] text-[#ffffff4d]" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex w-full rounded-lg bg-gray-light text-sm placeholder:text-[#ffffff4d] focus:bg-[#1D1E1F] focus:ring-0 focus:ring-offset-0 outline-none disabled:cursor-not-allowed disabled:opacity-50',
            label ? 'h-14 px-3 pt-7 pb-2' : 'h-10 px-3 py-2',
            className
          )}
          ref={ref}
          id={id}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
