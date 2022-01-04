import AvatarIcon from "@assets/icons/avatar-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { getDocumentPreview } from "@components/ui/storybook/document-uploader/du-thumb";
import Typography from "@components/ui/storybook/typography";
import {
  ApproveCompanyMutation,
  useApproveCompanyMutation,
} from "@graphql/company.graphql";
import { IUnapprovedCompany } from "@graphql/types.graphql";
import { COLORS } from "@utils/colors";
import { getLoggedInUser } from "@utils/functions";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface IUnapprovedCompanyCardProps {
  company: IUnapprovedCompany;
  onApproved: () => void;
}

const variants = {
  hidden: { opacity: 1, maxHeight: 0 },
  visible: { opacity: 1, maxHeight: 5000 },
};

const UnapprovedCompanyCard: React.FC<IUnapprovedCompanyCardProps> = ({
  company,
  onApproved,
}) => {
  const { t } = useTranslation();
  const { name, licenseFiles, user, licenseNumber } = company;
  const [isShowOwnerDetail, setIsShowOwnerDetail] = useState(false);

  const [approveCompany] = useApproveCompanyMutation({
    onCompleted: handleCompanyApproved,
  });

  function showOwnerInfo() {
    setIsShowOwnerDetail(true);
  }

  function hideOwnerInfo() {
    setIsShowOwnerDetail(false);
  }

  function handleCompanyApproved({
    approveCompany: { success },
  }: ApproveCompanyMutation) {
    if (success) {
      Swal.fire({
        icon: "success",
        title: t("companyApproved-success-message"),
      });

      onApproved();
    }
  }

  async function handleApproveClick() {
    const { isDenied } = await Swal.fire({
      title: t("approve-company-title"),
      text: t("approve-company-message"),
      // This meant to be reversed
      denyButtonText: t("approve-company"),
      denyButtonColor: COLORS.PRIMARY.DEFAULT,
      confirmButtonText: t("cancel-button-label"),
      confirmButtonColor: COLORS.ERROR,
      showDenyButton: true,
    });

    if (isDenied) {
      approveCompany({
        variables: {
          id: company.id,
          approverId: parseInt(getLoggedInUser()?.id + ""),
        },
      });
    }
  }

  function handleDisapproveClick() {}
  return (
    <div
      className={`p-2 justify-between fic shadow-md space-x-4 bg-white w-full`}
    >
      {/* <div className={`relative w-[55px] h-[55px] flex-shrink-0`}>
                <Image
                  src={siteSettings.companyProfileImagePlaceholder}
                  alt="Good"
                  layout="fill"
                />
              </div> */}
      <div className={`space-y-1 `}>
        <div className="fic space-x-1">
          <Typography text={name} variant="title" />

          <div className="relative">
            <div
              className="p-1"
              onMouseLeave={hideOwnerInfo}
              onMouseEnter={showOwnerInfo}
            >
              <AvatarIcon />
            </div>

            {isShowOwnerDetail && (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                className={`overflow-hidden p-3 rounded-sm absolute bg-black z-50 bg-opacity-70 !text-white duration-200`}
              >
                <Typography
                  size="lg"
                  text={t("owner-text")}
                  className={`font-semibold text-white`}
                />

                <div className={`fic space-x-2`}>
                  <Typography
                    className={`flex-shrink-0`}
                    text={`${t("name-text")} : `}
                  />
                  <Typography
                    className={"font-semibold text-white"}
                    text={`${user.firstName} ${user.lastName}`}
                  />
                </div>
                <div className={`fic space-x-2`}>
                  <Typography
                    className={`flex-shrink-0`}
                    text={`${t("email-text")} : `}
                  />
                  <Typography
                    className={"font-semibold text-white"}
                    text={user.email}
                  />
                </div>
                <div className={`fic space-x-2`}>
                  <Typography
                    className={`flex-shrink-0`}
                    text={`${t("phone-text")} : `}
                  />
                  <Typography
                    className={"font-semibold text-white"}
                    text={user.phoneNumber}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div>
          <div className="fic space-x-2">
            <Typography
              text={`${t("registration-code")}: `}
              variant="question"
            />
            <Typography text={licenseNumber} />
          </div>
          <div className="">
            {licenseFiles.map((lf) => {
              return (
                <Link target={"_blank"} rel="noopener" href={lf.url}>
                  {getDocumentPreview(lf as any)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`fic space-x-5`}>
        <Button onClick={handleApproveClick}>{t("approve-company")}</Button>
        {/* <Button onClick={handleDisapproveClick} color="error">
          {t("disapprove-company")}
        </Button> */}
      </div>
    </div>
  );
};
export default UnapprovedCompanyCard;
