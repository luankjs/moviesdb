import { useEffect, useState } from 'react'

import _ from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'

import Layout from '../../domain/Layout'
import { MovieProps } from '../../domain/Movie'
import { omdbApi } from '../../service/api'
import { sweetAlertDefaultParams } from '../../utils/sweetAlert2'

const MovieInfo = ({
  title,
  text,
  icon,
  className,
}: {
  title: string
  text?: string
  icon: string
  className?: string
}) => {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <i className={`far fa-${icon} text-secondary me-3 fs-5`}></i>
      <div className="d-flex flex-column">
        <span className="fw-semibold fs-8">{title}</span>
        <span className="text-gray-300 fs-8">{text}</span>
      </div>
    </div>
  )
}

const MovieMember = ({
  name,
  role,
  className,
}: {
  name: string
  role: string
  className: string
}) => {
  return (
    <div className={`d-flex flex-column ${className}`}>
      <span className="fw-semibold fs-8">{name}</span>
      <span className="text-gray-300 fs-8">{role}</span>
    </div>
  )
}

const MoviePage = () => {
  const router = useRouter()
  const { imdbid } = router.query

  const [isLoading, setIsLoading] = useState(false)
  const [movie, setMovie] = useState<MovieProps | null>(null)

  useEffect(() => {
    if (imdbid) {
      setIsLoading(true)
      omdbApi
        .get('/', {
          params: {
            i: imdbid,
            apiKey: process.env.NEXT_PUBLIC_OMBD_API_KEY,
          },
        })
        .then((response) => {
          setMovie(response.data)
        })
        .catch(() => {
          Swal.fire({
            ...sweetAlertDefaultParams,
            icon: 'error',
            title: 'Ops, houve um problema...',
            text: 'Tente novamente em instantes',
          })
        })
        .finally(() => setIsLoading(false))
    }
  }, [imdbid])

  return (
    <Layout>
      <Head>
        <title>Movies DB | Filmes</title>
      </Head>
      {isLoading ? (
        <div className="w-100 d-flex align-items-center justify-content-center mt-5 pt-5">
          <ReactLoading
            type="spinningBubbles"
            height={64}
            width={64}
            className="me-4"
          />
          <span className="fs-5">Carregando dados do filmes...</span>
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center align-items-center mt-5">
            <div className="col-md-4 col-lg-3 mb-5 mb-md-0">
              <div className="ratio ratio-2x3 position-relative rounded-3 overflow-hidden shadow-lg">
                <Image
                  src={
                    movie?.Poster != 'N/A'
                      ? movie?.Poster
                      : '/movie-poster-placeholder.jpg'
                  }
                  alt={movie?.Title ?? 'Movie Title'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-md-8 col-lg-7">
              <div className="px-md-2 px-xl-4">
                <h1 className="fw-semibold">{movie?.Title}</h1>
                <p className="text-gray-600">{movie?.Plot}</p>
                <div className="my-4">
                  <button className="btn btn-primary">
                    <i className="far fa-heart me-2"></i>
                    <span>Favoritar</span>
                  </button>
                  <Link
                    href={`https://www.imdb.com/title/${movie?.imdbID}`}
                    className="btn btn-outline-primary ms-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no IMDb
                  </Link>
                </div>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center w-100 my-4">
                  <MovieInfo
                    title="Lançamento"
                    text={movie?.Released}
                    icon="calendar"
                    className="flex-fill mb-3 mb-sm-0"
                  />
                  <div className="d-none d-sm-inline-block vr mx-4"></div>
                  <MovieInfo
                    title="Tempo de duração"
                    text={movie?.Runtime}
                    icon="clock"
                    className="flex-fill mb-3 mb-sm-0"
                  />
                  <div className="d-none d-sm-inline-block vr mx-4"></div>
                  <MovieInfo
                    title="Orçamento"
                    text={movie?.BoxOffice}
                    icon="dollar-sign"
                    className="flex-fill mb-3 mb-sm-0"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="fs-6 text-secondary mb-2">Equipe Técnica</h2>
                  <div className="d-flex flex-column flex-sm-row flex-wrap align-items-sm-center w-100">
                    {movie?.Director &&
                      _.split(movie?.Director, ', ').map((director: string) => (
                        <MovieMember
                          key={director}
                          name={director}
                          role="Diretor"
                          className="me-5 mb-3"
                        />
                      ))}
                    {movie?.Writer &&
                      _.split(movie?.Writer, ', ').map((writer: string) => (
                        <MovieMember
                          key={writer}
                          name={writer}
                          role="Roteirista"
                          className="me-5 mb-3"
                        />
                      ))}
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="fs-6 text-secondary mb-2">Elenco Principal</h2>
                  <div className="d-flex flex-column flex-sm-row flex-wrap align-items-sm-center w-100">
                    {movie?.Actors &&
                      _.split(movie?.Actors, ', ').map((actor: string) => (
                        <MovieMember
                          key={actor}
                          name={actor}
                          role="Ator"
                          className="me-5 mb-3"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MoviePage
