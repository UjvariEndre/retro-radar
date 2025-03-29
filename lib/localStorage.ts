import { ReleaseListVariant } from "@/components/search/SearchTable";

const LOCAL_STORAGE_KEYS = {
  releaseListViewMode: "releaseListViewMode",
};

export const localStorageUtils = {
  getReleaseListViewMode(): ReleaseListVariant {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.releaseListViewMode);
    if (stored === String(ReleaseListVariant.MosaicView)) {
      return ReleaseListVariant.MosaicView;
    }
    return ReleaseListVariant.ListView;
  },

  setReleaseListViewMode(mode: ReleaseListVariant) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.releaseListViewMode, String(mode));
  },
};
