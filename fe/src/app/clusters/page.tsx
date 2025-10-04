import Header from '../_components/Header';
import TestButton from '../_components/TestButton';

const ClustersPage = () => {
    return (
        <main>
            <Header/>
            <h1>Clusters Page</h1>
            <TestButton endpoint="/" content="돌아가기"/>
        </main>
    );
};

export default ClustersPage;