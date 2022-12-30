import React, { createContext, useContext, useEffect, useState } from 'react'

import { MovieReviewProps } from '../domain/Movie/Review/Card'
import { tstapi } from '../service/api'

interface User {
  name: string
  email: string
  token: string
}

type AuthContextType = {
  currentUser: User | null
  currentUserReviews: Array<MovieReviewProps>
  // eslint-disable-next-line no-unused-vars
  setLoginData: (user: User) => void
  signOut: () => void
  getMyReviews: () => void
}

type AuthProviderType = {
  children?: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  currentUserReviews: [],
  setLoginData() {},
  signOut() {},
  getMyReviews() {},
})

const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentUserReviews, setCurrentUserReviews] = useState<
    Array<MovieReviewProps>
  >([])

  const setLoginData = (user: User) => {
    localStorage.setItem('currentUser', JSON.stringify(user))
    setCurrentUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  const getMyReviews = () =>
    tstapi
      .get('/reviews/my')
      .then((response) => setCurrentUserReviews(response.data.reviews))
      .catch((error) => console.log(error.response.msg))

  useEffect(() => {
    const storagedCurrentUser = localStorage.getItem('currentUser')
    if (storagedCurrentUser) {
      getMyReviews()
      setCurrentUser(JSON.parse(storagedCurrentUser))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setLoginData,
        signOut,
        currentUserReviews,
        getMyReviews,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthProvider }
