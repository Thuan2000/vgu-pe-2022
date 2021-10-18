import BuyingRequestHeader from "@components/posted-requests/buying-request/brc-header";
import BuyingRequestCard from "@components/posted-requests/buying-request/buying-request-card";
import PostedRequestsNav from "@components/posted-requests/posted-requests-nav";
import Loading from "@components/ui/loading";
import Pagination from "@components/ui/pagination";
import { useBuyingRequestsAndCountQuery } from "@graphql/buying-request.graphql";
import { IBuyingRequest, IProject } from "@graphql/types.graphql";
import { getMeData } from "@utils/auth-utils";
import { BUYING_REQUESTS_GET_LIMIT } from "@utils/constants";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BuyingRequestContextProvider,
  useBRContext,
} from "src/contexts/buying-request.context";
import NoBuyingRequests from "@components/posted-requests/no-buying-requests";
import CreateProject from "@components/create-project";
import { findIndex } from "lodash";
import { getCompanyId } from "@utils/functions";
import { useModal } from "src/contexts/modal.context";
import AddToProject from "@components/ui/add-to-project";

interface IBuyingRequestsProps extends React.HTMLAttributes<HTMLDivElement> {}

function getParameter(companyId: number, offset: number) {
  return { variables: { companyId, offset } };
}

const BuyingRequests: React.FC<IBuyingRequestsProps> = () => {
  // Modal Context
  const { openModal, closeModal } = useModal();

  // Data fetching
  const { query, ...router } = useRouter();
  const activePageIdx = parseInt((query?.page as string) || "1");

  useEffect(() => {
    function doFetchMore() {
      if (activePageIdx === 1) return;
      if (activePageIdx <= previousPageIdx) return;
      setPreviousPageIdx(activePageIdx);

      fetchMore({
        ...getParameter(getCompanyId(), getOffset()),
      });
    }
    doFetchMore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageIdx, getCompanyId()]);

  const [previousPageIdx, setPreviousPageIdx] = useState<number>(-1);
  const { data, loading, fetchMore } = useBuyingRequestsAndCountQuery({
    ...getParameter(getCompanyId(), getOffset()),
  });

  const [selectedBrs, setSelectedBrs] = useState<IBuyingRequest[]>([]);

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

  const totalBRs = data?.buyingRequestsAndCount.totalDataCount;

  if (loading) return <Loading />;

  if (!data?.buyingRequestsAndCount?.buyingRequests?.length)
    return <NoBuyingRequests />;
  const brs = data?.buyingRequestsAndCount?.buyingRequests as IBuyingRequest[];

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
    setSelectedBrs([]);
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

  return (
    <>
      <BuyingRequestHeader
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
              onSelectChange={(e) => handleSelectChange(e, br)}
              br={br}
              selecteds={selectedBrs}
              setSelecteds={setSelectedBrs}
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
        color="gray-200"
        activeColor="primary"
        displayPageAmount={5}
        limit={BUYING_REQUESTS_GET_LIMIT}
      />
    </>
  );
};
export default BuyingRequests;
