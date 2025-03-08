import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import LaunchCard from '../components/LaunchCard'
import LoadingSpinner from '../components/LoadingSpinner'
// import '../styles/SpaceXLaunches.css'

const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')
  const observer = useRef()

  useEffect(() => {
    fetchLaunches()
  }, [page, search])

  const fetchLaunches = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches`,
        {
          params: {
            limit: 10,
            offset: (page - 1) * 10,
            mission_name: search,
          },
        }
      )
      setLaunches((prev) => [...prev, ...response.data])
      setHasMore(response.data.length > 0)
    } catch (error) {
      console.error('Error fetching launches', error)
    }
    setLoading(false)
  }

  const lastLaunchRef = (node) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  }

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search launches..."
        value={search}
        onChange={(e) => {
          setLaunches([])
          setPage(1)
          setSearch(e.target.value)
        }}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid grid-cols-1 gap-4">
        {launches.map((launch, index) => (
          <LaunchCard
            key={launch.flight_number}
            ref={index === launches.length - 1 ? lastLaunchRef : null}
            launch={launch}
          />
        ))}
      </div>
      {loading && <LoadingSpinner />}
      {!hasMore && <p className="text-center">No more launches to load.</p>}
    </div>
  )
}

export default SpaceXLaunches
