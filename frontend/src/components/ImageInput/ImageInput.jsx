import React, { useEffect, useRef, useState } from 'react'
import './ImageInput.css';

export default function ImageInput({
    label = "No image choosen, yet!",
    name,
    onChange,
    required = false,



}) {

    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);

        if (onChange) {
            onChange(e);
        }
    }



    return (<>
        <div className="image-input">
            <input
                type="file"
                id={name}
                name={name}
                accept='image/*'
                required={required}
                onChange={handleImageChange}
                ref={inputRef}
                style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                    zIndex: -1
                }}
            />

            <div className="image-input-preview" onClick={() => inputRef.current.click()}>
                {preview ?

                    <img src={preview} alt="Preview" className="preview-image" /> :

                    <>
                        <i className="fa-solid fa-cloud-arrow-up fa-5x" style={{ color: "#7349E9" }}></i>

                        {label && <p htmlFor={name}>{label}</p>}
                    </>

                }



            </div>

            <button type="button" onClick={() => inputRef.current.click()}>Choose a File</button>

        </div>
    </>
    )
}
