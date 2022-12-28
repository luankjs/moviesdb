import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import Head from 'next/head'

import { tstapi } from "../service/api"

import { sweetAlertDefaultParams } from "../utils/sweetAlert2";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpFormData>();
  
  const onSubmit = (data: SignUpFormData) => {
    setIsSubmitting(true)
    
    tstapi.post('/auth/signup', data)
      .then((response) => {
        reset({name: '', email: '', password: ''})
        const user = response.data.user
        Swal.fire({
          ...sweetAlertDefaultParams, 
          icon: 'success',
          title: `Tudo certo, ${user.name}!`, 
          text: 'Sua conta foi criada com sucesso', 
          confirmButtonText: 'Ir para o login'
        }).then((result) => {
          if (result.isConfirmed) router.push('/entrar')
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

  return (
    <>
      <Head>
        <title>Movies DB | Crie sua conta</title>
      </Head>
      <div className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="py-4 mb-4 animate__animated animate__fadeInDown">
          <Link className="text-center" href="/">
            <span className="fs-1 text-primary text-uppercase fw-bold">Movies</span>
            <span className="fs-1 text-white text-uppercase fw-bolder">DB</span>
          </Link>
        </div>
        <div className="animate__animated animate__fadeInUp w-90 mw-400px">
          <div className="py-5 px-4 px-sm-5 bg-white rounded-3 shadow-lg">
            <h3 className="fs-3 text-dark mb-4 text-center fw-bold">Crie sua conta</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input 
                  type="name" 
                  className="form-control form-control-lg" 
                  placeholder="Nome" 
                  {
                    ...register(
                      "name", { required: "Digite seu nome para se cadastrar" }
                    )
                  } 
                  aria-invalid={errors.name ? "true" : "false"} 
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name?.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  placeholder="E-mail" 
                  {...register(
                    "email", 
                    { 
                      required: "Digite seu e-mail para se cadastrar", 
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Digite um e-mail válido"
                      } 
                    }
                  )} 
                  aria-invalid={errors.email ? "true" : "false"} 
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
                  {...register(
                    "password", 
                    { 
                      required: "Digite sua senha para se cadastrar",
                      minLength: {
                        value: 8,
                        message: 'Digite uma senha com pelo menos 8 dígitos'
                      }
                    }
                  )}
                  aria-invalid={errors.password ? "true" : "false"} 
                />
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password?.message}
                  </div>
                )}
              </div>
              
              <div className="mt-4 d-grid gap-2">
                <button 
                  className="btn btn-primary btn-lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Criando conta...' : 'Criar conta'}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4 text-center">
            <Link 
              href="/entrar" 
              className="btn btn-link"
            >
              Já tenho uma conta
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage