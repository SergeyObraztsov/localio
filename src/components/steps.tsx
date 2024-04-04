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
              'flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-bold',
              currentStepIndex === idx && 'bg-green'
            )}
          >
            {idx + 1}
          </div>
        ))}
    </div>
  );
}
