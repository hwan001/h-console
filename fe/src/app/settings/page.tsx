import Header from '../_components/Header';
import TestButton from '../_components/TestButton';

const SettingsPage = () => {
    return (
        <main>
            <Header/>
            <h1>Settings Page</h1>
            <TestButton endpoint="/" content="돌아가기"/>
        </main>
    );
};

export default SettingsPage;