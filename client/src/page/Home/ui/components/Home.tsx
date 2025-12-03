import type { FC } from "react";

import { TopFilesBar } from "@/widget/TopFilesBar";
import { FilesDisplay } from "@/widget/FilesDisplay";

const Home: FC = () => {
	return (
		<>
			<div className='flex flex-col gap-3'>
				<TopFilesBar />
				<FilesDisplay />
			</div>
		</>
	);
};

export default Home;
