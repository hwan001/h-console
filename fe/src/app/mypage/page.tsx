import Header from '../_components/Header';
import TestButton from '../_components/TestButton';

const MyPage = () => {
    return (
        <main>
            <Header/>
            <h1>My Page</h1>
            <p>Welcome to your personal page.</p>
            {/* Add more content here */}
            <TestButton endpoint="/" content="돌아가기"/>
        </main>
    );
};

export default MyPage;