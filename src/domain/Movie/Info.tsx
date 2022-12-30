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
export default MovieInfo
