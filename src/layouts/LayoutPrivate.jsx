import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.jsx'

const LayoutPrivate = () => {
  const { usuario } = useUserContext()
  const navigate = useNavigate()

  //Comprobamos si el usuario esta logueado

  useEffect(() => {
    if (!usuario) {
      navigate('/register')
    }
  }, [usuario])

  return (
    <main>
      <Outlet />
    </main>
  )
}

export default LayoutPrivate
