import React, { Component } from 'react';
import { Ellipse } from 'react-konva';

const callFunction = (fn, data) => {
    if (typeof fn === 'function') fn(data);
};

export default class MyEllipse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            x: this.props.shape.x,
            y: this.props.shape.y,
            height: this.props.shape.height,
            width: this.props.shape.width,
            rotation: this.props.shape.rotation,
        };
    }

    evtHandlers = {
        onClick: (evt) => {
            callFunction(this.props.onClick, { evt, shape: this.state });
        },
        onDragStart: (evt) => {
            this.setState({ isDragging: true });
            callFunction(this.props.onDragStart, { evt, shape: this.state });
        },
        onDragEnd: (evt) => {
            this.setState({ isDragging: false, x: evt.target.x(), y: evt.target.y() });
            callFunction(this.props.onDragEnd, { evt, shape: this.state });
        },
    };

    render() {
        return (
            <Ellipse
                draggable
                x={this.state.x}
                y={this.state.y}
                height={this.state.height}
                width={this.state.width}
                rotation={this.state.rotation}
                opacity={this.state.isDragging ? 0.2 : 0.5}
                stroke='black'
                fill={this.state.isDragging ? 'white' : 'red'}
                onClick={this.evtHandlers.onClick}
                onDragStart={this.evtHandlers.onDragStart}
                onDragEnd={this.evtHandlers.onDragEnd}
            />
        );
    }
}
