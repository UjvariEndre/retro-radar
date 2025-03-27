import Link from "next/link";

interface LinkPrimaryProps {
  href: string;
  children: React.ReactNode;
}

const LinkPrimary = (props: LinkPrimaryProps) => {
  return (
    <Link
      {...props}
      className="font-bold text-accent hover:text-primary-foreground"
    >
      {props.children}
    </Link>
  );
};
export default LinkPrimary;
