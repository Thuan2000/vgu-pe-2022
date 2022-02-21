import Button from "@components/ui/storybook/button";
import { IBuyingRequest } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import {
  useCloseBuyingRequestMutation,
  useOpenBuyingRequestMutation,
} from "@graphql/buying-request.graphql";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import { useModal } from "src/contexts/modal.context";
import OpenBrAlert from "@components/ui/open-br-alert";
import { useRouter } from "next/dist/client/router";

interface IOpenCloseBrProps {
  br: IBuyingRequest;
  onReload?: () => void;
}

const OpenCloseBr: React.FC<IOpenCloseBrProps> = ({ br, onReload }) => {
  const { t } = useTranslation("common");
  const { openModal, closeModal } = useModal();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [closeBuyingRequest, { loading: isClosing }] =
    useCloseBuyingRequestMutation({
      onCompleted: () => {
        if (onReload) onReload();
      },
    });
  const [openBuyingRequest, { loading: isOpening }] =
    useOpenBuyingRequestMutation({
      onCompleted: () => {
        if (onReload) onReload();
      },
    });
  const outsideClickRef = useOutsideClickRef(hideMenu);

  // function showMenu() {
  //   setIsShowMenu(true);
  // }

  function hideMenu() {
    setIsShowMenu(false);
  }

  // function toggleMenu() {
  //   setIsShowMenu(!isShowMenu);
  // }

  async function closeRequest() {
    const { isConfirmed } = await Swal.fire({
      icon: "question",
      title: "close-request-modal-title",
      text: "close-request-modal-message",
      confirmButtonText: "close-request-modal-confirm-button-label",
      confirmButtonColor: COLORS.PRIMARY.DEFAULT,
      cancelButtonText: "close-request-modal-cancel-button-label",
      cancelButtonColor: COLORS.ERROR,
      showCancelButton: true,
    });

    if (isConfirmed)
      closeBuyingRequest({ variables: { id: parseInt(br.id + "") } });
  }

  async function openRequest() {
    openModal(
      (
        <OpenBrAlert
          onConfirm={openBr}
          isLoading={isOpening}
          onClose={closeModal}
        />
      ) as any
    );
  }

  async function openBr(endDate: Date) {
    await openBuyingRequest({
      variables: { id: parseInt(br.id + ""), endDate: endDate.getTime() },
    });
    closeModal();
  }

  function handleClick() {
    if (br.status === "OPEN") closeRequest();
    if (br.status === "CLOSE") openRequest();
  }

  return (
    <div ref={outsideClickRef} className={`mr-7 relative`}>
      <Button
        onClick={handleClick}
        variant="custom"
        className={`border-1 w-full
              text-${br.status === "CLOSE" ? "primary" : "error"}
              border-${br.status === "CLOSE" ? "primary" : "red"}
            `}
      >
        {t(`invert-${br.status}-request`)}
      </Button>
    </div>
  );
};
export default OpenCloseBr;
