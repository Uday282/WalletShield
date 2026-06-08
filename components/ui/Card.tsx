type Props = {
  children: React.ReactNode;

  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {

  return (

    <div
      className={`
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:border-zinc-700
        hover:-translate-y-1
        hover:shadow-2xl
        ${className}
      `}
    >

      {children}

    </div>
  );
}