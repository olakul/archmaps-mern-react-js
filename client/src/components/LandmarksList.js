import React from 'react'
import { Link } from 'react-router-dom';

export default function LandmarksList(props) {
  return (
    <div>
      {props.landmarks.map(landmark => {
        return (
          <h3 key={landmark._id}>
            <Link to={`/landmarks/${landmark._id}`}>{landmark.title}</Link>
          </h3>
        )
      })}
    </div>
  )
}