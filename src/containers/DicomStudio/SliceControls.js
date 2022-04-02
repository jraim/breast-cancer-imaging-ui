import React from 'react';
import { Button } from 'semantic-ui-react';

export default function SliceControls({ actions, disabled, sliceNum, width }) {
    const styles = {
        panel: {
            width: width,

            backgroundColor: '#e0e1e2',
            color: 'black',
            padding: '',
            marginBottom: '10px',
            borderRadius: '3px',
        },
    };
    return (
        <div style={styles.panel}>
            <div className='cui flex row ai-space-between jc-space-between'>
                <Button.Group>
                    <Button icon='angle left' onClick={actions.prevSlice} title='Previous slice' disabled={disabled} />
                </Button.Group>
                <h4 className='cui as-center'>{sliceNum ? `SLICE ${sliceNum}` : ''} </h4>
                {/* <Label style={styles.sliceLabel} color='grey' className='cui pt-12 text-align-left'>{`SLICE: ${sliceNum ?? ''}`}</Label> */}
                <Button.Group>
                    <Button icon='angle right' onClick={actions.nextSlice} title='Next slice' disabled={disabled} />
                </Button.Group>
            </div>
        </div>
    );
}
