interface MovieReviewProps {
  comment: string
  imdbID: string
  user: {
    name: string
  }
}

const MovieReview = ({ comment, user }: MovieReviewProps) => {
  return (
    <div className="d-flex flex-column bg-white rounded-3 shadow-sm p-3">
      <div className="d-flex flex-column mb-2">
        <span className="text-dark fw-bold">{user.name}</span>
        <span className="text-gray-600 fs-8">Usuário do MoviesDB</span>
      </div>
      <div className="text-gray-600">{comment}</div>
    </div>
  )
}

export type { MovieReviewProps }
export default MovieReview
