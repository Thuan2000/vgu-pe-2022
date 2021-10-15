import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import DeleteBrAlert from "@components/ui/delete-br-alert";
import Button from "@components/ui/storybook/button";
import { useDeleteBuyingRequestMutation } from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "src/contexts/modal.context";

interface IEditDeleteButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
}

const EditDeleteButton: React.FC<IEditDeleteButtonProps> = ({
  br,
  ...props
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { closeModal } = useModal();
  const [deleteBrMutation, { loading }] = useDeleteBuyingRequestMutation({
    onCompleted: ({ deleteBuyingRequest }) => {
      const { success, message } = deleteBuyingRequest;
      if (success) router.replace(ROUTES.POSTED_REQUESTS);
      else alert(message);
    },
  });
  const { openModal } = useModal();

  function onDelete() {
    deleteBrMutation({ variables: { id: parseInt(br.id) } });
  }

  function handleClose() {
    closeModal();
  }

  function deleteBr() {
    openModal(
      (<DeleteBrAlert onDeleteClick={onDelete} isLoading={loading} />) as any
    );
  }

  return (
    <div {...props}>
      <div className="flex justify-between">
        <button
          className="w-1/2.5 border-2 border-gray-200 text-gray-200 rounded-md flex-center"
          onClick={deleteBr}
        >
          <TrashCanIcon className="mr-2" />
          <p>{t("delete-button-label")}</p>
        </button>
        <Button className="w-1/2.5">
          <PencilIcon className="mr-2" />
          {t("edit-button-label")}
        </Button>
      </div>
    </div>
  );
};
export default EditDeleteButton;
