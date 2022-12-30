import { useState } from 'react'

import Swal from 'sweetalert2'

import { useAuthContext } from '../../../contexts/AuthContext'
import { tstapi } from '../../../service/api'
import { sweetAlertDefaultParams } from '../../../utils/sweetAlert2'

interface MovieReviewProps {
  comment: string
  imdbID: string
  user: {
    name: string
  }
  stars: number
  handleRefetchReviews: () => void
}

const MovieReviewCard = ({
  comment,
  user,
  imdbID,
  handleRefetchReviews,
}: MovieReviewProps) => {
  const { currentUser } = useAuthContext()

  const [isRemoving, setIsRemoving] = useState(false)

  const isOwnReview = currentUser && currentUser.name == user.name

  const handleRemoveReview = () => {
    setIsRemoving(true)
    tstapi
      .delete(`/reviews/${imdbID}`)
      .then((response) => {
        handleRefetchReviews()
        Swal.fire({
          ...sweetAlertDefaultParams,
          icon: 'success',
          title: 'Tudo certo!',
          text: response.data.msg,
        })
      })
      .catch((error) => {
        Swal.fire({
          ...sweetAlertDefaultParams,
          icon: 'error',
          title: 'Ops, houve um problema...',
          text: error.response.data.msg,
        })
      })
      .finally(() => setIsRemoving(false))
  }

  return (
    <div
      className={`d-flex flex-column bg-white rounded-3 p-3 ${
        isOwnReview ? 'border border-dark border-2 shadow' : 'shadow-sm'
      }`}
    >
      <div className="d-flex flex-column mb-2">
        <span className="text-dark fw-bold">{user.name}</span>
        <span className="text-gray-600 fs-8">
          {isOwnReview ? 'Sua avaliação' : 'Usuário do MoviesDB'}
        </span>
      </div>
      <div className="mb-2 text-gray-600">{comment}</div>
      <div>
        {isOwnReview && (
          <button
            type="button"
            className="btn btn-link btn-sm"
            onClick={handleRemoveReview}
            disabled={isRemoving}
          >
            {isRemoving ? 'Apagando...' : 'Apagar'}
          </button>
        )}
      </div>
    </div>
  )
}

export type { MovieReviewProps }
export default MovieReviewCard
