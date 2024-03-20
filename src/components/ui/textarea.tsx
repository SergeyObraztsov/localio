import * as React from 'react';

import { cn } from '~/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: React.ReactNode;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="absolute top-2 left-3 text-[10px] text-[#ffffff4d]" htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-lg bg-gray-light text-sm placeholder:text-[#ffffff4d] focus:ring-0 focus:ring-offset-0 outline-none disabled:cursor-not-allowed disabled:opacity-50',
            label ? 'h-14 px-3 pt-7 pb-2' : 'h-10 px-3 py-2',
            className
          )}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
