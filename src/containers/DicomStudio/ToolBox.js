import React from 'react';
import { Button, Dropdown, Label } from 'semantic-ui-react';

const styles = {
    toolBox: {
        backgroundColor: '#323232',
        color: 'white',
        width: '100%',
        fontWeight: '600',
        border: '2px solid black',
    },
    toolButton: {
        width: '50px',
        height: '50px',
        cursor: 'pointer',
    },
    dropdownCase: {
        width: '30%',
    },
    dropdownMriPass: {
        width: '70%',
    },
    sliceLabel: {
        width: '130px',
    },
};

const CustomDropdown = ({ list, placeholder, onChange }) => {
    const options = list.map((c, i) => ({ key: i, text: c.split('/')[0], value: c }));
    return <Dropdown title={placeholder} placeholder={placeholder} fluid selection options={options} onChange={onChange} />;
};

export default function ToolBox({ actions, caseCodeList, mriPassList, sliceNum }) {
    return (
        <div className='cui flex row jc-space-between' style={styles.toolBox}>
            <div className='cui flex row jc-space-between width-100'>
                <CustomDropdown list={caseCodeList} placeholder='Select a case code' onChange={actions.onCaseCodeDropDownChange} />

                <CustomDropdown list={mriPassList} placeholder='Select a MRI pass' onChange={actions.onMriPassNumDropDownChange} />

                <div className='cui flex row ai-end'>
                    <Button.Group>
                        <Button icon='caret square left outline' onClick={actions.prevSlice} title='Previous slice' />
                        <Button icon='caret square right outline' onClick={actions.nextSlice} title='Next slice' />
                        <Label style={styles.sliceLabel} color='grey' className='cui pt-12 text-align-left'>{`SLICE: ${sliceNum ?? ''}`}</Label>
                    </Button.Group>
                    <Button.Group>
                        <Button onClick={actions.submitSelection} title='Submit selection'>
                            Submit
                        </Button>
                    </Button.Group>
                </div>
            </div>
        </div>
    );
}
