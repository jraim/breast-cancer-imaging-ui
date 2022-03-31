import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../components/Loader';
import { Stage, Layer } from 'react-konva';

// API calls
import datasetApi from '../../apis/dataset-api';

// My components
import URLImage from './URLImage';
import ToolBox from './ToolBox';
import MyEllipse from './MyEllipse';
import Instructions from './Instructions';

// Initial values

const initEllipse = {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    rotation: 0,
    id: 'e1',
};

// Component config
const ellipseDynamicProps = {
    fill: { still: 'red', drag: 'white' },
    opacity: { still: 0.5, drag: 0.2 },
};

export default function DicomStudio() {
    const [caseCodeList, setCaseCodeList] = useState(['a1', 'a2', 'a3']);
    const [caseCode, setCaseCode] = useState(null);
    const [sliceNum, setSliceNum] = useState(null);
    const [slice, setSlice] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [ellipse, setEllipse] = useState(initEllipse);
    const [stageSize, setStageSize] = useState({ width: 600, height: 400 });
    const [hasImageLoaded, setHasImageLoaded] = useState(false);

    const imageRef = useRef(null);

    // Load component data
    useEffect(() => {
        datasetApi.getCaseCodes().then((caseCodeListResponse) => {
            setCaseCodeList(caseCodeListResponse);
        });
    }, []);

    const styles = {
        stage: {
            margin: '20px 0 0 0',
            width: `${stageSize.width}px`,
            height: '70vh',
        },
        imageBox: {
            objectFit: 'fill',
            backgroundColor: 'white',
            width: `${stageSize.width}px`,
            height: `${stageSize.height}px`,
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

    const renderSlice = (num) => {
        datasetApi.getSlice(num).then((sliceResponse) => {
            setHasImageLoaded(false);
            setStageSize(sliceResponse.shape);
            setSlice(sliceResponse);
            setSliceNum(num);
            setHasImageLoaded(true);
        });
    };

    const toolBoxActions = {
        zoomIn: () => {
            console.log('zoom-in');
        },
        zoomOut: () => {
            console.log('zoom-out');
        },
        prevSlice: () => {
            if (sliceNum <= 1) return;
            setSlice(null);
            renderSlice(sliceNum - 1);
        },
        nextSlice: () => {
            if (sliceNum >= 10 /* TODO Obter o num de slices do backend */) return;
            setSlice(null);
            renderSlice(sliceNum + 1);
        },
        submitSelection: () => {
            const { x, y, width, height, rotation } = ellipse;
            console.log({ x, y, width, height, rotation });
            datasetApi.sendEllipseData(ellipse).then((result) => {
                console.log(result);
            });
        },
        onDropDownChange: (e, data) => {
            setSlice(null);
            setCaseCode(data.value);
            datasetApi.init(caseCode).then((result) => renderSlice(1));
        },
    };

    const ellipseActions = {
        onSelect: () => {
            selectShape(initEllipse.id);
        },
        onChange: (ellipse) => {
            setEllipse(ellipse);
        },
        checkDeselect: (e) => {
            const clickedOnEmpty = e.target._id === imageRef.current.imageNode._id;
            if (clickedOnEmpty) {
                selectShape(null);
            }
        },
    };

    const urlImageActions = {
        onLoad: (e) => {
            setHasImageLoaded(true);
        },
    };

    return (
        <div className='cui flex column ai-center'>
            <div className='cui flex column ai-center jc-center' style={styles.stage}>
                <ToolBox actions={toolBoxActions} caseCodeList={caseCodeList} sliceNum={sliceNum} />
                <div className='cui flex row ai-center jc-center' style={styles.imageBox}>
                    {!caseCode ? (
                        <Instructions />
                    ) : !hasImageLoaded || !sliceNum || !slice || slice.length < 1 ? (
                        <Loader />
                    ) : (
                        <Stage
                            width={stageSize.width}
                            height={stageSize.height}
                            onMouseDown={ellipseActions.checkDeselect}
                            onTouchStart={ellipseActions.checkDeselect}
                        >
                            <Layer>
                                <URLImage actions={urlImageActions} ref={imageRef} src={slice['image_path']} />
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
