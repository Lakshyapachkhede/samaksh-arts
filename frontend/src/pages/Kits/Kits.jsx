import React, { useState, useEffect } from 'react'
import loadingImg from '../../assets/loading.gif'
import { NavLink } from 'react-router-dom';
import Kit from '../../components/Kit/Kit';
import './Kits.css'



export default function Kits() {
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

  if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>

  return (
    <>
      <div className="pages-con" style={{ padding: "0 50px" }}>




        <h1 style={{ marginBottom: "20px" }}>My Kit</h1>

      <div className="kit-items">



        {kits.map((kit) => {
          return (
            <Kit key={kit._id} showButtons={false} kit={kit} onDelete={()=>{console.log("heoo")}} />
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
