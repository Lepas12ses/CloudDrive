import { cva, type VariantProps } from "class-variance-authority";
import {
	useState,
	type ChangeEvent,
	type FC,
	type InputHTMLAttributes,
} from "react";

import cn from "@/util/cn";
import useFieldContext from "./FieldContext";
import fileIcon from "@/assets/icons/file.svg";

const fileInput = cva(
	`block px-4 py-2 border-2 
    border-dashed rounded-md text-(--text)`,
	{
		variants: {
			color: {
				light: "bg-(--bg-light) border-(--bg-dark)",
				normal: "bg-(--bg) border-(--bg-dark)",
				dark: "bg-(--bg-dark) border-(--bg-light)",
			},
		},
		defaultVariants: {
			color: "light",
		},
	}
);

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
	variants?: VariantProps<typeof fileInput>;
}

const FileInput: FC<FileInputProps> = ({ variants, className, ...props }) => {
	const { id } = useFieldContext();
	const [files, setFiles] = useState<File[]>([]);

	function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
		const element = e.target;

		setFiles(Array.from(element.files ?? []));
	}

	const classes = cn(fileInput(variants), className);

	return (
		<label className={classes}>
			{files.length ? (
				<ul>
					{files.map((file, index) => (
						<li key={index}>{file.name}</li>
					))}
				</ul>
			) : (
				<p>Нет файлов</p>
			)}
			<input
				{...props}
				className='hidden'
				type='file'
				id={id}
				name={id}
				onChange={onFilesChange}
			/>
		</label>
	);
};

export default FileInput;
