import { cn } from "../../app/utils/cn"; // ajuste o caminho se necessário

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
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="4"
      />
      <path
        d="M22 12c0-5.523-4.477-10-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
