import LoadingIndicator from "@/components/design/LoadingIndicator";
import FallbackImage from "@/components/features/FallbackImage";
import RRButton from "@/components/features/RRButton";
import ReleaseInfo from "@/components/text/ReleaseInfo";
import ReleaseTitle from "@/components/text/ReleaseTitle";
import { useReleases } from "@/hooks/useReleases";
import { getImageUrlForRelease } from "@/lib/helpers";
import { ReleaseItemModel } from "@/lib/models/releases.model";
import { LucideHandCoins, LucideLibraryBig } from "lucide-react";
import NavButtons from "./NavButtons";

const ListView = () => {
  const { releases, loading } = useReleases();

  return (
    <>
      {loading ? (
        <div className="h-[200px] rounded-b-lg bg-white">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="overflow-hidden rounded-b-lg">
          {releases.map((release) => {
            return <ListViewItem key={release.id} release={release} />;
          })}
        </div>
      )}
      <NavButtons />
    </>
  );
};
export default ListView;

interface ListViewItemProps {
  release: ReleaseItemModel;
}

const ListViewItem = ({ release }: ListViewItemProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 border-t bg-white px-2 py-5">
      <FallbackImage
        src={getImageUrlForRelease(
          "box-front/thumbnail",
          release.id?.toString() ?? "",
        )}
        alt={release.title}
        className="rounded-md object-cover"
        width={150}
        height={150}
      />
      <div className="col-span-2">
        <ReleaseTitle release={release} />
        <ReleaseInfo release={release} />
      </div>
      <div className="max-w-60">
        <RRButton className="mb-1 w-full">
          <LucideLibraryBig />
          Add to Collection
        </RRButton>
        <RRButton variant="secondary" className="w-full">
          <LucideHandCoins />
          Check Prices
        </RRButton>
      </div>
    </div>
  );
};
