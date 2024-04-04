import * as React from 'react';

import { cn } from '~/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: React.ReactNode;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, maxLength, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="absolute left-3 top-2 text-[10px] text-[#ffffff4d]" htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-32 w-full rounded-lg bg-white/10 text-sm caret-white outline-none placeholder:text-[#ffffff4d] focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            label ? 'h-14 px-3 pb-2 pt-7' : 'h-10 px-3 py-2',
            className
          )}
          id={id}
          ref={ref}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <p className="absolute bottom-3 right-2 text-[10px] text-[#ffffff4d]">
            {0} / {maxLength}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
