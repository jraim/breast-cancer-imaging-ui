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
    opacity: { still: 0.4, drag: 0.2 },
};

export default function DicomStudio() {
    const [caseCodeList, setCaseCodeList] = useState(null);
    const [mriPassList, setMriPassList] = useState(null);
    const [caseCode, setCaseCode] = useState(null);
    const [mriPass, setMriPass] = useState(null);
    const [numberOfSlices, setNumberOfSlices] = useState(null);
    const [sliceNum, setSliceNum] = useState(null);
    const [slice, setSlice] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [ellipse, setEllipse] = useState(initEllipse);
    const [stageSize, setStageSize] = useState({ width: 480, height: 480 });
    const [hasImageLoaded, setHasImageLoaded] = useState(false);

    const imageRef = useRef(null);

    // Load component data
    useEffect(() => {
        datasetApi.getCaseCodes().then((caseCodeListResponse) => {
            setCaseCodeList(caseCodeListResponse.data.data);
        });
    }, [slice]);

    /**
     * Function to determine wether a shape has been dragged out of stage
     * @param {object} shape
     * @returns
     */
    const shapeWentOutOfStage = (shape) => {
        return shape.x < 0 || shape.y < 0 || shape.x > stageSize.width || shape.y > stageSize.height;
    };

    const renderSlice = (num) => {
        setHasImageLoaded(false);
        datasetApi
            .getSlice(num)
            .then((sliceResponse) => sliceResponse.data)
            .then((data) => {
                // setStageSize(data.shape);
                setSlice(data);
                setSliceNum(num);
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
            renderSlice(sliceNum - 1);
        },
        nextSlice: () => {
            if (sliceNum >= numberOfSlices) return;
            renderSlice(sliceNum + 1);
        },
        submitSelection: () => {
            const { x, y, width, height, rotation } = ellipse;

            datasetApi.sendEllipseData(sliceNum, ellipse).then((result) => {
                console.log(result);
            });
        },
        onCaseCodeDropDownChange: (e, data) => {
            setCaseCode(data.value);
            setMriPassList(caseCodeList[data.value]);
        },
        onMriPassNumDropDownChange: async (e, data) => {
            setSlice(null);
            setMriPass(data.value);
            const numSlices = mriPassList[data.value].numslices;
            setNumberOfSlices(numSlices);
            datasetApi.init(mriPassList[data.value].code).then((result) => renderSlice(parseInt(numSlices / 2)));
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
            const { width, height } = imageRef.current.image;
            setStageSize({ width, height });
            setHasImageLoaded(true);
        },
    };

    const styles = {
        stage: {
            margin: '20px 0 0 0',
            minWidth: `${stageSize.width}px`,
            height: '70vh',
        },
        imageBox: {
            objectFit: 'fill',
            backgroundColor: 'white',
            width: `${stageSize.width + 300}px`,
            height: `${stageSize.height}px`,
        },
        loader: {
            // minWidth: `${stageSize.width}px`,
            // height: '70vh',
        },
    };

    return (
        <div className='cui flex column ai-center jc-space-around mt-12'>
            <div className='cui flex column jc-center'>
                <ToolBox
                    actions={toolBoxActions}
                    caseCodeList={Object.keys(caseCodeList ?? {})}
                    mriPassList={Object.keys(mriPassList ?? {})}
                    sliceNum={sliceNum}
                />
                <div className='cui flex row ai-center jc-space-between' style={styles.imageBox}>
                    {!mriPass ? (
                        <Instructions />
                    ) : !sliceNum || !slice || slice.length < 1 ? (
                        <div className='cui flex column jc-center ai-center width-100'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='cui flex row ac-start'>
                            <Stage
                                width={stageSize.width}
                                height={stageSize.height}
                                onMouseDown={ellipseActions.checkDeselect}
                                onTouchStart={ellipseActions.checkDeselect}
                            >
                                <Layer>
                                    <URLImage actions={urlImageActions} ref={imageRef} src={datasetApi.baseURL + slice['image_path']} />
                                    <MyEllipse
                                        shapeProps={initEllipse}
                                        dynamicProps={ellipseDynamicProps}
                                        isSelected={initEllipse.id === selectedId}
                                        onSelect={ellipseActions.onSelect}
                                        callbackAttributes={ellipseActions.onChange}
                                    />
                                </Layer>
                            </Stage>
                            <div>
                                <h1 className='cui mt-12 ml-12'>Clinical Data</h1>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
