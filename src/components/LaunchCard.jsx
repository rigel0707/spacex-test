import React from 'react'

const LaunchCard = React.forwardRef(({ launch }, ref) => {
  console.log(launch)
  const launchDate = new Date(launch.launch_date_utc)
  const yearDifference = new Date().getFullYear() - launchDate.getFullYear()
  const years =
    yearDifference === 0
      ? 'this year'
      : yearDifference === 1
      ? '1 year ago'
      : yearDifference === -1
      ? 'in 1 year'
      : yearDifference < 0
      ? `in ${-yearDifference} years`
      : `${yearDifference} years ago`

  const launchStatus = launch.upcoming
    ? 'Upcoming'
    : launch.launch_success
    ? 'Success'
    : 'Failed'

  return (
    <div ref={ref} className="border rounded-lg p-4 shadow-lg bg-white">
      <h3 className="text-xl font-bold">
        {launch.mission_name} <span>{launchStatus}</span>
      </h3>
      <p className="text-gray-500">
        {years} |{' '}
        <span>
          <a
            href={launch.links.article_link}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Article
          </a>{' '}
          |{' '}
          <a
            href={launch.links.video_link}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Video
          </a>
        </span>
      </p>
      <p>
        <a
          href={launch.links.article_link}
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Article
        </a>{' '}
        |{' '}
        <a
          href={launch.links.video_link}
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Video
        </a>
      </p>
      <p>{launch.details || 'No details available.'}</p>
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
