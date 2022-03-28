import React from 'react';
import { Ellipse } from 'react-konva';

export default function MyEllipse({ format, position }) {
    const [isDragging, setDraggingFlag] = React.useState(false);

    const evtHandlers = {
        onDragStart: (evt) => {
            setDraggingFlag(true);
        },
        onDragEnd: (evt) => {
            setDraggingFlag(false);
        },
    };

    return (
        <Ellipse
            draggable
            x={position.x}
            y={position.y}
            height={format.height}
            width={format.width}
            rotation={format.rotation}
            opacity={isDragging ? 0.2 : 0.5}
            stroke='black'
            fill={isDragging ? 'white' : 'red'}
            onDragStart={evtHandlers.onDragStart}
            onDragEnd={evtHandlers.onDragEnd}
        />
    );
}
