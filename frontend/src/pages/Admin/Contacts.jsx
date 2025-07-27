import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/token';
import { utcToIstReadable } from '../../utils/date';
import loadingImg from '../../assets/loading.gif'
import NotificationBox from '../../components/NotificationBox/NotificationBox';


export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState({ message: "", type: "", id: 0 });
  const [loading, setLoading] = useState(true);


  const getAllContacts = async () => {
    try {
      const res = await fetch("https://samaksh-arts.onrender.com/api/v1/contact",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();
      setContacts(data);
      setLoading(false);
    }
    catch {
      setMessage({
        message: "Failed to fetch contacts",
        type: "error",
        id: Date.now()
      })
      setLoading(false);

    }

  }

  useEffect(() => {
    getAllContacts();
  }, [])


  const deleteContact = async (id) => {
    try {
      const res = await fetch(`https://samaksh-arts.onrender.com/api/v1/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${getToken()}`
          }
        }
      );

      if (res.ok) {
        setContacts(prev => contacts.filter(c => c._id != id))
        setMessage({
          message: "Contact deleted successfully!",
          type: "success",
          id: Date.now()
        })
      } else {
        setMessage({
          message: "Failed to delete contact",
          type: "error",
          id: Date.now()
        })
      }



    }

    catch (err) {
      setMessage({
        message: "Delete Error",
        type: "error",
        id: Date.now()
      })
    }



  }


  if (loading) return <div className="gallery"><img src={loadingImg} alt="loading..." className='loading' /></div>

  return (
    <div className='pages-con'>

      {contacts &&

        contacts.map((contact) => {
          return (
            <div key={contact._id} className='admin-paintings-item'>



              <div className="painting-item-right">

                <h2>{contact.subject}</h2>
                <p>{contact.email}</p>
                <p>{contact.message}</p>



                <p className='text-pur'>Date: {utcToIstReadable(contact.createdAt)}</p>
                <button onClick={() => deleteContact(contact._id)} >Delete</button>




              </div>
            </div>

          )


        })

      }

      {message.message && (
        <NotificationBox key={message.id} type={message.type} message={message.message} />
      )}



    </div>
  )
}
