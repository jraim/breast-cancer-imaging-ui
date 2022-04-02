import React from 'react';
import { Modal } from 'semantic-ui-react';

const styles = {
    textAlign: 'center',
    width: '300px',
    fontSize: '14pt',
    fontWeight: '600',
    height: '50px',
};

export default function ImageModal({ title, imageUrl, description, open }) {
    return (
        <Modal open={open} style={styles}>
            <span>{title}</span>
        </Modal>
    );
}
