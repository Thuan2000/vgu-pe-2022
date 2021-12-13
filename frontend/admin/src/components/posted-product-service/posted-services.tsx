import SearchInput from "@components/search-input";
import Pagination from "@components/ui/pagination";
import Checkbox from "@components/ui/storybook/checkbox";
import Typography from "@components/ui/storybook/typography";
import { useServicesQuery } from "@graphql/service.graphql";
import { IServiceListItem } from "@graphql/types.graphql";
import { findIndex, remove } from "lodash";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "./service-card";

interface IPostedServicesProps {}

const SERVICES_GET_LIMIT = 8;

const PostedServices: React.FC<IPostedServicesProps> = ({}) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const activePageIdx = parseInt((query.idx as string) || "1");

  const { data } = useServicesQuery({
    variables: {
      input: {
        limit: SERVICES_GET_LIMIT,
        offset: getOffset(),
      },
    },
  });

  const [selectedServices, setSelectedServices] = useState<IServiceListItem[]>(
    []
  );
  const { services, count } = data?.services || {};

  function getOffset() {
    return (activePageIdx - 1) * SERVICES_GET_LIMIT;
  }

  function handlePaginationChange(idx: number) {
    const { pathname } = router;

    router.replace({ pathname, query: { ...query, idx } });
  }

  function checkIsSelected(service: IServiceListItem) {
    return findIndex(selectedServices, service) !== -1;
  }

  function handleSelectService(isChecked: boolean, service: IServiceListItem) {
    if (isChecked) setSelectedServices([...selectedServices, service]);
    else {
      remove(selectedServices, ({ id }) => service.id === id);
      setSelectedServices([...selectedServices]);
    }
  }

  function handleSelectAllChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const servicesWithoutTypename = services?.map(
        ({ __typename, ...s }: any) => s
      );
      setSelectedServices(servicesWithoutTypename!);
    } else setSelectedServices([]);
  }

  return (
    <div className={`space-y-5 select-none`}>
      <div className="fic justify-between px-5">
        <SearchInput className="w-1/3" />

        <Checkbox
          name="select-all-services-checker"
          onChange={handleSelectAllChange}
          className={`border border-gray py-2 px-4 rounded-sm text-gray`}
          label={t("select-all-label")}
        />
      </div>

      <div className={`bg-gray-10 py-3 px-5 fic justify-between`}>
        <div className="fic space-x-2">
          <Typography text={selectedServices.length + ""} color="primary" />
          <Typography color="gray" text={`${t("item-selected-text")}`} />
        </div>

        <Typography
          variant="smallTitle"
          color="gray"
          text={`${t("total-label")}: ${count} ${t("services-label")}`}
        />
      </div>

      <div className="px-5 grid grid-cols-5 gap-x-10 gap-y-5">
        {services?.map((s) => {
          const { __typename, ...service } = s!;

          const isSelected = checkIsSelected(service as any);
          return (
            <ServiceCard
              key={s?.id + "service-list-item"}
              isSelected={isSelected}
              onSelect={handleSelectService}
              service={service as any}
            />
          );
        })}
      </div>

      <Pagination
        totalCount={count || 0}
        limit={SERVICES_GET_LIMIT}
        activeIdx={activePageIdx}
        displayPageAmount={5}
        color={""}
        activeColor={"primary"}
        align="end"
        onChangePage={handlePaginationChange}
      />
    </div>
  );
};
export default PostedServices;
