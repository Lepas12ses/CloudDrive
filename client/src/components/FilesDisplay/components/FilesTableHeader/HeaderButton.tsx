import type { FC, PropsWithChildren } from "react";

interface HeaderButtonProps extends PropsWithChildren {
	onClick?: () => void;
}

const HeaderButton: FC<HeaderButtonProps> = ({ children, onClick }) => {
	return (
		<th>
			<button
				onClick={onClick}
				className={`px-2 h-12 w-full flex justify-end
							items-center rounded-md hover:bg-stone-300`}
			>
				{children}
			</button>
		</th>
	);
};

export default HeaderButton;
