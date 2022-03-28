import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../components/Loader';
import { Stage, Layer } from 'react-konva';

// API calls
import datasetApi from '../../apis/dataset-api';

// My components
import URLImage from './URLImage';
import ToolBox from './ToolBox';
import MyEllipse from './MyEllipse';

// Initial values
const stageSize = { width: 600, height: 400 };
const initEllipse = {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    rotation: 0,
    id: 'e1',
};
const ellipseDynamicProps = {
    fill: { still: 'red', drag: 'white' },
    opacity: { still: 0.5, drag: 0.2 },
};

const styles = {
    stage: {
        margin: '20px 0 0 0',
        width: `${stageSize.width}px`,
        height: '70vh',
    },
    imageBox: {
        objectFit: 'fill',
        backgroundColor: 'white',
        width: '600px',
        height: '400px',
    },
};

/**
 * Function to determine wether a shape has been dragged out of stage
 * @param {object} shape
 * @returns
 */
const shapeWentOutOfStage = (shape) => {
    return shape.x < 0 || shape.y < 0 || shape.x > stageSize.width || shape.y > stageSize.height;
};

export default function DicomStudio() {
    const [curSlice, setCurSlice] = useState(null);
    const [slices, setSlices] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [ellipse, setEllipse] = useState(initEllipse);

    const imageRef = useRef(null);

    useEffect(() => {
        datasetApi.get().then((dataset) => {
            setCurSlice(1);
            setSlices(dataset);
        });
    }, []);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target._id === imageRef.current.imageNode._id;
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const toolBoxActions = {
        zoomIn: () => {
            console.log('zoom-in');
        },
        zoomOut: () => {
            console.log('zoom-out');
        },
        prevSlice: () => {
            if (curSlice <= 1) return;
            setCurSlice(curSlice - 1);
        },
        nextSlice: () => {
            if (curSlice >= slices.length) return;
            setCurSlice(curSlice + 1);
        },
        submitSelection: () => {
            const { x, y, width, height, rotation } = ellipse;
            console.log({ x, y, width, height, rotation });
        },
    };

    const ellipseActions = {
        onSelect: () => {
            selectShape(initEllipse.id);
        },
        onChange: (ellipse) => {
            setEllipse(ellipse);
        },
    };

    return (
        <div className='cui flex column ai-center'>
            <div className='cui flex column ai-center jc-center' style={styles.stage}>
                <ToolBox actions={toolBoxActions} sliceNum={curSlice} />
                <div className='cui flex row ai-center jc-center' style={styles.imageBox}>
                    {!curSlice || !slices || slices.length < 1 ? (
                        <Loader />
                    ) : (
                        <Stage width={stageSize.width} height={stageSize.height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
                            <Layer>
                                <URLImage ref={imageRef} src={slices[curSlice - 1].url} />
                                <MyEllipse
                                    shapeProps={initEllipse}
                                    dynamicProps={ellipseDynamicProps}
                                    isSelected={initEllipse.id === selectedId}
                                    onSelect={ellipseActions.onSelect}
                                    callbackAttributes={ellipseActions.onChange}
                                />
                            </Layer>
                        </Stage>
                    )}
                </div>
            </div>
        </div>
    );
}
