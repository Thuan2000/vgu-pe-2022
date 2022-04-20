import { ICompany, IFile } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";

import React from "react";
import Typography from "../storybook/typography";
import Image from "next/image";
import ChatNowButton from "../chat-now-button";
import ImagePreview from "../image-preview";
import { useModal } from "src/contexts/modal.context";

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
    <div className={`border relative rounded-md pb-5`}>
      <div className="relative">
        <div
          style={{ background: "#f4f4f4" }}
          className="relative rounded-t-md overflow-hidden w-full h-56 cursor-pointer"
          onClick={handleCoverClick}
        >
          <Image
            alt={settings?.coverImage?.fileName + "image-preview"}
            src={settings?.coverImage?.url || siteSettings.placeholderImage}
            layout="fill"
            objectFit="contain"
          />
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
      <div className="flex flex-row justify-end mt-4">
        <div className="mr-3">
          <ChatNowButton company={company as any} />
        </div>
      </div>
      <div className={`pt-10 px-12 grid grid-cols-3`}>
        <div>
          <Typography
            text={company?.name as string}
            variant="BRTitle"
            className="mb-1"
          />
          <Typography
            text={`${t("companyTotalEmployee-text")}: ${
              company?.settings?.employeeAmount || t("not-setup")
            }`}
            variant="smallTitle"
            color="gray-400"
            className="mb-3"
          />
        </div>

        {settings?.gallery && settings?.gallery?.length > 0 && (
          <div className="flex space-x-5 justify-end items-center w-full col-span-2">
            {settings?.gallery?.slice(0, imageAmount).map((g) => {
              return (
                <div
                  key={g.url}
                  className={`relative flex-shrink-0 w-28 h-28 rounded-md overflow-hidden cursor-pointer`}
                  onClick={() => {
                    handleGalleryItemClick(g.url);
                  }}
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
