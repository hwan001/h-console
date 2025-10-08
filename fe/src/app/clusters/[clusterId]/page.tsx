import Header from "@/app/_components/Header";
import TestButton from "@/app/_components/TestButton";

const ClusterPage = async ({
	params,
}: {
	params: Promise<{ clusterId: string }>;
}) => {
	const { clusterId } = await params;

	return (
		<main>
			<Header />
			<h1>Cluster Page</h1>
			<TestButton
				endpoint={`/clusters/${clusterId}/logs`}
				content="logs 페이지"
			/>
			<TestButton endpoint="/" content="돌아가기" />
		</main>
	);
};

export default ClusterPage;
