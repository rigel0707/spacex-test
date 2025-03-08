import React from 'react'

const LaunchCard = React.forwardRef(({ launch }, ref) => {
  console.log(launch)
  let launchStatus = 'ongoing'
  let launchDetails = ''

  if (launch.launch_success === true) {
    launchStatus = 'Success'
  } else {
    launchStatus = 'Failed'
  }

  if (launch.details) {
    launchDetails = launch.details
  }

  return (
    <div ref={ref} className="border rounded-lg p-4 shadow-lg bg-white">
      <h3 className="text-xl font-bold">
        {launch.mission_name} <span>{launchStatus}</span>
      </h3>
      <p className="text-gray-700">Launch Year: {launch.launch_year}</p>
      <p className="text-gray-700">{launchDetails}</p>
      {launch.links.mission_patch && (
        <img
          src={launch.links.mission_patch}
          alt="launch_img"
          className="w-24 h-24 mx-auto my-2"
        />
      )}
    </div>
  )
})

export default LaunchCard
