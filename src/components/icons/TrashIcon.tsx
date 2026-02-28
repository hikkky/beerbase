interface Props {
  className?: string;
  fill?: string;
}

export function TrashIcon({ className = "h-6 w-6", fill = "none" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75v6.75M14.25 9.75v6.75M4.5 6.75h15M18.75 6.75L17.7 19.133A2.25 2.25 0 0 1 15.46 21H8.54a2.25 2.25 0 0 1-2.24-1.867L5.25 6.75m2.25 0V4.875A1.875 1.875 0 0 1 9.375 3h5.25A1.875 1.875 0 0 1 16.5 4.875V6.75"
      />
    </svg>
  );
}


