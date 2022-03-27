import React, { Component } from 'react';

const styles = {
    main: {
        backgroundColor: '#394648',
        color: 'white',
    },
};

export default class AppHeader extends Component {
    render() {
        return (
            <div className='header-height cui flex row jc-center ai-center' style={styles.main}>
                <h1>BREAST CANCER IMAGING</h1>
            </div>
        );
    }
}
