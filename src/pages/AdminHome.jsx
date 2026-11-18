import { getAdminusersAll } from '@/fetures/admin/AdminService/Adminservice'
import UsersTable from '@/fetures/admin/components/UsersTable'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const AdminHome = () => {

    const{data, isLoading, error} = useQuery({
        queryKey:["AdminUsers"],
        queryFn:getAdminusersAll
    })
    
  return (
    <div className='grid grid-cols-1 gap-4'>
        <UsersTable users={data?.users} pagination={data?.pagination}/>
    </div>
  )
}

export default AdminHome