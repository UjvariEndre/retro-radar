import { ReleaseItemModel } from "@/lib/models/releases.model";
import LinkPrimary from "./LinkPrimary";

interface ReleaseTitleProps {
  release: ReleaseItemModel;
}

const ReleaseTitle = ({ release }: ReleaseTitleProps) => {
  const title = `${release.title}${release.is_licensed ? "" : " (Unlicensed)"}`;
  return <LinkPrimary href="details">{title}</LinkPrimary>;
};
export default ReleaseTitle;
