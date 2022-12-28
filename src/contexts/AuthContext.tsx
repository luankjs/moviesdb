import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  name: string
  email: string
  token: string
}

type AuthContextType = {
  currentUser: User | null
  setLoginData: (user: User) => void
  signOut: () => void
}

type AuthProviderType = {
  children?: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({currentUser: null, setLoginData() {}, signOut() {}})

const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const setLoginData = (user: User) => {
    localStorage.setItem('currentUser', JSON.stringify(user))
    setCurrentUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  useEffect(() => {
    const storagedCurrentUser = localStorage.getItem('currentUser')
    if (storagedCurrentUser) {  
      setCurrentUser(JSON.parse(storagedCurrentUser))
    }
  }, [])
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setLoginData,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthProvider }