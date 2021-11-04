import { IBuyingRequest, ICreateBidInput } from "@graphql/types.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../storybook/button";
import DateInput, { Datepicker } from "../storybook/inputs/date-input";
import NumberInput, { NumInput } from "../storybook/inputs/number-input";
import TextArea from "../storybook/inputs/text-area";
import Typography from "../storybook/typography";
import * as yup from "yup";
import Form from "@components/form";
import { getCompanyId, getLoggedInUser } from "@utils/functions";
import { CreateBidMutation, useCreateBidMutation } from "@graphql/bid.graphql";
import { useModal } from "src/contexts/modal.context";
import Swal from "sweetalert2";

interface IContactingFormProps {
  br: IBuyingRequest;
}

type BidFormValues = {
  budget: number;
  deliveryDate: Date;
  message?: string;
};

const BiddingSChema = yup.object({
  budget: yup.number().required("budgetRequired-error"),
  deliveryDate: yup.string().required("deliveryDateRequired-error"),
  message: yup.string(),
});

const BiddingForm: React.FC<IContactingFormProps> = ({ br }) => {
  const { t } = useTranslation("form");
  const { closeModal } = useModal();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<BidFormValues>({
    resolver: yupResolver(BiddingSChema),
  });

  const [createBid, { loading: creatingBid, error }] = useCreateBidMutation({
    onCompleted: onCreatedBid,
  });

  function onCreatedBid({
    createBid: { id, message, success },
  }: CreateBidMutation) {
    if (success === true) {
      Swal.fire({
        icon: "success",
        title: t("brBidded-title"),
        text: t("brBidded-text"),
        confirmButtonText: t("brBidded-button-label"),
      });

      closeModal();
    }
  }

  async function onSubmit(e: BidFormValues) {
    const date = new Date(e.deliveryDate).getTime();
    const input: ICreateBidInput = {
      companyId: getCompanyId(),
      buyingRequestId: parseInt(br.id + ""),
      createdById: getLoggedInUser()?.id as number,
      budget: e.budget,
      deliveryDate: date,
      message: e.message,
    };

    await createBid({ variables: { input } });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 space-y-3">
      <Typography
        className="text-center"
        variant="title"
        text={t("biddingTitle")}
      />

      <DateInput
        name="deliveryDate"
        control={control}
        minDate={new Date()}
        maxDate={new Date(br.endDate)}
        label={`${t("bidDeliveryDate-label")}*`}
        placeholderText={t("bidDeliveryDate-placeholder")}
        error={errors?.deliveryDate?.message}
      />
      <NumberInput
        name="budget"
        control={control}
        suffix={` ${t("budget-sign")}`}
        min={br?.minBudget}
        max={br?.maxBudget}
        label={`${t("bidBudget-label")}*`}
        placeholder={t("bidBudget-placeholder")}
        error={errors?.budget?.message}
      />
      <TextArea
        {...register("message")}
        placeholder={t("bidMessage-placeholder")}
        label={t("bidMessage-label")}
        maxLength={150}
        error={errors?.message?.message}
      />

      <div className="flex-center justify-between">
        <Button
          variant="custom"
          className="w-1/2.5 border border-gray-200 text-gray-200"
          size="small"
          type="button"
          onClick={closeModal}
        >
          {t("cancelBidding-button-label")}
        </Button>
        <Button
          loading={creatingBid}
          type="submit"
          className="w-1/2.5"
          size="small"
        >
          {t("confirmBidding-button-label")}
        </Button>
      </div>
    </Form>
  );
};
export default BiddingForm;
