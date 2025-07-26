import React, { useEffect, useState } from 'react'
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { getToken } from '../../utils/token';
import loadingImg from '../../assets/loading.gif'


export default function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [message, setMessage] = useState({ message: "", type: "", id: 0 });
    const [loading, setLoading] = useState(true);

    const getAllPaintings = async () => {
        try {
            const res = await fetch("https://samaksh-arts.onrender.com/api/v1/paintings");

            const data = await res.json();
            setPaintings(data);
            setLoading(false);
        }
        catch {
            setMessage({
                message: "Failed to fetch paintings",
                type: "error",
                id: Date.now()
            })
            setLoading(false);

        }

    }


    useEffect(() => {
        getAllPaintings();
    }, [])


    const deletePainting = async (id) => {
        try {
            const res = await fetch(`https://samaksh-arts.onrender.com/api/v1/paintings/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            })

            if (res.ok) {
                setPaintings(prev => prev.filter(p => p._id !== id));
                setMessage({
                    message: "Painting deleted successfully!",
                    type: "success",
                    id: Date.now()
                })
            } else {
                setMessage({
                    message: "Failed to delete",
                    type: "error",
                    id: Date.now()
                })
            }
        } catch (err) {
            setMessage({
                message: "Delete Error",
                type: "error",
                id: Date.now()
            })
        }
    }

    if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>


    return (
        <>
            <h1>Your Art Work</h1>
            <div className='admin-paintings-con'>


                {paintings.map((painting) => {
                    return (
                        <div key={painting._id} className='admin-paintings-item'>



                            <img src={painting.imageUrl} alt={painting.title} />

                            <div className="painting-item-right">

                                <h2>{painting.title}</h2>
                                <p>{painting.description}</p>
                                <p className='text-pur'>{painting.width}x{painting.height} {painting.unit}</p>
                                <button onClick={() => deletePainting(painting._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}

            </div>





            {message.message && (
                <NotificationBox key={message.id} type={message.type} message={message.message} />
            )}

        </>
    )
}
