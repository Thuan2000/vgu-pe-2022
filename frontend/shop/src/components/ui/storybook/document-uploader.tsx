import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./button";
import Checkbox from "./checkbox";

export interface IDocumentUploaderProps {
	label?: string;
	subLabel?: string;
}

const DocumentUploader = ({ label, subLabel }: IDocumentUploaderProps) => {
	const { t } = useTranslation("form");

	return (
		<div>
			<label className="block text-body-dark font-semibold text-sm leading-none mb-3">
				{label}
			</label>
			<p className="text-body text-xs mb-2">{subLabel}</p>
			<div className="border-dashed border-2 border-border-base h-36 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none">
				<p className="text-md mt-4 text-center text-green-main">
					<span className="text-accent font-semibold">
						{t("form:drop-zone")}
					</span>
				</p>
			</div>
			<Button
				size="small"
				className="mt-3 bg-blue-secondary px-6 hover:bg-blue-700 active:bg-blue-900"
			>
				I {t("upload-file")}
			</Button>
		</div>
	);
};
export default DocumentUploader;
