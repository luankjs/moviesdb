import Link from 'next/link'
import React, { PropsWithChildren }  from 'react'
import { useAuthContext } from '../contexts/AuthContext'

interface Props {
}

const Navbar: React.FC<PropsWithChildren<Props>> = () => {
  const { currentUser, signOut} = useAuthContext()

  return (
    <nav className="navbar bg-dark py-4 shadow-lg">
      <div className="container-fluid container-md d-flex justify-content-between">
        <div className='' style={{flex: 1}}>
          <Link href="/" passHref>
            <i className="fas fa-home text-secondary fs-5"></i>
          </Link>
        </div>
        <Link className="navbar-brand py-0 text-center me-0" href="/">
          <span className="fs-4 text-primary text-uppercase fw-bold">Movies</span>
          <span className="fs-4 text-white text-uppercase fw-bolder">DB</span>
        </Link>
        <div className='d-flex justify-content-end' style={{flex: 1}}>
          {currentUser ? (
            <>
              <span className='fw-bold fs-6'>Olá, {currentUser.name}!</span>
              <button type='button' className='btn btn-link p-0 ms-3' onClick={signOut}>Sair</button>
            </>
          ) : (
            <>
              <Link href="/entrar">
                <button type='button' className='btn btn-primary btn-sm'>Entre</button>
              </Link>
              <Link href="/crie-sua-conta">
                <button type='button' className='btn btn-link btn-sm'>Cadastre-se</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar