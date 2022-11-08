import React from 'react';
import useFetch from '../../components/hooks/useFetch';

const User = () => {
      const {data, loading,error} = useFetch(`http://localhost:4000/api/user/`)

      console.log(error)
  return (
    <div>User</div>
  )
}

export default User