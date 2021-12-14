import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import DeleteServiceAlert from "@components/ui/delete-service-alert";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import {
  DeleteServicesMutation,
  useDeleteServicesMutation,
} from "@graphql/service.graphql";
import { IService } from "@graphql/types.graphql";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useModal } from "src/contexts/modal.context";
import Swal from "sweetalert2";

interface IEditDeleteServiceProps {
  service: IService;
}

const EditDeleteService: React.FC<IEditDeleteServiceProps> = ({ service }) => {
  const { slug } = service;

  const { t } = useTranslation();
  const { push, replace } = useRouter();
  const { openModal } = useModal();

  const [deleteServices, { loading: deletingServices }] =
    useDeleteServicesMutation({ onCompleted: handleDeletedServices });

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
      replace(`${ROUTES.POSTED_PRODUCT_SERVICE}?target=service`);
    }
  }

  function fireDeleteServiceAlert() {
    openModal(
      (
        <DeleteServiceAlert
          isLoading={deletingServices}
          onDeleteClick={() => deleteService()}
        />
      ) as any
    );
  }

  function deleteService() {
    const id = service.id;
    deleteServices({ variables: { ids: [id] } });
  }

  function editBr() {
    push(`${ROUTES.SERVICES}/${slug}/edit`);
  }

  return (
    <div className={`fic justify-between w-full mb-4`}>
      <Button
        variant="custom"
        className="w-1/2.5 border-2 text-gray"
        onClick={fireDeleteServiceAlert}
      >
        <TrashCanIcon className="mr-2" />
        {t("delete-button-label")}
      </Button>
      <Button className={`w-1/2.5`} onClick={editBr}>
        <PencilIcon className="mr-2" />
        {t("edit-button-label")}
      </Button>
    </div>
  );
};
export default EditDeleteService;
