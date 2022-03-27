import React, { Component } from 'react';
import Loader from '../../components/Loader';
import datasetApi from '../../apis/dataset-api';
import ToolBox from './toolbox';

const styles = {
    stage: {
        margin: '20px 0 0 0',
        width: '600px',
        height: '70vh',
    },
    imageBox: {
        objectFit: 'contain',
        backgroundColor: 'white',
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
            curSlice: null,
            curSliceUrl: null,
            totalNumSlices: null,
            slices: null,
        };
    }

    componentDidMount() {
        const getDataset = async () => {
            const dataset = await datasetApi.get();
            this.setState({
                curSlice: 1,
                totalNumSlices: dataset.length,
                slices: dataset,
                curSliceUrl: dataset[0].url,
            });
        };
        getDataset();
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
            const newSliceNum = this.state.curSlice - 1;
            const newSliceUrl = this.state.slices[newSliceNum - 1].url;
            this.setState({ curSlice: newSliceNum, curSliceUrl: newSliceUrl });
            this.setState({});
        },
        nextSlice: () => {
            if (this.state.curSlice >= this.state.totalNumSlices) return;
            const newSliceNum = this.state.curSlice + 1;
            const newSliceUrl = this.state.slices[newSliceNum - 1].url;
            this.setState({ curSlice: newSliceNum, curSliceUrl: newSliceUrl });
            this.setState({});
        },
    };

    render() {
        return (
            <div className='cui flex column ai-center'>
                <div className='cui flex column ai-center jc-center' style={styles.stage}>
                    <ToolBox actions={this.actions} sliceNum={this.state.curSlice} />
                    <div className='cui flex row ai-center jc-center' style={styles.imageBox}>
                        {!this.state.curSlice ? <Loader /> : <img src={this.state.curSliceUrl} />}
                    </div>
                </div>
            </div>
        );
    }
}
