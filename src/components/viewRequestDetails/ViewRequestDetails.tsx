import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewRequestDetails = () => {
  const location = useLocation();

  const {requestId} = location.state;
  console.log(requestId)
  return (
    <div>ViewRequestDetails: {requestId}</div>
  )
}

export default ViewRequestDetails