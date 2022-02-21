import React from "react";
import Image from "next/image";
import { usePartnersQuery } from "@graphql/partner.graphql";
import { partners as partnerList } from "./homepage-contents";

interface IPartnerListProps {}

const PartnerList: React.FC<IPartnerListProps> = () => {
  const { data } = usePartnersQuery();
  const partners = data?.partners;

  return (
    <div className={`grid grid-cols-4 gap-x-10 px-24 gap-y-5 mt-8`}>
      {(partners || partnerList)?.map((e) => {
        return (
          <div
            onClick={() => {
              window.open(e.websiteUrl);
            }}
            key={e.logoUrl}
            className={`relative w-52 h-52 cursor-pointer hover:shadow-md`}
          >
            <Image
              src={e.logoUrl}
              alt={e.logoUrl}
              layout="fill"
              objectFit="contain"
            />
          </div>
        );
      })}
    </div>
  );
};
export default PartnerList;
