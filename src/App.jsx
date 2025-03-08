import React from 'react'
import './App.css'
import SpaceXLaunches from './components/SpaceXLaunches'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">SpaceX Launches</h1>
      <SpaceXLaunches />
    </div>
  )
}

export default App
