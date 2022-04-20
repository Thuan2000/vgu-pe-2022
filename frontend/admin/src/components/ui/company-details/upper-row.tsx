import PencilIcon from "@assets/icons/pencil-icon";
import { ICompany, IFile } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import React from "react";
import Button from "../storybook/button";
import Typography from "../storybook/typography";
import Image from "next/image";
import { ROUTES } from "@utils/routes";
import Link from "../link";
import { useModal } from "src/contexts/modal.context";
import ImagePreview from "../image-preview";

interface ICDUpperRowProps {
  company: ICompany;
}

const CDUpperRow: React.FC<ICDUpperRowProps> = ({ company }) => {
  const { t } = useTranslation();
  const { settings } = company;
  const imageAmount = 4;

  const { openModal } = useModal();

  function openImage(
    defaultActiveUrl: string,
    images?: IFile[],
    settings?: { isOriginalSize: boolean }
  ) {
    openModal(
      (
        <ImagePreview
          defaultActiveUrl={defaultActiveUrl}
          images={images || []}
          isOriginalSize={settings?.isOriginalSize}
        />
      ) as any
    );
  }

  function handleCoverClick() {
    if (!settings?.coverImage?.url) return;
    openImage(settings?.coverImage?.url, [], {
      isOriginalSize: true,
    });
  }

  function handleProfileClick() {
    if (!settings?.profileImage?.url) return;
    openImage(settings?.profileImage?.url, [settings?.profileImage]);
  }

  function handleGalleryItemClick(defaultActiveUrl: string) {
    openImage(defaultActiveUrl, settings?.gallery || []);
  }

  return (
    <div className={`border relative rounded-md pb-5 select-none`}>
      <div className="relative">
        <div
          style={{ background: "#f4f4f4" }}
          className="relative rounded-t-md overflow-hidden w-full h-56"
        >
          <Link href={`/${ROUTES.COMPANY_DETAIL}/edit`}>
            <Button
              className={`z-20 top-5 right-10 absolute px-10`}
              size="small"
            >
              <PencilIcon className={`mr-3`} />
              {t("edit-button-label")}
            </Button>
          </Link>
          <div onClick={handleCoverClick} className={`cursor-pointer`}>
            <Image
              alt={settings?.coverImage?.fileName + "image-preview"}
              src={settings?.coverImage?.url || siteSettings.placeholderImage}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div
          style={{ background: "#f4f4f4" }}
          className="-bottom-20 left-12 absolute w-44 h-44 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            alt={settings?.coverImage?.fileName + "image-preview"}
            src={settings?.profileImage?.url || siteSettings.placeholderImage}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={`pt-24 px-12 grid grid-cols-3`}>
        <div>
          <Typography text={company?.name as string} variant="title" />
          <Typography
            text={`${t("companyTotalEmployee-text")}: ${
              company?.settings?.employeeAmount || t("not-setup")
            }`}
            variant="smallTitle"
            color="gray-400"
          />
        </div>

        {settings?.gallery && settings?.gallery?.length > 0 && (
          <div className="grid col-span-2 grid-cols-5 gap-x-5">
            {settings?.gallery?.slice(0, imageAmount).map((g) => {
              return (
                <div
                  key={g.url}
                  className={`relative flex-shrink-0 w-28 h-28 rounded-md overflow-hidden`}
                  onClick={() => handleGalleryItemClick(g.url)}
                >
                  <Image
                    src={g.url}
                    layout="fill"
                    alt={g.fileName + "gallery-preview"}
                  />
                </div>
              );
            })}
            {settings?.gallery?.length >= 5 && (
              <div
                key={settings?.gallery[imageAmount].url}
                className={`relative flex-shrink-0 w-28 h-28 rounded-md overflow-hidden`}
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 right-0 z-10 bg-black bg-opacity-60 text-white flex-center`}
                >
                  +{settings.gallery.length - imageAmount}
                </div>
                <Image
                  src={settings?.gallery[imageAmount].url}
                  layout="fill"
                  alt={
                    settings?.gallery[imageAmount].fileName + "gallery-preview"
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CDUpperRow;
