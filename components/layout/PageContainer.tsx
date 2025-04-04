import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <section className={cn("py-7 px-10 w-full", className)}>{children}</section>
  );
};

export default PageContainer;
