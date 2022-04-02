import React, { Component } from 'react';
import layout from '../../styles/responsive-layout';
import AboutDataset from '../AboutDataset';

const styles = {
    main: {
        backgroundColor: '#292929',
    },
    bar: {
        backgroundColor: '#292929',
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
            <div className={layout.footer.grid.head} style={styles.main}>
                <div className={layout.footer.grid.right}></div>
                <div className={layout.footer.grid.center}>
                    <div style={styles.bar}></div>
                    <AboutDataset />
                </div>
                <div className={layout.footer.grid.left}></div>
            </div>
        );
    }
}
