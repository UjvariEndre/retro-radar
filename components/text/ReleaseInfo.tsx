import { ReleaseItemModel } from "@/lib/models/releases.model";

interface ReleaseInfoProps {
  release: ReleaseItemModel;
}

const ReleaseInfo = ({ release }: ReleaseInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <p>
          Publisher: <span className="font-bold">{release.publisher_name}</span>
        </p>
        <p>
          Platform: <span className="font-bold">{release.platform_name}</span>
        </p>
      </div>
      <div className="border-l px-2">
        <p>
          Release Date:{" "}
          <span className="font-bold">{release.release_date}</span>
        </p>
        <p>
          Region: <span className="font-bold">{release.region_tag}</span>
        </p>
      </div>
    </div>
  );
};
export default ReleaseInfo;
