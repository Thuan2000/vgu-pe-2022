import ArrowLeftIcon from "@assets/icons/arrow-left-icon";
import { IFile, IFileInput } from "@graphql/types.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useTranslation } from "next-i18next";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../storybook/button";
import DocumentInput from "../storybook/document-input";
import Typography from "../storybook/typography";
import * as yup from "yup";
import Form from "@components/form";
import { getCompanyId } from "@utils/functions";
import { useAddAlreadyPaidCompanyMutation } from "@graphql/already-paid.graphql";
import { IAddAlreadyPaidCompanyInput } from "@graphql/types.graphql";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";

type TFormValues = {
  trasnferReceipt: IFile[];
};

const resolver = yup.object({
  transferReceipt: yup.array().min(1, "please-input-the-receipt"),
});

interface ITransferReceiptInputProps {}

const TransferReceiptInput: React.FC<ITransferReceiptInputProps> = ({
  ...props
}) => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(resolver),
  });

  const [addAlreadyPaid] = useAddAlreadyPaidCompanyMutation({
    onCompleted: async (resp) => {
      const success = resp.addAlreadyPaidCompany.success;
      const data = await Swal.fire({
        icon: "success",
        title: t(`already-paid-added-${success ? "success" : "fail"}-title`),
        text: t(`already-paid-added-${success ? "success" : "fail"}-text`),
        confirmButtonText: t(
          `already-paid-added-${success ? "success" : "fail"}-button-label`
        ),
      });

      if (data && success) push(ROUTES.HOMEPAGE);
    },
  });

  function onSubmit(values: TFormValues) {
    const input: IAddAlreadyPaidCompanyInput = {
      companyId: getCompanyId(),
      transferReceipt: values.trasnferReceipt?.[0],
    };

    addAlreadyPaid({ variables: { input } });
  }

  return (
    <div>
      <Typography
        text={t("subs-receipt-input-title")}
        weight="bold"
        size="xl"
        align="center"
      />
      <Typography
        align="center"
        text={t("subs-receipt-input-subtitle")}
        color="gray-400"
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={`mt-2 w-[450px]`}>
          <DocumentInput
            control={control}
            multiple={false}
            onChange={() => {
              trigger("trasnferReceipt");
            }}
            name={"trasnferReceipt"}
            accept={"img/*, application/pdf"}
            inputFileType={"application"}
            error={t((errors.trasnferReceipt as any)?.message || "")}
          />
        </div>
        <Button
          type="submit"
          className={`w-full space-x-2`}
          disabled={!getValues("trasnferReceipt")?.length}
        >
          <Typography
            text={t("send-info-button-label")}
            weight="bold"
            color="white"
          />
          <ArrowLeftIcon className={`rotate-180`} fill="white" />
        </Button>
      </Form>
    </div>
  );
};
export default TransferReceiptInput;
