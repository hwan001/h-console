import Image from "next/image";
import TestButton from "./_components/TestButton";
import Header from "./_components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<TestButton endpoint="/mypage" content="mypage" />
		</>
	);
}
