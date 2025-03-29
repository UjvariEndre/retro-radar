import { ReleaseItemModel } from "@/lib/models/releases.model";
import { cn } from "@/lib/utils";

interface ReleaseInfoProps {
  release: ReleaseItemModel;
  className?: string;
  short?: boolean;
}

const ReleaseInfo = ({ release, className, short }: ReleaseInfoProps) => {
  const data = [
    { label: "Publisher", value: release.publisher_name },
    { label: "Release Date", value: release.release_date },
    { label: "Platform", value: release.platform_name },
    { label: "Region", value: release.region_tag },
  ];
  return (
    <div className={cn("grid grid-cols-2 gap-2 text-sm", className)}>
      {data.map((item) => {
        return short ? (
          <div key={item.label}>{item.value}</div>
        ) : (
          <div key={item.label}>
            {item.label}: <span className="font-bold">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};
export default ReleaseInfo;
