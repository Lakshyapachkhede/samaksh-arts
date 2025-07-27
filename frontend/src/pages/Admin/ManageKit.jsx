import React, { useState, useEffect } from 'react'
import loadingImg from '../../assets/loading.gif'
import { NavLink } from 'react-router-dom';
import Kit from '../../components/Kit/Kit';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { getToken } from '../../utils/token';


export default function ManageKit() {
    const [kits, setKits] = useState([]);
    const [message, setMessage] = useState({ message: "", type: "", id: 0 });
    const [loading, setLoading] = useState(true);


    const getAllKits = async () => {
        try {
            const res = await fetch("https://samaksh-arts.onrender.com/api/v1/kit");

            const data = await res.json();
            setKits(data);
            setLoading(false);
        }
        catch {
            setMessage({
                message: "Failed to fetch Kits",
                type: "error",
                id: Date.now()
            })
            setLoading(false);

        }

    }


    useEffect(() => {
        getAllKits();
    }, [])



    const deleteKit = async (id) => {
        try {
            const res = await fetch(`https://samaksh-arts.onrender.com/api/v1/kit/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            })

            if (res.ok) {
                setKits(prev => prev.filter(k => k._id !== id));
                setMessage({
                    message: "Kit deleted successfully!",
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
                message: "Delete Error" + err,
                type: "error",
                id: Date.now()
            })
        }
    }

    if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>

    return (
        <>
            <div className="pages-con" style={{ padding: "0 50px" }}>



                <div className='d-f' style={{ marginBottom: "20px" }}>
                    <h1 style={{ marginRight: "20px" }}>Your All Items ({kits.length})</h1>
                    <NavLink
                        to={`/admin/manage-kit/add`}
                    >
                        <button><i className="fa-solid fa-plus"></i></button>
                    </NavLink>

                </div>



                <div className="kit-items">



                    {kits.map((kit) => {
                        return (
                            <Kit key={kit._id} showButtons={true} kit={kit} onDelete={() => { deleteKit(kit._id) }} />
                        )
                    })}



                </div>



                {message.message && (
                    <NotificationBox key={message.id} type={message.type} message={message.message} />
                )}
            </div>

        </>

    )
}
