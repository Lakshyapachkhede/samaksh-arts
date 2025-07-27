import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import './Painting.css';
import loadingImg from '../../assets/loading.gif'
import { utcToIstReadable } from '../../utils/date';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { getToken } from '../../utils/token';

export default function Painting({ painting: propPainting, showButtons = false, onDelete}) {

    const { id } = useParams();
    const [painting, setPainting] = useState(propPainting || null)
    const [loading, setLoading] = useState(!propPainting);
    const [showFull, setShowFull] = useState(false);
const [message, setMessage] = useState({ message: "", type: "", id: 0 });



    useEffect(() => {
        if (!painting && id) {


            fetch(`https://samaksh-arts.onrender.com/api/v1/paintings/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");

                    }
                    return response.json();
                })
                .then(data => {
                    setPainting(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                })
        }
    }, [id, propPainting]);

    


    if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>

    if (!painting) return <p>Painting not found.</p>;

    return (
        <>

            {showFull && (

                <>
                    <div className="img-full-con">
                        <div className="blur-overlay"></div>

                        <div className="close-btn" onClick={() => setShowFull(false)}><i className="fa-solid fa-xmark fa-2x" style={{ color: "#ffffff" }}></i></div>
                        <div className="img-full-con-wrap">
                            <img src={painting.imageUrl} className='img-full' />


                        </div>
                    </div>
                </>

            )}

            <div key={painting._id} className='admin-paintings-item'>



                <img src={painting.imageUrl} alt={painting.title} onClick={() => setShowFull(true)} />

                <div className="painting-item-right">

                    <NavLink to={`/gallery/${painting._id}`} style={{textDecoration:"none"}}><h2>{painting.title}</h2></NavLink>
                    <p>{painting.description}</p>
                    <p className='text-pur'>{painting.width}x{painting.height} {painting.unit}</p>

                    {showButtons &&

                        <div>
                            <button onClick={() => onDelete(painting._id)} style={{ marginRight: "10px" }} >Delete</button>
                            <NavLink
                                to={`/admin/paintings/form?action=update&id=${painting._id}`}
                            >
                                <button>Update</button>
                            </NavLink>

                        </div>


                    }
                    <p className='text-pur'>Date: {utcToIstReadable(painting.createdAt)}</p>




                </div>
            </div>
            {message.message && (
                <NotificationBox key={message.id} type={message.type} message={message.message} />
            )}

        </>
    )
}
