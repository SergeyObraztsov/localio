import * as React from 'react';

import { cn } from '~/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: React.ReactNode };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, label, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label className="absolute left-3 top-2 text-[10px] text-[#ffffff4d]" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex w-full rounded-lg bg-white/10 text-sm caret-white outline-none placeholder:text-[#ffffff4d] focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            label ? 'h-14 px-3 pb-2 pt-7' : 'h-10 px-3 py-2',
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
