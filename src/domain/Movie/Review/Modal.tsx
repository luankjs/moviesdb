import { useState } from 'react'

import { Modal } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Rating from 'react-rating'
import Swal from 'sweetalert2'

import { tstapi } from '../../../service/api'
import { sweetAlertDefaultParams } from '../../../utils/sweetAlert2'

interface ReviewModalProps {
  show: boolean
  movieImdbId: string
  // eslint-disable-next-line no-unused-vars
  onHide: (record?: any) => void
}

type ReviewFormData = {
  comment: string
  stars: number
}

const MovieReviewModal = ({ show, movieImdbId, onHide }: ReviewModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>()

  const onSubmit = (data: ReviewFormData) => {
    setIsSubmitting(true)

    tstapi
      .post(`/reviews/${movieImdbId}`, data)
      .then((response) => {
        Swal.fire({
          ...sweetAlertDefaultParams,
          icon: 'success',
          title: 'Tudo certo!',
          text: response.data.msg,
        }).then((result) => {
          if (result.isConfirmed) handleHide(response.data)
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
      .finally(() => setIsSubmitting(false))
  }

  const handleHide = (record?: any) => {
    reset({ comment: '', stars: 0 })
    onHide(record)
  }

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Body>
        <h3 className="fw-bold mb-4">Escreva sua avalição</h3>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <textarea
                rows={4}
                className="form-control form-control-lg"
                placeholder="Escreva seu comentário"
                {...register('comment', {
                  required: 'Escreva seu comentário antes de enviar',
                })}
                aria-invalid={errors.comment ? 'true' : 'false'}
              />
              {errors.comment && (
                <div className="invalid-feedback d-block">
                  {errors.comment?.message}
                </div>
              )}
            </div>
            <div className="mb-3">
              <Controller
                control={control}
                name="stars"
                render={({ field: { onChange, value } }) => (
                  <div className="d-flex align-items-center">
                    <span className="fs-7 text-gray-600 me-2">
                      Dê sua nota:
                    </span>
                    <Rating
                      emptySymbol="fa fa-star-o fs-4 text-warning"
                      fullSymbol="fa fa-star fs-4 text-warning"
                      fractions={2}
                      onChange={onChange}
                      initialRating={value}
                    />
                  </div>
                )}
              />
              {errors.comment && (
                <div className="invalid-feedback d-block">
                  {errors.comment?.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default MovieReviewModal
