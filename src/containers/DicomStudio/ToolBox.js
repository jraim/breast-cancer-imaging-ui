import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

// const DropdownExampleSearchSelectionTwo = () => <Dropdown placeholder='State' search selection options={stateOptions} />;

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
    dropdown: {
        width: '20px',
    },
};

export default class ToolBox extends Component {
    render() {
        return (
            <div className='cui flex row jc-space-between' style={styles.toolBox}>
                <div className='cui flex row jc-space-between width-100'>
                    <div className='cui flex column ai-start width-30'>
                        <Button.Group>
                            <Button icon='zoom-in' onClick={this.props.actions.zoomIn} title='Zoom in' />
                            <Button icon='zoom-out' onClick={this.props.actions.zoomOut} title='Zoom out' />
                            <Button onClick={this.props.actions.submitSelection} title='Submit selection'>
                                Submit
                            </Button>
                        </Button.Group>
                    </div>
                    <div className='cui width-40'>{this.props.sliceNum ? <span>Slice: {this.props.sliceNum}</span> : ''}</div>
                    <div className='cui flex column ai-end width-30'>
                        <Button.Group>
                            <Button icon='caret square left outline' onClick={this.props.actions.prevSlice} title='Previous slice' />
                            <Button icon='caret square right outline' onClick={this.props.actions.nextSlice} title='Next slice' />
                        </Button.Group>
                    </div>
                </div>
            </div>
        );
    }
}
