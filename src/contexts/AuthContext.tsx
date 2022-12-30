import React, { createContext, useContext, useEffect, useState } from 'react'

import { MovieProps } from '../domain/Movie/Card'
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
  currentUserFavoritesMovies: Array<MovieProps>
  // eslint-disable-next-line no-unused-vars
  setLoginData: (user: User) => void
  signOut: () => void
  getMyReviews: () => void
  getMyFavoritesMovies: () => void
}

type AuthProviderType = {
  children?: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  currentUserReviews: [],
  currentUserFavoritesMovies: [],
  setLoginData() {},
  signOut() {},
  getMyReviews() {},
  getMyFavoritesMovies() {},
})

const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentUserReviews, setCurrentUserReviews] = useState<
    Array<MovieReviewProps>
  >([])
  const [currentUserFavoritesMovies, setCurrentUserFavoritesMovies] = useState<
    Array<MovieProps>
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

  const getMyFavoritesMovies = () =>
    tstapi
      .get('/favorites')
      .then((response) =>
        setCurrentUserFavoritesMovies(response.data.favorites)
      )
      .catch((error) => console.log(error.response.msg))

  useEffect(() => {
    const storagedCurrentUser = localStorage.getItem('currentUser')
    if (storagedCurrentUser) {
      getMyReviews()
      getMyFavoritesMovies()
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
        currentUserFavoritesMovies,
        getMyFavoritesMovies,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthProvider }
