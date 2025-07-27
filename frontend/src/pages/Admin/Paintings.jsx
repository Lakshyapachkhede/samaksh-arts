import React, { useEffect, useState } from 'react'
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { getToken } from '../../utils/token';
import loadingImg from '../../assets/loading.gif'
import { NavLink } from 'react-router-dom';
import Painting from '../../components/Painting/Painting';


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
            <div className='d-f'>
                <h1 style={{ marginRight: "20px" }}>Your Art Work ({paintings.length})</h1>
                <NavLink
                    to={`/admin/paintings/form?action=create`}
                >
                    <button><i className="fa-solid fa-plus"></i></button>
                </NavLink>

            </div>

            <div className='admin-paintings-con'>


                {paintings.map((painting) => {
                    return (
                        <Painting key={painting._id} showButtons={true} painting={painting} onDelete={deletePainting} />
                    )
                })}

            </div>





            {message.message && (
                <NotificationBox key={message.id} type={message.type} message={message.message} />
            )}

        </>
    )
}
