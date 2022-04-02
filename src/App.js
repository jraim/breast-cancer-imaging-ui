import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import DicomStudio from './containers/DicomStudio';

import './styles/cui.css';
import './styles/App.css';

function App() {
    return (
        <div className='App cui flex column jc-space-between'>
            <div>
                <AppHeader />
                <div id='#app-container'>
                    <DicomStudio id='app-container' />
                </div>
            </div>

            <AppFooter />
        </div>
    );
}

export default App;
