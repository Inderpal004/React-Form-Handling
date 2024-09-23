import React from 'react'
import ReactFormHook from './components/ReactFormHook'
import ReactFormHookZod from './components/ReactFormHookZod'
import "./App.css";

export default function App() {
  return (
    <>
      <div className="app">
        <ReactFormHook />
      </div>
      <div className="app">
        <ReactFormHookZod />
      </div>
    </>
  )
}
