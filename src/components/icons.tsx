import type { SVGProps } from "react";

export function SnakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 12a4 4 0 1 0-8 0c0 4 4 4 4 4s-4 0-4-4a4 4 0 1 1 8 0c0-4-4-4-4-4s4 0 4 4" />
      <path d="M16 8c-4 0-4 4-4 4" />
    </svg>
  );
}
