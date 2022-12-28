import Link from "next/link"
import { useForm } from "react-hook-form"

type LoginFormData = {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData) => console.log(data)

  return (
    <div className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="py-4 mb-4 animate__animated animate__fadeInDown">
        <Link className="text-center" href="/">
          <span className="fs-1 text-primary text-uppercase fw-bold">Movies</span>
          <span className="fs-1 text-white text-uppercase fw-bolder">DB</span>
        </Link>
      </div>
      <div className="animate__animated animate__fadeInUp w-90 mw-400px">
        <div className="py-5 px-4 px-sm-5 bg-white rounded-3 shadow-lg">
          <h3 className="fs-3 text-dark mb-4 text-center fw-bold">Faça login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input type="email" className="form-control form-control-lg" placeholder="E-mail" {...register("email", { required: "Digite seu e-mail para entrar" })} aria-invalid={errors.email ? "true" : "false"} />
              {errors.email && (
                <div className="invalid-feedback d-block">
                  {errors.email?.message}
                </div>
              )}
            </div>
            
            <div className="mb-3">
              <input type="password" className="form-control form-control-lg" placeholder="Senha" {...register("password", { required: "Digite sua senha para entrar" })} aria-invalid={errors.password ? "true" : "false"} />
              {errors.password && (
                <div className="invalid-feedback d-block">
                  {errors.password?.message}
                </div>
              )}
            </div>
            
            <div className="mt-4 d-grid gap-2">
              <button className="btn btn-primary btn-lg">Entrar</button>
            </div>
          </form>
        </div>
        <div className="mt-4 text-center">
          <Link href="/crie-sua-conta" className="btn btn-link">Ainda não tenho conta</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage