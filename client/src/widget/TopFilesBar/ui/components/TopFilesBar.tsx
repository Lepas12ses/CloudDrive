import { memo, type FC } from "react";

import Button from "@/shared/ui/components/Button";
import UplodaModal from "./UploadModal/UploadModal";
import SearchField from "./SearchField";
import Container from "@/shared/ui/components/Container";
import TopFilesBarSkeleton from "./TopFilesBarSkeleton";
import useVisibility from "@/shared/lib/hooks/useVisibility";

const TopFilesBarComponent: FC = memo(() => {
	const {
		isVisible: isModalVisible,
		show: showModal,
		hide: hideModal,
	} = useVisibility();

	return (
		<>
			<UplodaModal open={isModalVisible} onClose={hideModal} />
			<Container
				variants={{ shadow: "s" }}
				className='flex items-center justify-between gap-2 rounded-md'
			>
				<SearchField />

				<Button onClick={showModal} className='rounded-full'>
					Загрузить
				</Button>
			</Container>
		</>
	);
});

type TopFilesBarType = typeof TopFilesBarComponent & {
	Skeleton: typeof TopFilesBarSkeleton;
};

const TopFilesBar = TopFilesBarComponent as TopFilesBarType;

TopFilesBar.Skeleton = TopFilesBarSkeleton;

export default TopFilesBar;
