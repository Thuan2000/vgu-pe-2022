import React from "react";
import {
  getDocumentPreview,
  IFile,
} from "@components/ui/storybook/document-uploader";
import { trimText } from "@utils/functions";
import { IFile as IServerFile } from "@graphql/types.graphql";

interface IPPSCertificateReviewProps {
  certificates: IFile[] | IServerFile[];
}

const PPSCertificateReview: React.FC<IPPSCertificateReviewProps> = ({
  certificates,
}) => {
  function openDocument(certificate: IFile) {
    window.open(certificate.localUrl);
  }

  return (
    <div className="fic -mt-1 -ml-3 flex-wrap">
      {(certificates as IFile[]).map((c: IFile) => {
        const size = 80;
        return (
          <div
            key={
              c?.name + c?.localUrl + (c as any)?.path + "pps-certificate-item"
            }
            onClick={() => openDocument(c)}
            className="flex mt-2 ml-3 flex-shrink-0 flex-col border rounded-sm items-center justify-center overflow-hidden cursor-pointer relative"
          >
            <div className="w-32 h-32 flex-center rounded-sm border-b">
              {getDocumentPreview(c, { height: size, width: size })}
            </div>
            <p className="py-2">{trimText(c.name, 10)}</p>
          </div>
        );
      })}
    </div>
  );
};
export default PPSCertificateReview;
