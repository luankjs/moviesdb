import Link from 'next/link'
import React, { PropsWithChildren }  from 'react'

interface Props {
}

const Navbar: React.FC<PropsWithChildren<Props>> = () => {
  return (
    <nav className="navbar bg-dark py-4 shadow">
      <div className="container-fluid container-md d-flex justify-content-between">
        <div className='' style={{flex: 1}}>
          <Link href="/" passHref>
            <i className="fas fa-home text-secondary fs-5"></i>
          </Link>
        </div>
        <a className="navbar-brand py-0 text-center me-0" href="#">
          <span className="fs-4 text-primary text-uppercase fw-bold">Movies</span>
          <span className="fs-4 text-white text-uppercase fw-bolder">DB</span>
        </a>
        <div className='d-flex justify-content-end' style={{flex: 1}}>
          <Link href="">
            <button type='button' className='btn btn-primary btn-sm'>Entre</button>
          </Link>
          <Link href="">
            <button type='button' className='btn btn-link btn-sm'>Cadastre-se</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar