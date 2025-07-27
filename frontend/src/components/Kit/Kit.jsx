import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import './Kit.css';
import loadingImg from '../../assets/loading.gif'
import { utcToIstReadable } from '../../utils/date';
import NotificationBox from '../../components/NotificationBox/NotificationBox';
import { getToken } from '../../utils/token';

export default function Kit({ kit: propKit, showButtons = false, onDelete }) {


    const [kit, setKit] = useState(propKit)
    const [showFull, setShowFull] = useState(false);



    return (
        <>

            {showFull && (

                <>
                    <div className="img-full-con">
                        <div className="blur-overlay"></div>

                        <div className="close-btn" onClick={() => setShowFull(false)}><i className="fa-solid fa-xmark fa-2x" style={{ color: "#ffffff" }}></i></div>
                        <div className="img-full-con-wrap">
                            <img src={kit.imageUrl} className='img-full' />


                        </div>
                    </div>
                </>

            )}

            <div key={kit._id} className='kit-item'>



                <img src={kit.imageUrl} alt={kit.title} onClick={() => setShowFull(true)} />

                <div className="kit-item-right">

                    <h2>{kit.title}</h2>
                    <p>{kit.description}</p>
                    <div>

                        {showButtons &&

                            <button onClick={() => onDelete(kit._id)} style={{ marginRight: "10px" }} >Delete</button>




                        }

                        <a href={kit.link} className='button-a' target='_blank'>Link &rarr;</a>
                    </div>


                </div>
            </div>


        </>
    )
}
