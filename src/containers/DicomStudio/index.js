import React, { Component } from 'react';
import Loader from '../../components/Loader';
import URLImage from './URLImage';
import { Stage, Layer } from 'react-konva';
import datasetApi from '../../apis/dataset-api';
import ToolBox from './ToolBox';
import MyEllipse from './MyEllipse';

const ellipseInitialProps = {
    x: 50,
    y: 50,
    height: 80,
    width: 50,
    rotation: 45,
};

const styles = {
    stage: {
        margin: '20px 0 0 0',
        width: '600px',
        height: '70vh',
    },
    imageBox: {
        objectFit: 'fill',
        backgroundColor: 'white',
        width: '600px',
        height: '400px',
    },
};

export default class DicomStudio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            curSlice: null,
            curSliceUrl: null,
            totalNumSlices: null,
            slices: null,
            currentShape: ellipseInitialProps,
        };
    }

    componentDidMount() {
        datasetApi.get().then((dataset) =>
            this.setState({
                curSlice: 1,
                totalNumSlices: dataset.length,
                slices: dataset,
                curSliceUrl: dataset[0].url,
                selectionStarted: false,
            })
        );
    }

    toolBoxActions = {
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
        },
        nextSlice: () => {
            if (this.state.curSlice >= this.state.totalNumSlices) return;
            const newSliceNum = this.state.curSlice + 1;
            const newSliceUrl = this.state.slices[newSliceNum - 1].url;
            this.setState({ curSlice: newSliceNum, curSliceUrl: newSliceUrl });
        },
        restartSelection: () => {
            this.setState({ selectionStarted: false });
        },
        submitSelection: () => {
            console.log(this.state.currentShape);
        },
    };

    actions = {
        onShapeDragStart: ({ evt, shape }) => {},
        onShapeDragEnd: ({ evt, shape }) => {
            this.setState({ currentShape: shape });
        },
    };

    render() {
        return (
            <div className='cui flex column ai-center'>
                <div className='cui flex column ai-center jc-center' style={styles.stage}>
                    <ToolBox actions={this.toolBoxActions} sliceNum={this.state.curSlice} selectionStarted={this.state.selectionStarted} />
                    <div className='cui flex row ai-center jc-center' style={styles.imageBox}>
                        {!this.state.curSlice ? (
                            <Loader />
                        ) : (
                            <Stage width={600} height={400}>
                                <Layer>
                                    <URLImage src={this.state.curSliceUrl} />
                                    {/* <MyEllipse
                                        shape={ellipseInitialProps}
                                        onDragStart={this.actions.onShapeDragStart}
                                        onDragEnd={this.actions.onShapeDragEnd}
                                    /> */}
                                </Layer>
                            </Stage>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
