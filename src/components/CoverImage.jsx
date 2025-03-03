import React from 'react';
import { Cover } from '../utils';
import { Container } from 'react-bootstrap';

const CoverImage = ({ src }) => {
    return (
        <Container>
            <div className="cover-img">
                {src ? (
                    <img src={src} alt="cover" />
                ) : (
                    <img src={Cover} alt="cover" />
                )}
            </div>
        </Container>
    );
}

export default CoverImage;
