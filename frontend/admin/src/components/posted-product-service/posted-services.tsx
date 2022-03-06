import DocumentAddIcon from "@assets/icons/document-add-icon";
import ReloadIcon from "@assets/icons/reload-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import NoPosted from "@components/posted-tenders/no-tenders";
import SearchInput from "@components/search-input";
import DeleteServiceAlert from "@components/ui/delete-service-alert";
import Link from "@components/ui/link";
import Loading from "@components/ui/loading";
import Pagination from "@components/ui/pagination";
import Button from "@components/ui/storybook/button";
import Checkbox from "@components/ui/storybook/checkbox";
import Typography from "@components/ui/storybook/typography";
import {
  DeleteServicesMutation,
  useDeleteServicesMutation,
  useServicesQuery,
} from "@graphql/service.graphql";
import { IServiceListItem } from "@graphql/types.graphql";
import { COLORS } from "@utils/colors";
import { getCompanyId } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { findIndex, remove } from "lodash";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useModal } from "src/contexts/modal.context";
import Swal from "sweetalert2";
import ServiceCard from "./service-card";

interface IPostedServicesProps {}

const SERVICES_GET_LIMIT = 8;

const PostedServices: React.FC<IPostedServicesProps> = ({}) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const activePageIdx = parseInt((query.idx as string) || "1");

  const {
    data,
    loading: fetching,
    refetch,
  } = useServicesQuery({
    notifyOnNetworkStatusChange: true,
    variables: getFetchInputParam(),
  });

  const { openModal } = useModal();
  const [deleteServices, { loading: deletingServices }] =
    useDeleteServicesMutation({ onCompleted: handleDeletedServices });

  const [selectedServices, setSelectedServices] = useState<IServiceListItem[]>(
    []
  );
  const { services, pagination } = data?.services || {};

  function getFetchInputParam() {
    return {
      input: {
        companyId: getCompanyId(),
        limit: SERVICES_GET_LIMIT,
        offset: getOffset(),
      },
    };
  }

  function getOffset() {
    return (activePageIdx - 1) * SERVICES_GET_LIMIT;
  }

  async function handleDeletedServices({
    deleteServices: { message, success },
  }: DeleteServicesMutation) {
    if (!success) {
      Swal.fire({
        icon: "error",
        titleText: t(`form:error-${message}-title`),
        text: t(`form:error-${message}-message`),
        confirmButtonText: t(`form:error-${message}-button`),
      });
    } else {
      const { isDismissed, isConfirmed } = await Swal.fire({
        icon: "success",
        titleText: t(`form:services-deleted-title`),
        text: t(`form:services-deleted-message`),
        confirmButtonText: t(`form:okay-button-label`),
      });
      toast.success(t("form:services-deleted-title"));
      if (isDismissed || isConfirmed) refetchServices();
    }
  }

  function fireDeleteServicesAlert() {
    openModal(
      (
        <DeleteServiceAlert
          isLoading={deletingServices}
          onDeleteClick={deleteSelectedServices}
        />
      ) as any
    );
  }

  function fireDeleteServiceAlert(service: IServiceListItem) {
    openModal(
      (
        <DeleteServiceAlert
          isLoading={deletingServices}
          onDeleteClick={() => deleteService(service)}
        />
      ) as any
    );
  }

  function handlePaginationChange(idx: number) {
    const { pathname } = router;

    router.replace({ pathname, query: { ...query, idx } });
  }

  function checkIsSelected(service: IServiceListItem) {
    return findIndex(selectedServices, service) !== -1;
  }

  function refetchServices() {
    refetch(getFetchInputParam());
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

  function deleteSelectedServices() {
    const ids = selectedServices.map((ss) => ss.id);

    deleteServices({ variables: { ids } });
    setSelectedServices([]);
  }

  function deleteService(service: IServiceListItem) {
    const id = service.id;
    deleteServices({ variables: { ids: [id] } });
  }

  return (
    <div className={`space-y-5 select-none`}>
      <div className="fic justify-between px-5">
        {/* <SearchInput className="w-1/3" /> */}
        <div className={`fic space-x-3`}>
          {!!selectedServices.length ? (
            <Button
              onClick={fireDeleteServicesAlert}
              loading={deletingServices}
              color="error"
            >
              <TrashCanIcon className={`w-4 h-4 mr-3`} fill={COLORS.WHITE} />
              {t("delete-button-label")}
            </Button>
          ) : (
            <Link href={`${ROUTES.POST_PRODUCT_SERVICE}?target=service`}>
              <Button>
                <DocumentAddIcon className={`w-5 h-5 mr-2`} />
                {t("create-service-button-label")}
              </Button>
            </Link>
          )}

          <Checkbox
            name="select-all-services-checker"
            onChange={handleSelectAllChange}
            checked={
              selectedServices.length > 0 &&
              selectedServices.length === services?.length
            }
            disabled={!services?.length}
            className={`border border-gray py-2 px-4 rounded-sm text-gray`}
            label={t("select-all-label")}
          />

          <Button
            onClick={refetchServices}
            variant="custom"
            className={`border`}
          >
            <ReloadIcon className={`w-4 h-4`} fill={COLORS.GRAY[400]} />
          </Button>
        </div>
      </div>

      <div className={`bg-gray-10 py-3 px-5 fic justify-between`}>
        <div className="fic space-x-2">
          <Typography text={selectedServices.length + ""} color="primary" />
          <Typography color="gray" text={`${t("item-selected-text")}`} />
        </div>

        <Typography
          variant="smallTitle"
          color="gray"
          text={`${t("total-label")}: ${pagination?.dataCount} ${t(
            "services-label"
          )}`}
        />
      </div>

      {!!fetching && <Loading />}

      {!fetching && !!services?.length ? (
        <div className="px-5 grid grid-cols-5 gap-x-10 gap-y-5">
          {services?.map((s) => {
            const { __typename, ...service } = s!;

            const isSelected = checkIsSelected(service as any);
            return (
              <ServiceCard
                onDelete={fireDeleteServiceAlert}
                key={s?.id + "service-list-item"}
                isSelected={isSelected}
                onSelect={handleSelectService}
                service={service as any}
              />
            );
          })}
        </div>
      ) : (
        <NoPosted
          text={t("no-services-yet-text-info")}
          href={`${ROUTES.POST_PRODUCT_SERVICE}?target=service`}
          buttonLabel={t("create-service-button-label")}
        />
      )}

      <Pagination
        totalCount={pagination?.dataCount || 0}
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
