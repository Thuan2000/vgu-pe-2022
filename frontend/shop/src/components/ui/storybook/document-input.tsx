import React from "react";

import { Controller } from "react-hook-form";
import DocumentUploader from "./document-uploader";
import ValidationError from "./validation-error";

interface DocumentInputProps {
	control: any;
	name: string;
	label?: string;
	subLabel?: string;
	multiple?: boolean;
	error?: string;
}

const DocumentInput = ({
	control,
	name,
	error,
	label,
	subLabel,
	multiple = true
}: DocumentInputProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { ref, ...rest } }) => (
				<>
					<DocumentUploader
						{...rest}
						// multiple={multiple}
						label={label}
						subLabel={subLabel}
					/>
					<ValidationError message={error} />
				</>
			)}
		/>
	);
};

export default DocumentInput;
