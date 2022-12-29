import React, { PropsWithChildren } from 'react'

import Navbar from '../components/Navbar'

interface Props {}

const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
