import React, { useEffect } from 'react'
import { clearToken } from '../../utils/token'
import { useNavigate } from 'react-router-dom'


export default function Logout() {
    const navigate = useNavigate();


    useEffect(() => {
        clearToken();

        navigate("/admin/login");



    }, [navigate])



    return (
        <div>Logout</div>
    )
}
