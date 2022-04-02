import React, { Component } from 'react';
import layout from '../../styles/responsive-layout';

const styles = {
    main: {
        backgroundColor: '#365949',
        color: '#F1F2EB',
    },
};

export default class AppHeader extends Component {
    render() {
        return (
            <div className={layout.header.grid.head} style={styles.main}>
                <div className={layout.header.grid.left}></div>
                <div className={layout.header.grid.center + ' flex as-center'}>
                    <h1 className='cui text-align-left'>BREAST CANCER IMAGING</h1>
                </div>
                <div className={layout.header.grid.right}></div>
            </div>
        );
    }
}
