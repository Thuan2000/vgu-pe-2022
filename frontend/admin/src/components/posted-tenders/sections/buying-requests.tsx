import BuyingRequestHeader from "@components/posted-tenders/buying-request/brc-header";
import BuyingRequestCard from "@components/posted-tenders/buying-request/buying-request-card";

import Loading from "@components/ui/loading";
import Pagination from "@components/ui/pagination";
import {
  DeleteBuyingRequestsMutation,
  useBuyingRequestsQuery,
  useDeleteBuyingRequestMutation,
  useDeleteBuyingRequestsMutation,
} from "@graphql/buying-request.graphql";
import { IBuyingRequest, IProject } from "@graphql/types.graphql";
import { BUYING_REQUESTS_GET_LIMIT } from "@utils/constants";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import NoPosted from "@components/posted-tenders/no-tenders";
import CreateProject, { CPBR } from "@components/create-project";
import { findIndex } from "lodash";
import { getCompanyId } from "@utils/functions";
import { useModal } from "src/contexts/modal.context";
import AddToProject from "@components/ui/add-to-project";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@assets/icons/plus-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { IExtraMenu } from "../buying-request/buying-request-card/buying-request-card";
import DeleteBrAlert from "@components/ui/delete-br-alert";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ROUTES } from "@utils/routes";

interface IBuyingRequestsProps extends React.HTMLAttributes<HTMLDivElement> {}

function getParameter({ offset }: { offset: number }): any {
  return {
    companyId: getCompanyId(),
    input: {
      offset,
      limit: BUYING_REQUESTS_GET_LIMIT,
    },
  };
}

const BuyingRequests: React.FC<IBuyingRequestsProps> = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();

  const [deleteBrs, { loading: deleting }] = useDeleteBuyingRequestsMutation({
    notifyOnNetworkStatusChange: true,
    onCompleted: handleDeletedBrs,
  });

  async function handleDeletedBrs({
    deleteBuyingRequests: { message, success },
  }: DeleteBuyingRequestsMutation) {
    if (!success) {
      Swal.fire({
        icon: "error",
        titleText: t(`form:error-${message}-title`),
        text: t(`form:error-${message}-message`),
        confirmButtonText: t(`form:error-${message}-button`),
      });
    } else {
      const { isDismissed } = await Swal.fire({
        icon: "success",
        titleText: t(`form:services-deleted-title`),
        text: t(`form:services-deleted-message`),
        confirmButtonText: t(`form:okay-button-label`),
      });
      toast.success(t("form:services-deleted-title"));

      if (isDismissed)
        refetch({
          companyId: getCompanyId(),
          input: { limit: BUYING_REQUESTS_GET_LIMIT, offset: getOffset() },
        });
    }
  }

  function deleteSelectedBrs() {
    const selectedBrIds = selectedBrs.map((br) => parseInt(br.id));

    deleteBrs({ variables: { ids: selectedBrIds } });
  }

  // Data fetching
  const { query, ...router } = useRouter();
  const activePageIdx = parseInt((query?.page as string) || "1");

  useEffect(() => {
    function doFetchMore() {
      if (activePageIdx === 1) return;
      if (activePageIdx <= previousPageIdx) return;
      setPreviousPageIdx(activePageIdx);

      fetchMore({ variables: getParameter({ offset: getOffset() }) });
    }

    doFetchMore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageIdx, getCompanyId()]);

  const [previousPageIdx, setPreviousPageIdx] = useState<number>(-1);
  const { data, loading, fetchMore, refetch } = useBuyingRequestsQuery({
    variables: getParameter({ offset: getOffset() }),
  });

  async function onDelete(br: IBuyingRequest) {
    await deleteBrs({ variables: { ids: [parseInt(br.id)] } });
  }

  function handleDeleteSelectedBrsClick() {
    openModal(
      (
        <DeleteBrAlert isLoading={deleting} onDeleteClick={deleteSelectedBrs} />
      ) as any
    );
  }

  function handleDeleteBrClick(br: IBuyingRequest) {
    openModal(
      (
        <DeleteBrAlert
          isLoading={deleting}
          onDeleteClick={() => onDelete(br)}
        />
      ) as any
    );
  }
  const [selectedBrs, setSelectedBrs] = useState<IBuyingRequest[]>([]);
  // Called from br card
  const [isOpenSelectProject, setIsOpenSelectProject] = useState(false);

  useEffect(() => {
    if (isOpenSelectProject) {
      let brId;
      if (selectedBrs.length === 1) brId = selectedBrs[0].id;
      openModal(
        (
          <AddToProject
            brId={brId}
            onNewClick={handleCreateProject}
            onProjectClick={handleProjectClick}
          />
        ) as any,
        {
          onClose: () => setSelectedBrs([]),
        }
      );
      setIsOpenSelectProject(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSelectProject]);

  function handlePageChange(newIdx: number) {
    const { pathname } = router;

    router.replace({
      pathname,
      query: { ...query, page: newIdx },
    });
  }

  function getOffset() {
    return (activePageIdx - 1) * BUYING_REQUESTS_GET_LIMIT;
  }

  const totalBRs = data?.adminBuyingRequests?.pagination.dataCount;

  if (loading) return <Loading />;

  if (!data?.adminBuyingRequests?.data?.length)
    return (
      <NoPosted
        text={t("no-buying-request-yet-text-info")}
        href={ROUTES.POST_REQUEST}
        buttonLabel={t("create-post-button-label")}
      />
    );
  const brs = data?.adminBuyingRequests?.data as IBuyingRequest[];

  function removeFromSelecteds(br: IBuyingRequest) {
    const index = findIndex(
      selectedBrs,
      (selected: any) => selected.id === br.id
    );
    if (index === -1) return;

    selectedBrs.splice(index, 1);
    const newSelecteds: any = [...selectedBrs];
    setSelectedBrs(newSelecteds);
  }

  function addToSelecteds(br: IBuyingRequest) {
    const index = findIndex(
      selectedBrs,
      (selected: any) => selected.id === br.id
    );

    if (index !== -1) return;

    const newSelecteds: any = [...selectedBrs, br];
    setSelectedBrs(newSelecteds);
  }

  function handleSelectChange(
    e: ChangeEvent<HTMLInputElement>,
    br: IBuyingRequest
  ) {
    if (e.target.checked) addToSelecteds(br);
    else if (!e.target.checked) removeFromSelecteds(br);
  }

  function handleOnCreateProjectClose() {
    // Filter all unchecked, and all alreadyAdded
    const filteredBrs = selectedBrs.filter(
      (br: CPBR) => br.alreadyAdded !== true && br.unChecked !== true
    );

    setSelectedBrs([...filteredBrs]);
  }

  function handleCreateProject() {
    openModal(
      (
        <CreateProject
          selectedBrs={selectedBrs}
          setSelectedBrs={setSelectedBrs}
        />
      ) as any,
      { onClose: handleOnCreateProjectClose }
    );
  }

  function handleProjectClick(project: IProject) {
    openModal(
      (
        <CreateProject
          initValue={project}
          selectedBrs={selectedBrs}
          setSelectedBrs={setSelectedBrs}
        />
      ) as any,
      { onClose: handleOnCreateProjectClose }
    );
  }

  function handleAddToProjectClick() {
    let brId;

    if (selectedBrs.length === 1) brId = selectedBrs[0].id;

    openModal(
      (
        <AddToProject
          brId={brId}
          onNewClick={handleCreateProject}
          onProjectClick={handleProjectClick}
        />
      ) as any
    );
  }

  function handleBrCardAddToProjectClick(br: IBuyingRequest) {
    setSelectedBrs([br]);
    setIsOpenSelectProject(true);
  }

  const brCardExtraMenus: IExtraMenu[] = [
    {
      label: t("addToProject-button-label"),
      icon: PlusIcon,
      onClick: handleBrCardAddToProjectClick,
    },
    {
      label: t("delete-button-label"),
      icon: TrashCanIcon,
      onClick: handleDeleteBrClick,
    },
  ];

  function isBrSelected(br: IBuyingRequest) {
    const indexOnSelecteds = findIndex(
      selectedBrs,
      (selected) => selected.id === br.id
    );
    const isSelected =
      indexOnSelecteds !== -1 &&
      !(selectedBrs?.at(indexOnSelecteds) as any)?.unChecked === true;

    return isSelected;
  }

  return (
    <>
      <BuyingRequestHeader
        onDeleteBrClick={handleDeleteSelectedBrsClick}
        selecteds={selectedBrs}
        onAddToProjectClick={handleAddToProjectClick}
        setSelecteds={setSelectedBrs}
        brs={brs}
      />
      <div className="mt-4 mx-4 md:flex flex-wrap justify-between">
        {brs?.map((br: IBuyingRequest) => {
          if (!br) return;
          return (
            <BuyingRequestCard
              extraMenus={brCardExtraMenus}
              onSelectChange={(e) => handleSelectChange(e, br)}
              br={br}
              postedTextLabel={t("posted-label")}
              isSelected={isBrSelected(br)}
              key={br?.name + br?.endDate + ""}
              className="mb-3"
            />
          );
        })}
      </div>
      <Pagination
        align="end"
        activeIdx={activePageIdx}
        onChangePage={handlePageChange}
        totalCount={totalBRs || 1}
        color=""
        activeColor="primary"
        displayPageAmount={5}
        limit={BUYING_REQUESTS_GET_LIMIT}
      />
    </>
  );
};
export default BuyingRequests;
