import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HomepageSearchBy } from "./hc-search-by";

interface IHCSearchByItemProps {
  item: HomepageSearchBy;
}

const HCSearchByItem: React.FC<IHCSearchByItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const router = useRouter();

  function replaceRoute() {
    router.push(item.href);
  }

  return (
    <>
      {/* <Link href={item.href} className={`w-full`}> */}
      <Button onClick={replaceRoute} variant="cancel" className={`py-6`}>
        {t("searchBy-text")} {t(`${item.keyword}-search-button-title`)}
      </Button>
      {/* </Link> */}
    </>
  );
};
export default HCSearchByItem;
