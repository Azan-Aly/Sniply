import React, { useEffect } from 'react'
import axios from 'axios'
const RefreshToken = () => {

    const refreshingTokens = async () => {
        const response = await axios.get("http:localhost/api/v1/users/refresh")
        console.log(response.data) 
    }
    useEffect(() => {
      refreshingTokens()

    }, [])
    
  return (
    <div>
        
    </div>
  )
}

export default RefreshToken