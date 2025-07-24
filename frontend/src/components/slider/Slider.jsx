import React, { useEffect, useRef, useState } from 'react'
import './Slider.css';

export const Slider = ({ srcList, showButtons }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (srcList.length > 0) {
            intervalRef.current = setInterval(() => {

                setSlideIndex(prev => (prev + 1) % srcList.length)
            }, 4000);
        }

        return () => clearInterval(intervalRef.current);

    }, [srcList]);

    const prevSlide = () => {
        clearInterval(intervalRef.current); // stop auto sliding
        setSlideIndex(prev => (prev - 1 + srcList.length) % srcList.length);
    };

    const nextSlide = () => {
        clearInterval(intervalRef.current); // stop auto sliding
        setSlideIndex(prev => (prev + 1) % srcList.length);
    };


    return (
        <>
            <div className="slider">
                <div className="slides">


                    {
                        srcList.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                alt={`image index ${index}`}
                                className={`slide ${index === slideIndex ? "displaySlide" : ""}`}
                            />
                        ))
                    }

                </div>

                {showButtons && (
                    <>
                        <button className="prev" onClick={prevSlide}>&#10094;</button>
                        <button className="next" onClick={nextSlide}>&#10095;</button>
                    </>
                )}

            </div>
        </>

    )
}
