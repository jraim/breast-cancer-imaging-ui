import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../components/Loader';
import { Stage, Layer } from 'react-konva';

// API calls
import datasetApi from '../../apis/dataset-api';

// My components
import URLImage from './URLImage';
import CaseInfo from './CaseInfo';
import MyEllipse from './MyEllipse';
import Instructions from './Instructions';
import layout from '../../styles/responsive-layout';
import SliceControls from './SliceControls';
import ImageModal from '../../components/ImageModal';

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

export default function DicomStudio({ id }) {
    const [caseCodes, setCaseCodes] = useState(null);
    const [mriPasses, setMriPassReferences] = useState(null);
    const [caseCode, setCaseCode] = useState(null);
    const [mriPass, setMriPass] = useState(null);
    const [numberOfSlices, setNumberOfSlices] = useState(null);
    const [sliceNum, setSliceNum] = useState(null);
    const [slice, setSlice] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [ellipse, setEllipse] = useState(initEllipse);
    const [stageSize, setStageSize] = useState({ width: 480, height: 480 });
    const [hasImageLoaded, setHasImageLoaded] = useState(false);
    const [clinicalData, setClinicalData] = useState(null);
    const [classificationResult, setClassificationResult] = useState(null);
    const [clinicalDataActiveIndex, setClinicalDataActiveIndex] = useState(0);
    const [waitingForClassification, setWaitingForClassification] = useState(false);

    const imageRef = useRef(null);
    const stageRef = useRef(null);

    // Load component data
    useEffect(() => {
        datasetApi.getCaseCodes().then((caseCodesResponse) => {
            setCaseCodes(caseCodesResponse.data.data);
        });
    }, [slice]);

    const renderSlice = (num) => {
        datasetApi
            .getSlice(num)
            .then((sliceResponse) => sliceResponse.data)
            .then((data) => {
                setSlice(data);
                setSliceNum(num);
                setHasImageLoaded(true);
            });
    };

    const sliceControlActions = {
        prevSlice: () => {
            if (sliceNum <= 1) return;
            setHasImageLoaded(false);
            renderSlice(sliceNum - 1);
        },
        nextSlice: () => {
            if (sliceNum >= numberOfSlices) return;
            setHasImageLoaded(false);
            renderSlice(sliceNum + 1);
        },
    };

    const caseInfoActions = {
        submitSelection: () => {
            setWaitingForClassification(true);
            datasetApi.sendEllipseData(sliceNum, ellipse).then((result) => {
                setClassificationResult('GOT SOME RESULT');
                setClinicalDataActiveIndex(1);
                console.log(result);
                setWaitingForClassification(false);
            });
        },
        onCaseCodeDropDownChange: (e, data) => {
            setClassificationResult(null);
            setCaseCode(data.value);
            setSliceNum(null);
            setMriPassReferences(caseCodes[data.value]);
            setMriPass(null);
        },
        onMriPassNumDropDownChange: async (e, data) => {
            setHasImageLoaded(false);
            setClassificationResult(null);
            setSlice(null);
            setSliceNum(null);
            setMriPass(data.value);
            const numSlices = mriPasses[data.value].numslices;
            setNumberOfSlices(numSlices);
            datasetApi.init(mriPasses[data.value].code).then((result) => renderSlice(parseInt(numSlices / 2)));
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
        },
    };

    const triggerModal = (cb, a) => {
        cb(a);
    };

    const styles = {
        stage: {
            minWidth: `${stageSize.width}px`,
            height: '70vh',
        },
        stageBox: {
            objectFit: 'fill',
            backgroundColor: '#FFFFFB',
            width: `${stageSize.width}px`,
            height: `${stageSize.height}px`,
        },
        stageContainer: {
            backgroundColor: '#535052',
            // color: 'white',
            padding: '10px 10px 10px 10px',
            borderRadius: '5px',
            // minHeight: '600px',
            // width: '100%',
            // backgroundColor: '#CDCBCC',
        },
    };

    return (
        <div id={id} className={layout.dicomStudio.grid.head}>
            <div className={layout.dicomStudio.grid.left} style={styles.leftContainer}>
                <ImageModal
                    imageUrl={null}
                    open={waitingForClassification}
                    setter={triggerModal}
                    disableControls={true}
                    title='Classification in progress...'
                />
            </div>
            <div className={layout.dicomStudio.grid.center + ' flex column jc-center'}>
                <div className='cui flex row jc-start'>
                    <div className='cui mr-12'>
                        <CaseInfo
                            actions={caseInfoActions}
                            caseCodes={Object.keys(caseCodes ?? {})}
                            mriPasses={Object.keys(mriPasses ?? {})}
                            sliceNum={sliceNum}
                            clinicalData={clinicalData}
                            classificationResult={classificationResult}
                            activeIndex={clinicalDataActiveIndex}
                            setActiveIndex={setClinicalDataActiveIndex}
                            disabledMriPassReference={waitingForClassification || !caseCode}
                            disabledSubmit={waitingForClassification || !hasImageLoaded}
                            disableCaseSelector={waitingForClassification}
                        />
                    </div>
                    <div className='cui flex column ml-12' style={styles.stageContainer}>
                        <SliceControls
                            actions={sliceControlActions}
                            sliceNum={sliceNum}
                            width={stageSize.width}
                            disabled={!hasImageLoaded || waitingForClassification}
                        />
                        <div className='cui flex row ai-center' style={styles.stageBox}>
                            {!mriPass ? (
                                <Instructions />
                            ) : !sliceNum || !slice || slice.length < 1 ? (
                                <div className='cui flex column jc-center ai-center width-100'>
                                    <Loader />
                                </div>
                            ) : (
                                <div className='cui flex row ac-start'>
                                    <Stage
                                        ref={stageRef}
                                        width={stageSize.width}
                                        height={stageSize.height}
                                        onMouseDown={ellipseActions.checkDeselect}
                                        onTouchStart={ellipseActions.checkDeselect}
                                    >
                                        <Layer>
                                            <URLImage actions={urlImageActions} ref={imageRef} src={datasetApi.baseURL + slice['image_path']} />
                                            <MyEllipse
                                                disabled={!hasImageLoaded || waitingForClassification}
                                                shapeProps={initEllipse}
                                                dynamicProps={ellipseDynamicProps}
                                                isSelected={initEllipse.id === selectedId}
                                                onSelect={ellipseActions.onSelect}
                                                callbackAttributes={ellipseActions.onChange}
                                            />
                                        </Layer>
                                    </Stage>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={layout.dicomStudio.grid.right} style={styles.rightContainer}></div>
        </div>
    );
}
