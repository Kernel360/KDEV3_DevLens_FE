type HeadingSize = "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm";
type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: HeadingElement;
  size?: HeadingSize;
  className?: string;
}

const HEADING_SIZES: Record<HeadingSize, string> = {
  "4xl": "text-4xl",
  "3xl": "text-3xl",
  "2xl": "text-2xl",
  xl: "text-xl",
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
} as const;

const Heading = ({
  children,
  as: Component = "h2",
  size = "2xl",
  className = "",
  ...props
}: HeadingProps) => {
  const sizeClass = HEADING_SIZES[size];

  return (
    <Component
      className={`${sizeClass} ${className} font-bold tracking-tight`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
