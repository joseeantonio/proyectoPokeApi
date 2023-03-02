import { createContext, useContext, useState } from 'react'

export const UserContext = createContext()

//Lo utilizamos para guardar el usuario

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)
