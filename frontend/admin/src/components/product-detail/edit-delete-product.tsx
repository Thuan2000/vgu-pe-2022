import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import DeleteProductAlert from "@components/ui/delete-product-alert";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import {
  DeleteProductsMutation,
  useDeleteProductsMutation,
} from "@graphql/product.graphql";
import { IProduct } from "@graphql/types.graphql";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useModal } from "src/contexts/modal.context";
import Swal from "sweetalert2";

interface IEditDeleteProductProps {
  product: IProduct;
}

const EditDeleteProduct: React.FC<IEditDeleteProductProps> = ({ product }) => {
  const { slug } = product;

  const { t } = useTranslation();
  const { push, replace } = useRouter();
  const { openModal } = useModal();

  const [deleteProducts, { loading: deletingProducts }] =
    useDeleteProductsMutation({ onCompleted: handleDeletedProducts });

  async function handleDeletedProducts({
    deleteProducts: { message, success },
  }: DeleteProductsMutation) {
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
      replace(`${ROUTES.POSTED_PRODUCT_SERVICE}?target=product`);
    }
  }

  function fireDeleteProductAlert() {
    openModal(
      (
        <DeleteProductAlert
          isLoading={deletingProducts}
          onDeleteClick={() => deleteProduct()}
        />
      ) as any
    );
  }

  function deleteProduct() {
    const id = product.id;
    deleteProducts({ variables: { ids: [id] } });
  }

  function editBr() {
    push(`${ROUTES.PRODUCTS}/${slug}/edit`);
  }

  return (
    <div className={`fic justify-between w-full mb-4`}>
      <Button
        variant="custom"
        className="w-1/2.5 border-2 text-gray"
        onClick={fireDeleteProductAlert}
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
export default EditDeleteProduct;
