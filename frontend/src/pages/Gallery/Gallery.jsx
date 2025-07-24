import React, { useEffect, useState } from 'react'
import './Gallery.css';
import close from '../../assets/close.png'
import loadingImg from '../../assets/loading.gif'

export const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("https://samaksh-arts.onrender.com/api/v1/paintings")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");

        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        setPaintings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      })

  }, []);

  if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>

  const handleImageClick = (url) => {
    console.log(url)
    setSelectedImage(url)
  }

  const closeImage = () => {
    setSelectedImage(null);
  }

  return (
    <><div className="gallery">
    
      {selectedImage !== null && (
        
        <>

        <div className="img-full-con">
        <div className="blur-overlay"></div>

          <div className="close-btn" onClick={closeImage}><i className="fa-solid fa-xmark fa-2x" style={{color: "#ffffff"}}></i></div>
          <div className="img-full-con-wrap">
          <img src={selectedImage} className='img-full'/>


          </div>
        </div>
        </>
    
    )}






      <ul>
        {paintings.map(painting => {
          return (<li key={painting._id}>
            <img src={painting.imageUrl} alt={painting.title} onClick={()=>handleImageClick(painting.imageUrl)}/>
          </li>);
        })}
      </ul>
    </div>
    </>
  )
}

export default Gallery
