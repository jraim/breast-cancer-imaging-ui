import React, { Component } from 'react';
import AboutDataset from '../AboutDataset';

const styles = {
    bar: {
        backgroundColor: '#394648',
        height: '8px',
        width: '80vw',
    },
    datasetReference: {
        width: '80vw',
        fontSize: '8pt',
    },
};

export default class AppFooter extends Component {
    render() {
        return (
            <div className='cui flex column ai-center'>
                <div style={styles.bar}></div>
                <AboutDataset width='80' fontSize='8' />
            </div>
        );
    }
}
