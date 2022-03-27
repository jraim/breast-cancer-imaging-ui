import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import DicomStage from './containers/DicomStage';

import './styles/cui.css';
import './styles/App.css';

function App() {
    return (
        <div className='App cui flex column jc-space-between'>
            <div className=''>
                <AppHeader />
                <DicomStage />
            </div>
            <div className=''>
                <AppFooter />
            </div>
        </div>
    );
}

export default App;
