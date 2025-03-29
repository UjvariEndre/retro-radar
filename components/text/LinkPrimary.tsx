import Link from "next/link";

interface LinkPrimaryProps {
  href: string;
  children: React.ReactNode;
}

const LinkPrimary = (props: LinkPrimaryProps) => {
  return (
    <Link
      {...props}
      className="hover:text-rr-primary-foreground text-rr-accent font-bold"
    >
      {props.children}
    </Link>
  );
};
export default LinkPrimary;
