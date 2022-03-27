import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

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
};

export default class ToolBox extends Component {
    render() {
        return (
            <div className='cui flex row jc-space-between' style={styles.toolBox}>
                <div className='cui flex row jc-space-between width-100'>
                    <div className='cui flex column ai-start'>
                        <Button.Group>
                            <Button icon='zoom-in' onClick={this.props.actions.zoomIn} />
                            <Button icon='zoom-out' onClick={this.props.actions.zoomOut} />
                        </Button.Group>
                    </div>
                    <span>Slice: {this.props.sliceNum}</span>
                    <div className='cui flex column ai-start'>
                        <Button.Group>
                            <Button icon='caret square left outline' onClick={this.props.actions.prevSlice} />
                            <Button icon='caret square right outline' onClick={this.props.actions.nextSlice} />
                        </Button.Group>
                    </div>
                </div>
            </div>
        );
    }
}
