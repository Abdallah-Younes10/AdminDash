import React, { Children } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../NavBar/Navbar'
import { SideBar } from '../SideBar/SideBar'
import { Footer } from '../Utalitis/Footer'

export const Layout = () => {
  return (
    <>
    <Navbar/>
    <SideBar/>
        <Outlet></Outlet>
        <Footer/>
    </>
  )
}
