import React from 'react'
import { useLocation } from 'react-router-dom';

const EditRequetsDetails = () => {
  const location = useLocation();

  const {requestId} = location.state;
  console.log(requestId)
  return (
    <div>EditRequetsDetails: {requestId}</div>
  )
}

export default EditRequetsDetails