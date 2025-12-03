import type { FC, PropsWithChildren } from "react";

interface HeaderButtonProps extends PropsWithChildren {
	onClick?: () => void;
}

const HeaderButton: FC<HeaderButtonProps> = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`px-2 h-12 w-full flex justify-end
						items-center rounded-md hover:bg-(--bg-dark) transition-colors`}
		>
			{children}
		</button>
	);
};

export default HeaderButton;
