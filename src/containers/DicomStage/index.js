import React, { Component } from 'react';
import ToolBox from './toolbox';

const styles = {
    stage: {
        margin: '20px 0 0 0',
        width: '600px',
        height: '70vh',
        // border: '1px solid',
    },
    imageBox: {
        objectFit: 'contain',
        backgroundColor: 'lightgrey',
        width: '600px',
        height: '400px',
        border: '3px black solid',
        borderRadius: '0 0 7px 7px',
    },
};

export default class DicomStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curSlice: 1,
            totalNumSlices: 10,
        };
    }

    actions = {
        zoomIn: () => {
            console.log('zoom-in');
        },
        zoomOut: () => {
            console.log('zoom-out');
        },
        prevSlice: () => {
            if (this.state.curSlice <= 1) return;
            this.setState({ curSlice: this.state.curSlice - 1 });
            console.log('previous slice');
        },
        nextSlice: () => {
            if (this.state.curSlice >= this.state.totalNumSlices) return;
            this.setState({ curSlice: this.state.curSlice + 1 });
        },
    };

    render() {
        return (
            <div className='cui flex column ai-center'>
                <div className='cui flex column ai-center jc-center' style={styles.stage}>
                    <ToolBox actions={this.actions} sliceNum={this.state.curSlice} />
                    <div style={styles.imageBox}></div>
                </div>
            </div>
        );
    }
}
