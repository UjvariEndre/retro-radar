import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <section className={cn("w-full bg-gray-800 px-10 py-7", className)}>
      {children}
    </section>
  );
};

export default PageContainer;
