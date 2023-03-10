import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Reaptcha from 'reaptcha'
import Swal from 'sweetalert2'

import { useAuthContext } from '../contexts/AuthContext'
import { tstapi } from '../service/api'
import { sweetAlertDefaultParams } from '../utils/sweetAlert2'

type LoginFormData = {
  email: string
  password: string
  recaptcha: boolean
}

const LoginPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>()
  const { setLoginData } = useAuthContext()

  const onSubmit = (data: LoginFormData) => {
    setIsSubmitting(true)
    tstapi
      .post('/auth/signin', data)
      .then((response) => {
        setLoginData(response.data.user)
        router.push('/')
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

  return (
    <>
      <Head>
        <title>Movies DB | Entrar</title>
      </Head>
      <div className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="py-4 mb-4 animate__animated animate__fadeInDown">
          <Link className="text-center" href="/">
            <span className="fs-1 text-primary text-uppercase fw-bold">
              Movies
            </span>
            <span className="fs-1 text-white text-uppercase fw-bolder">DB</span>
          </Link>
        </div>
        <div className="animate__animated animate__fadeInUp w-90 mw-400px">
          <div className="py-5 px-4 px-sm-5 bg-white rounded-3 shadow-lg">
            <h3 className="fs-3 text-dark mb-4 text-center fw-bold">
              Faça login
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="E-mail"
                  {...register('email', {
                    required: 'Digite seu e-mail para entrar',
                  })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email?.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Senha"
                  {...register('password', {
                    required: 'Digite sua senha para entrar',
                  })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password?.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="hidden"
                  {...register('recaptcha', {
                    required: 'Confirme que você não é um rôbo',
                  })}
                />
                <Reaptcha
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onVerify={() => setValue('recaptcha', true)}
                />
                {errors.recaptcha && (
                  <div className="invalid-feedback d-block">
                    {errors.recaptcha?.message}
                  </div>
                )}
              </div>

              <div className="mt-4 d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4 text-center">
            <Link href="/crie-sua-conta" className="btn btn-link">
              Ainda não tenho conta
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
