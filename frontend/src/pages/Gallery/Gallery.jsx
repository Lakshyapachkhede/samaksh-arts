import React, { useEffect, useState } from 'react'
import './Gallery.css';
import close from '../../assets/close.png'
import loadingImg from '../../assets/loading.gif'
import { useNavigate } from 'react-router-dom';


export const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://samaksh-arts.onrender.com/api/v1/paintings")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");

        }
        return response.json();
      })
      .then(data => {
        setPaintings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      })

  }, []);

  if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>

  const handleImageClick = (id) => {
     navigate(`/gallery/${id}`);
  }



  return (
    <><div className="gallery">

      






      <ul>
        {paintings.map(painting => {
          return (<li key={painting._id}>
            <img src={painting.imageUrl} alt={painting.title} onClick={() => handleImageClick(painting._id)} />
          </li>);
        })}
      </ul>
    </div>
    </>
  )
}

export default Gallery
