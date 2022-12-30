import React, { PropsWithChildren } from 'react'

import _ from 'lodash'
import Link from 'next/link'

import { useAuthContext } from '../contexts/AuthContext'

interface Props {}

const Navbar: React.FC<PropsWithChildren<Props>> = () => {
  const { currentUser, signOut } = useAuthContext()

  return (
    <nav className="navbar bg-dark py-4 shadow-lg">
      <div className="container-fluid container-md d-flex justify-content-between">
        <div className="" style={{ flex: 1 }}>
          <Link
            href="/"
            passHref
            aria-label="Home"
            className="bg-secondary-hover bg-opacity-10-hover p-2 rounded"
          >
            <i className="fas fa-home text-secondary fs-5 me-2"></i>
            <span className="text-secondary">Inicial</span>
          </Link>
        </div>
        <Link className="navbar-brand py-0 text-center me-0" href="/">
          <span className="fs-4 text-primary text-uppercase fw-bold">
            Movies
          </span>
          <span className="fs-4 text-white text-uppercase fw-bolder">DB</span>
        </Link>
        <div className="d-flex justify-content-end" style={{ flex: 1 }}>
          {currentUser ? (
            <>
              <span className="fw-bold fs-6 d-none d-sm-block">
                Olá, {_.split(currentUser.name, ' ')[0]}!
              </span>
              <button
                type="button"
                className="btn btn-link p-0 ms-3"
                onClick={signOut}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/entrar">
                <button type="button" className="btn btn-primary btn-sm">
                  Entre
                </button>
              </Link>
              <Link href="/crie-sua-conta" className="d-none d-sm-block">
                <button type="button" className="btn btn-link btn-sm">
                  Cadastre-se
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
