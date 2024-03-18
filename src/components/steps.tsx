import { cn } from '~/lib/utils';

export default function Steps({
  total,
  currentStepIndex
}: {
  total: number;
  currentStepIndex: number;
}) {
  return (
    <div className="flex gap-2">
      {Array(total)
        .fill(0)
        .map((_, idx) => (
          <div
            key={`Step-${idx}`}
            className={cn(
              'flex items-center justify-center w-6 h-6 rounded-full bg-gray-light',
              currentStepIndex === idx && 'bg-green'
            )}
          >
            {idx + 1}
          </div>
        ))}
    </div>
  );
}
