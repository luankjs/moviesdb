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

export default MovieMember
