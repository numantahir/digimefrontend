import React, { useEffect, useState } from 'react';
import { DummyProfile } from '../utils';
import { updateProfileImage } from '../services/api';

const CoverUploader = ({ setImage, image }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Drag & Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files.length > 0) {
            handleImageChange(e.dataTransfer);
        }
    };

    useEffect(() => {
        setPreviewImage(image)
    }, [image])

    // Image Change Handler
    const handleImageChange = async (event) => {
        const file = event.target.files ? event.target.files[0] : event.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            const formData = new FormData()
            formData.append("image_type", "profile_image");
            formData.append("image", file);
            const response = await updateProfileImage(formData)
            console.log("response", response)
            const imageUrl = response.data.data.image_url
            setImage(imageUrl)
        }
    };

    return (
        <div
            className={`image-uploader ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                accept="image/*"
            />
            <label htmlFor="fileInput" className="upload-label">
                <img
                    src={previewImage ? previewImage : DummyProfile}
                    alt="Profile Preview"
                    className="preview-image"
                />
            </label>
        </div>
    );
};

export default CoverUploader;
