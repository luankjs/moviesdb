import Head from 'next/head'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import InfiniteScroll from "react-infinite-scroll-component"

import Layout from '../domain/Layout'
import { omdbApi } from '../service/api'
import { sweetAlertDefaultParams } from "../utils/sweetAlert2"
import Movie, {MovieProps} from '../domain/Movie'

type SearchFormData = {
  searchTerm: string;
}

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [totalMovies, setTotalMovies] = useState(0)
  const [movies, setMovies] = useState<Array<MovieProps> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, getValues } = useForm<SearchFormData>()

  const onSubmit = (data: SearchFormData) => {
    setIsLoading(true)
    setPage(1)
    omdbApi.get('/', { 
      params: { 
        s: data.searchTerm,
        apiKey: process.env.NEXT_PUBLIC_OMBD_API_KEY,
        page: page
      } 
    })
      .then((response) => {
        const {Response: status, Search: records, totalResults: total} = response.data
        if (status == "True") {
          setMovies(records)
          setTotalMovies(total)
        }
        if (status == "False") {
          setMovies([])
          setTotalMovies(0)
        }
      })
      .catch((error) => {
        Swal.fire({
          ...sweetAlertDefaultParams, 
          icon: 'error',
          title: 'Ops, houve um problema...', 
          text: 'Tente novamente em instantes', 
        })
      })
      .finally(() => setIsLoading(false))
  }

  const handleNextPage = () => {
    const searchTerm = getValues('searchTerm')

    omdbApi.get('/', { 
      params: { 
        s: searchTerm,
        apiKey: process.env.NEXT_PUBLIC_OMBD_API_KEY,
        page: page + 1
      } 
    })
      .then((response) => {
        setPage(page+1)
        const {Response: status, Search: records, totalResults: total} = response.data
        if (status == "True") setMovies([...movies ?? [], ...records])
      })
      .catch((error) => {
        Swal.fire({
          ...sweetAlertDefaultParams, 
          icon: 'error',
          title: 'Ops, houve um problema...', 
          text: 'Tente novamente em instantes', 
        })
      })
  }

  return (
    <Layout>
      <Head>
        <title>Movies DB | Filmes</title>
      </Head>
      <div className="bg-secondary py-5">
        <div className="container">
          <h2 className="fs-2 text-white mb-3">Buscar filme</h2>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column flex-sm-row">
              <input className="form-control form-control-lg mb-3 mb-sm-0 me-sm-3" type="text" {...register("searchTerm")} placeholder="Pesquise pelo título do filme" />
              <button className='btn btn-primary btn-lg'>Buscar</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {isLoading ? (
          <div className='w-100 d-flex align-items-center justify-content-center pt-5'>
            <ReactLoading
              type="spinningBubbles"
              height={64}
              width={64}
              className="me-4"
            />
            <span className='fs-5'>Buscando filmes...</span>
          </div>
        ) : (
          movies && movies.length > 0 ? (
            <InfiniteScroll
              className='row'
              dataLength={movies.length}
              next={handleNextPage}
              hasMore={movies.length < totalMovies}
              loader={
                <div className='w-100 d-flex align-items-center justify-content-center py-5'>
                  <ReactLoading
                    type="spinningBubbles"
                    height={64}
                    width={64}
                    className="me-4"
                  />
                  <span className='fs-5'>Carregando mais filmes...</span>
                </div>
              }
              endMessage={
                <div className='w-100 d-flex align-items-center justify-content-center py-5'>
                  <span className='fs-5'>Todos os filmes para a busca foram exibidos!</span>
                </div>
              }
            >

              {movies?.map(movie => (
                <div key={movie.imdbID} className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
                  <Movie  {...movie} />
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <div className='d-flex align-items-center'>
              {movies ? (
                <span className="fs-4 text-gray-400">Nenhum filme encontrado</span>
                ) : (
                <span className="fs-4 text-gray-400">Comece digitando um termo no campo de busca acima</span>
              )}
            </div>
          )
        )}
      </div>
    </Layout>
  )
}

export default HomePage
