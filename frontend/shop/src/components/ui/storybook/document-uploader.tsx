import React, { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDropzone, FileRejection } from "react-dropzone";

import UploadIcon from "@assets/icons/upload-icon";
import Button from "./button";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import DocIcon from "@assets/icons/files/doc-icon";
import ExcelIcon from "@assets/icons/files/excel-icon";
import PdfIcon from "@assets/icons/files/pdf-icon";
import { CloseIcon } from "@assets/icons/close-icon";

export interface IDocumentUploaderProps {
	label?: string;
	subLabel?: string;
	defaultValue?: any;
	multiple?: boolean;
	onChange?: (e: any) => void;
	value?: any;
}

function getDocumentPreview(name: String) {
	const extension = name.split(".").pop()?.toLocaleLowerCase();
	const size = 40;
	if (extension?.includes("pdf"))
		return <PdfIcon width={size} height={size} />;
	else if (extension?.includes("csv") || extension?.includes("xls"))
		return <ExcelIcon width={size} height={size} />;
	else return <DocIcon width={size} height={size} />;
}

const DocumentUploader = ({
	label,
	subLabel,
	multiple,
	onChange,
	value
}: IDocumentUploaderProps) => {
	const { t } = useTranslation("form");
	const [files, setFiles] = useState<any[]>(value || []);
	const [fileUrls, setFileUrls] = useState<string[]>([]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: ".pdf",
		multiple: false,
		onDropRejected: onDropRejected,
		onDrop: async (acceptedFiles) => {
			if (files.length) {
				setFiles([...files, acceptedFiles[0]]);
				const url = URL.createObjectURL(acceptedFiles[0]);
				setFileUrls([...fileUrls, url]);
			} else {
				setFiles(acceptedFiles);
				const url = URL.createObjectURL(acceptedFiles[0]);
				setFileUrls([url]);
			}
		}
	});

	useEffect(() => {
		if (onChange) {
			onChange(files);
		}
	}, [files]);

	function handleDelete(index: number) {
		// @ts-ignore
		files.splice(index, 1);
		fileUrls.splice(index, 1);
		const newFiles = [...files];
		const newUrls = [...fileUrls];
		setFiles(newFiles);
		setFileUrls(newUrls);
		if (onChange) {
			onChange(newFiles);
		}
	}

	const thumbs = files?.map((file, idx) => {
		return (
			<div
				className="inline-flex flex-col border border-border-200 rounded mt-2 me-2 relative"
				key={`${file.name}-${idx}`}
				title={file.name}
			>
				<div
					onClick={() => window.open(fileUrls[idx])}
					className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden cursor-pointer"
				>
					{getDocumentPreview(file.name)}
				</div>
				<button
					className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute -top-1 -right-1 shadow-xl outline-none"
					onClick={() => handleDelete(idx)}
					type="button"
				>
					<CloseIcon width={10} height={10} />
				</button>
			</div>
		);
	});

	function onDropRejected(e: FileRejection[] = []) {
		const { code } = e[0]?.errors[0];

		Swal.fire({
			icon: "error",
			text: t(`form:error-${code}-message`),
			confirmButtonColor: COLORS.GREEN
		});
	}

	return (
		<div>
			<label className="block text-body-dark font-semibold text-sm leading-none mb-1">
				{label}
			</label>
			<p className="text-gray-200 text-xs mb-2">{subLabel}</p>
			<div
				{...getRootProps({
					className:
						"border-dashed border-2 border-border-base h-16 flex-center rounded cursor-pointer focus:border-green focus:outline-none"
				})}
			>
				<input {...getInputProps()} />
				<p className="text-xs text-center text-green-main">
					<span className="text-green font-semibold">
						{t("form:drop-zone")}
					</span>
				</p>
			</div>
			<div>{thumbs?.length > 0 && thumbs}</div>
			<Button
				size="small"
				className="mt-3 bg-blue text-xs px-6 hover:bg-blue-700 active:bg-blue-900"
				type="button"
				{...getRootProps()}
			>
				<UploadIcon className="mr-5" /> {t("upload-file")}
			</Button>
		</div>
	);
};
export default DocumentUploader;
