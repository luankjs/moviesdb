import React, { PropsWithChildren } from 'react'

import _ from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

import { useAuthContext } from '../../contexts/AuthContext'
import { tstapi } from '../../service/api'

interface MovieProps {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Plot: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Language: string
  Country: string
  Awards: string
  Rating: Array<{ Source: string; Value: string }>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
}

const MovieCard: React.FC<PropsWithChildren<MovieProps>> = ({
  Title,
  Poster,
  Year,
  imdbID,
}) => {
  const { currentUser, currentUserFavoritesMovies, getMyFavoritesMovies } =
    useAuthContext()

  const isFavoriteMovie = _.find(currentUserFavoritesMovies, { imdbID })

  const toggleFavoriteMovie = () => {
    tstapi({
      method: `${isFavoriteMovie ? 'delete' : 'post'}`,
      url: `/favorites/${isFavoriteMovie ? imdbID : ''}`,
      data: !isFavoriteMovie && { imdbID },
    })
      .then(() => {
        getMyFavoritesMovies()
      })
      .catch((error) => console.log(error.response))
  }

  return (
    <div className="movie">
      <div className="movie-poster ratio ratio-2x3 position-relative rounded-3 overflow-hidden shadow">
        <Image
          src={Poster != 'N/A' ? Poster : '/movie-poster-placeholder.jpg'}
          alt={Title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="movie-poster-overlay d-flex align-items-center justify-content-center">
          {currentUser && (
            <div
              className="d-flex align-items-center justify-content-center position-absolute top-0 end-0 p-2 m-2 rounded-4 bg-primary bg-opacity-20 cursor-pointer"
              title={isFavoriteMovie ? 'Favorito' : 'Favoritar'}
              onClick={toggleFavoriteMovie}
            >
              <i
                className={`${
                  isFavoriteMovie ? 'fas' : 'far'
                } fa-heart text-primary lh-1`}
              ></i>
            </div>
          )}
          <Link
            href={`/filmes/${imdbID}`}
            target="_blank"
            className="btn btn-primary btn-sm"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
      <div className="mt-3 d-flex flex-column">
        <Link href={`/filmes/${imdbID}`} target="_blank" className="link-light">
          <span className="fw-semibold fs-6">{Title}</span>
        </Link>
        <span className="text-gray-300 fs-7">{Year}</span>
      </div>
    </div>
  )
}

export type { MovieProps }
export default MovieCard
