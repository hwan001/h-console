import Header from "@/app/_components/Header";
import TestButton from "@/app/_components/TestButton";
import LogViewer from "./components/LogViewer";

const LogsPage = async ({
	params,
}: {
	params: Promise<{ clusterId: string }>;
}) => {
	const { clusterId } = await params;
	return (
		<main>
			<Header />
			<h1>logs Page</h1>
			<LogViewer clusterId={`${clusterId}`} />
			<TestButton endpoint="/clusters" content="이전 페이지 돌아가기" />
		</main>
	);
};

export default LogsPage;
