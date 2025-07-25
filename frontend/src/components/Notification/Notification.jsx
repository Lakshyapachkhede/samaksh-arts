import React, { useState, useEffect } from 'react'
import './Notification.css';

export default function Notification({
  type = 'info',
  message,
}) {


  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000); // 4 seconds
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`notification ${type} ${visible ? "show" : "hide"}`}
      onClick={() => setVisible(false)}
    >
      <p>{message}</p>
      <i class="fa-solid fa-xmark"></i>

    </div>
  )
}
