"use client"
import React, { useEffect, useState } from 'react'

import styles from './ProfileData.module.css'

// Next Auth
import { useSession } from 'next-auth/react'

export const ProfileData = () => {

  const {data: session} = useSession()

  const [name, setName] = useState<string>('')


  useEffect(() =>{
     if(session?.user?.name){
      setName(session.user.name)
     }
  }, [])

  return (
    <div className={styles.ProfileData}>
       <form>
          <p className={styles.UserId}>
             User Id: <span>{session?.user?.id ?? 'No Id'}</span>
          </p>
          <h5>Welcome : <span>{session?.user?.name}</span></h5>

          <input
          type="text"
          value={session?.user?.email ?? ''}
          onChange={()=>{}}
          disabled />
       </form>
    </div>
  )
}
