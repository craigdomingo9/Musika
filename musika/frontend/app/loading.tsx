"use client";
import React from 'react'
import { BarLoader } from "react-spinners";

function loading() {
  return (
    <div className='grid h-screen'>
      <BarLoader
        color="#dec42d"
        className='m-auto'
        />
    </div>
  )
}

export default loading