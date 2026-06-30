import { cn } from "../../app/utils/cn";

interface SpinnerProps {
  className?: string;
}

export function Spiner({ className }: SpinnerProps) {
  return (
    <svg
      className={cn("animate-spin", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spinner-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="url(#spinner-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
