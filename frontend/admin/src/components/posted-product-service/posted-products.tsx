import DocumentAddIcon from "@assets/icons/document-add-icon";
import ReloadIcon from "@assets/icons/reload-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import NoPosted from "@components/posted-tenders/no-tenders";
import SearchInput from "@components/search-input";
import DeleteProductAlert from "@components/ui/delete-product-alert";
import Link from "@components/ui/link";
import Loading from "@components/ui/loading";
import Pagination from "@components/ui/pagination";
import Button from "@components/ui/storybook/button";
import Checkbox from "@components/ui/storybook/checkbox";
import Typography from "@components/ui/storybook/typography";
import {
  DeleteProductsMutation,
  useDeleteProductsMutation,
  useProductsQuery,
} from "@graphql/product.graphql";
import { IProductListItem } from "@graphql/types.graphql";
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
import ProductCard from "./product-card";

interface IPostedProductsProps {}

const SERVICES_GET_LIMIT = 8;

const PostedProducts: React.FC<IPostedProductsProps> = ({}) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const activePageIdx = parseInt((query.idx as string) || "1");

  const {
    data,
    loading: fetching,
    refetch,
  } = useProductsQuery({
    notifyOnNetworkStatusChange: true,
    variables: getFetchInputParam(),
  });

  const { openModal } = useModal();
  const [deleteProducts, { loading: deletingProducts }] =
    useDeleteProductsMutation({ onCompleted: handleDeletedProducts });

  const [selectedProducts, setSelectedProducts] = useState<IProductListItem[]>(
    []
  );
  const { data: products, pagination } = data?.products || {};

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
        titleText: t(`form:products-deleted-title`),
        text: t(`form:products-deleted-message`),
        confirmButtonText: t(`form:okay-button-label`),
      });
      toast.success(t("form:products-deleted-title"));
      if (isDismissed || isConfirmed) refetchProducts();
    }
  }

  function fireDeleteProductsAlert() {
    openModal(
      (
        <DeleteProductAlert
          isLoading={deletingProducts}
          onDeleteClick={deleteSelectedProducts}
        />
      ) as any
    );
  }

  function fireDeleteProductAlert(product: IProductListItem) {
    openModal(
      (
        <DeleteProductAlert
          isLoading={deletingProducts}
          onDeleteClick={() => deleteProduct(product)}
        />
      ) as any
    );
  }

  function handlePaginationChange(idx: number) {
    const { pathname } = router;

    router.replace({ pathname, query: { ...query, idx } });
  }

  function checkIsSelected(product: IProductListItem) {
    return findIndex(selectedProducts, product) !== -1;
  }

  function refetchProducts() {
    refetch(getFetchInputParam());
  }

  function handleSelectProduct(isChecked: boolean, product: IProductListItem) {
    if (isChecked) setSelectedProducts([...selectedProducts, product]);
    else {
      remove(selectedProducts, ({ id }) => product.id === id);
      setSelectedProducts([...selectedProducts]);
    }
  }

  function handleSelectAllChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const productsWithoutTypename = products?.map(
        ({ __typename, ...s }: any) => s
      );
      setSelectedProducts(productsWithoutTypename!);
    } else setSelectedProducts([]);
  }

  function deleteSelectedProducts() {
    const ids = selectedProducts.map((ss) => ss.id);

    deleteProducts({ variables: { ids } });
    setSelectedProducts([]);
  }

  function deleteProduct(product: IProductListItem) {
    const id = product.id;
    deleteProducts({ variables: { ids: [id] } });
  }

  return (
    <div className={`space-y-5 select-none`}>
      <div className="fic justify-between px-5">
        {/* <SearchInput className="w-1/3" /> */}
        <div className={`fic space-x-3`}>
          {!!selectedProducts.length ? (
            <Button
              onClick={fireDeleteProductsAlert}
              loading={deletingProducts}
              color="error"
            >
              <TrashCanIcon className={`w-4 h-4 mr-3`} fill={COLORS.WHITE} />
              {t("delete-button-label")}
            </Button>
          ) : (
            <Link href={`${ROUTES.POST_PRODUCT_SERVICE}?target=product`}>
              <Button>
                <DocumentAddIcon className={`w-5 h-5 mr-2`} />
                {t("create-product-button-label")}
              </Button>
            </Link>
          )}

          <Checkbox
            name="select-all-products-checker"
            onChange={handleSelectAllChange}
            checked={
              selectedProducts.length > 0 &&
              selectedProducts.length === products?.length
            }
            disabled={!products?.length}
            className={`border border-gray py-2 px-4 rounded-sm text-gray`}
            label={t("select-all-label")}
          />

          <Button
            onClick={refetchProducts}
            variant="custom"
            className={`border`}
          >
            <ReloadIcon className={`w-4 h-4`} fill={COLORS.GRAY[400]} />
          </Button>
        </div>
      </div>

      <div className={`bg-gray-10 py-3 px-5 fic justify-between`}>
        <div className="fic space-x-2">
          <Typography text={selectedProducts.length + ""} color="primary" />
          <Typography color="gray" text={`${t("item-selected-text")}`} />
        </div>

        <Typography
          variant="smallTitle"
          color="gray"
          text={`${t("total-label")}: ${pagination?.dataCount} ${t(
            "products-label"
          )}`}
        />
      </div>

      {!!fetching && <Loading />}

      {!fetching && !!products?.length ? (
        <div className="px-5 grid grid-cols-5 gap-x-10 gap-y-5">
          {products?.map((s) => {
            const { __typename, ...product } = s!;

            const isSelected = checkIsSelected(product as any);
            return (
              <ProductCard
                onDelete={fireDeleteProductAlert as any}
                key={product?.id + "product-list-item"}
                isSelected={isSelected}
                onSelect={handleSelectProduct as any}
                product={product as any}
              />
            );
          })}
        </div>
      ) : (
        <NoPosted
          text={t("no-products-yet-text-info")}
          href={`${ROUTES.POST_PRODUCT_SERVICE}?target=product`}
          buttonLabel={t("create-product-button-label")}
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
export default PostedProducts;
