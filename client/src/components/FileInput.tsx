import {
	useState,
	type ChangeEvent,
	type FC,
	type PropsWithChildren,
} from "react";

interface FileInputProps extends PropsWithChildren {
	id: string;
}

const FileInput: FC<FileInputProps> = ({ id }) => {
	const [files, setFiles] = useState<File[]>([]);

	function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
		const element = e.target;

		setFiles(Array.from(element.files ?? []));
	}

	return (
		<>
			<label
				className={`block px-4 py-2 border-2 
                    border-stone-400 rounded-md border-dashed`}
				htmlFor={id}
			>
				{files.length ? (
					<ul>
						{files.map((file, index) => (
							<li key={index}>{file.name}</li>
						))}
					</ul>
				) : (
					<p>Выберите файлы</p>
				)}
				<input
					className='hidden'
					type='file'
					id={id}
					name={id}
					multiple
					onChange={onFilesChange}
				/>
			</label>
		</>
	);
};

export default FileInput;
