import TestButton from '@/app/_components/TestButton';
import Layout from '@/app/_components/Layout';

const SettingsPage = () => {
    return (
        <Layout>
        <main>
            <h1>Settings Page</h1>
            <TestButton endpoint="/" content="돌아가기"/>
        </main>
        </Layout>
    );
};

export default SettingsPage;