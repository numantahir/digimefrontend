import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { updateProfileImage } from "../services/api";
import { DragDrop } from "../utils";

const CoverUpload = ({ name, setCover, image }) => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
            const formData = new FormData()
            formData.append("image_type", "cover_image");
            formData.append("image", file);
            const response = await updateProfileImage(formData)
            console.log("response", response)
            const imageUrl = response.data.data.image_url
            setCover(imageUrl)
        }
    };

    useEffect(() => {
        setPreviewImage(image)
    }, [image])

    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => setPreviewImage(null);

    return (
        <section>
            <Container>
                <div
                    className={`uploader-cover-photo d-flex justify-content-center align-items-center ${previewImage ? "has-image" : ""}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={previewImage ? { backgroundImage: `url(${previewImage})` } : {}}
                >
                    <div className="cover-container p-0">
                        <div className="drag-content d-flex justify-content-center align-items-center mt-2 flex-column">
                            <label htmlFor="coverPhotoInput" className="cover-label text-center">
                                <input
                                    type="file"
                                    id="coverPhotoInput"
                                    accept="image/*"
                                    name={name}
                                    onChange={handleImageChange}
                                />

                                {!previewImage ? (
                                    <div className="mt-0 d-flex justify-content-center align-items-center">
                                        <img src={DragDrop} alt="Drag & Drop" />
                                    </div>
                                ) : (
                                    <div className="preview-container">
                                        <button className="remove-btn" onClick={handleRemove}>
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default CoverUpload;
