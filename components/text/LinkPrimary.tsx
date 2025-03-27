import Link from "next/link";

interface LinkPrimaryProps {
  href: string;
  children: React.ReactNode;
}

const LinkPrimary = (props: LinkPrimaryProps) => {
  return (
    <Link {...props} className="font-bold text-blue-800 hover:text-amber-400">
      {props.children}
    </Link>
  );
};
export default LinkPrimary;
