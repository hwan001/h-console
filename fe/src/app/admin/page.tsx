import Header from "@/app/_components/Header";
import TestButton from "@/app/_components/TestButton";

const AdminPage = ({
}) => {
    return (
        <main>
            <Header />
            <h1>Admin page</h1>
            <TestButton endpoint="/" content="돌아가기" />
        </main>
    );
};

export default AdminPage;
