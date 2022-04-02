import React, { useState } from 'react';
import { Transformer, Ellipse } from 'react-konva';

export default function MyEllipse({ shapeProps, dynamicProps, isSelected, onSelect, callbackAttributes }) {
    const [isDragging, setDraggingFlag] = useState(false);
    const [ellipse, setEllipse] = useState(shapeProps);
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const onAttributesChange = (newAttrs) => {
        setEllipse(newAttrs);
        callbackAttributes(newAttrs);
    };

    const eventHandlers = {
        onDragStart: (evt) => {
            setDraggingFlag(true);
        },
        onDragEnd: (e) => {
            setDraggingFlag(false);
            onAttributesChange({
                ...ellipse,
                x: e.target.x(),
                y: e.target.y(),
            });
        },
        onTransformEnd: (e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onAttributesChange({
                ...ellipse,
                rotation: node.attrs.rotation,
                x: node.x(),
                y: node.y(),
                // set minimal value
                width: Math.max(10, node.width() * scaleX),
                height: Math.max(10, node.height() * scaleY),
            });
        },
    };

    return (
        <React.Fragment>
            <Ellipse
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...ellipse}
                opacity={isDragging ? dynamicProps.opacity.drag : dynamicProps.opacity.still}
                fill={isDragging ? dynamicProps.fill.drag : dynamicProps.fill.still}
                draggable
                stroke={'black'}
                onDragStart={eventHandlers.onDragStart}
                onDragEnd={eventHandlers.onDragEnd}
                onTransformEnd={eventHandlers.onTransformEnd}
            />
            {isSelected ? (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 10 || newBox.height < 10) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            ) : null}
        </React.Fragment>
    );
}
