import { useEffect, useState } from 'react'

import _ from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'

import { useAuthContext } from '../../contexts/AuthContext'
import Layout from '../../domain/Layout'
import { MovieProps } from '../../domain/Movie/Card'
import MovieInfo from '../../domain/Movie/Info'
import MovieMember from '../../domain/Movie/Member'
import MovieReview, { MovieReviewProps } from '../../domain/Movie/Review/Card'
import MovieReviewModal from '../../domain/Movie/Review/Modal'
import { omdbApi, tstapi } from '../../service/api'
import { sweetAlertDefaultParams } from '../../utils/sweetAlert2'

const MoviePage = () => {
  const router = useRouter()
  const { imdbid } = router.query
  const { currentUser, currentUserReviews } = useAuthContext()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [movie, setMovie] = useState<MovieProps | null>(null)
  const [movieReviews, setMovieReviews] =
    useState<Array<MovieReviewProps> | null>(null)

  const getMovieDetails = () => {
    omdbApi
      .get('/', {
        params: {
          i: imdbid,
          apiKey: process.env.NEXT_PUBLIC_OMBD_API_KEY,
        },
      })
      .then((response) => {
        setMovie(response.data)
        setIsLoadingReviews(true)
        getMovieReviews()
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

  const getMovieReviews = () => {
    tstapi
      .get(`/reviews/${imdbid}`)
      .then((response) => {
        setMovieReviews(response.data.reviews)
      })
      .catch((error) => {
        console.log(error.response)
      })
      .finally(() => setIsLoadingReviews(false))
  }

  useEffect(() => {
    if (imdbid) {
      setIsLoading(true)
      getMovieDetails()
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
          <span className="fs-5">Carregando dados do filme...</span>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="row justify-content-center align-items-center my-5">
              <div className="col-md-4 col-lg-3 mb-5 mb-md-0">
                <div className="ratio ratio-2x3 position-relative rounded-3 overflow-hidden shadow-lg">
                  <Image
                    src={
                      movie && movie.Poster != 'N/A'
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
                        movie?.Director != 'N/A' &&
                        _.split(movie?.Director, ', ').map(
                          (director: string) => (
                            <MovieMember
                              key={director}
                              name={director}
                              role="Diretor"
                              className="me-5 mb-3"
                            />
                          )
                        )}
                      {movie?.Writer &&
                        movie?.Writer != 'N/A' &&
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
                    <h2 className="fs-6 text-secondary mb-2">
                      Elenco Principal
                    </h2>
                    <div className="d-flex flex-column flex-sm-row flex-wrap align-items-sm-center w-100">
                      {movie?.Actors &&
                        movie?.Actors != 'N/A' &&
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
          <div className="my-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-10">
                  <h2 className="fs-3 mb-3">Avalições</h2>
                </div>
              </div>
            </div>
            <div className="bg-cyan-800 pt-5 p-md-5">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-10">
                    {isLoadingReviews && !movieReviews ? (
                      <div className="w-100 d-flex align-items-center justify-content-center">
                        <ReactLoading
                          type="spinningBubbles"
                          height={48}
                          width={48}
                          className="me-4"
                        />
                        <span className="fs-6">
                          Carregando avaliações do filme...
                        </span>
                      </div>
                    ) : movieReviews && movieReviews.length > 0 ? (
                      <div className="row">
                        {movieReviews?.map((movieReview, i) => (
                          <div
                            key={i}
                            className="col-sm-6 col-md-4 col-lg-3 mb-3"
                          >
                            <MovieReview
                              {...movieReview}
                              handleRefetchReviews={getMovieReviews}
                            />
                          </div>
                        ))}
                        {currentUser ? (
                          !_.find(currentUserReviews, {
                            user: { name: currentUser.name },
                            imdbID: imdbid,
                          }) && (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-3 p-3 border border-cyan-700 border-2 h-100 cursor-pointer"
                                onClick={() => setShowReviewModal(true)}
                              >
                                <i className="far fa-plus me-3 text-cyan-600"></i>
                                <span className="text-cyan-600">
                                  Escreva sua avaliação
                                </span>
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                            <Link href="/entrar">
                              <div className="d-flex align-items-center justify-content-center rounded-3 p-3 border border-cyan-700 border-2 h-100 cursor-pointer">
                                <i className="far fa-plus me-3 text-cyan-600"></i>
                                <span className="text-cyan-600">
                                  Faça login para escrever sua avaliação
                                </span>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <span className="fs-5 text-gray-400">
                          Esse filme não tem avalições ainda.
                        </span>
                        {currentUser ? (
                          <button
                            className="btn btn-link"
                            onClick={() => setShowReviewModal(true)}
                          >
                            Escreve a primeira avalição
                          </button>
                        ) : (
                          <Link href="/entrar" className="btn btn-link">
                            Faça login para escrever sua avaliação
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {movie && (
        <MovieReviewModal
          show={showReviewModal}
          movieImdbId={movie?.imdbID}
          onHide={(record) => {
            if (record) getMovieReviews()
            setShowReviewModal(false)
          }}
        />
      )}
    </Layout>
  )
}

export default MoviePage
