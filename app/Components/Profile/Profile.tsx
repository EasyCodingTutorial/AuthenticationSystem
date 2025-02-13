"use client"
import React from 'react'

import styles from './Profile.module.css'

// Next Auth
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

// Components
import { FullPageLodingAni } from '../Animation/FullPageLodingAni/FullPageLodingAni'
import { ProfileData } from './ProfileData/ProfileData'

export const Profile = () => {

    const router = useRouter()

    const {status} = useSession()

    if(status === 'unauthenticated'){
        router.replace('/')
    }

    if(status === 'loading'){
        <FullPageLodingAni/>
    }

    if(status === 'authenticated'){

  return (
     <>
      <button
       onClick={() => signOut()}
      className={styles.LogoutBtn}>
         Logout Now
      </button>
      <div  className={styles.Profile}>
        <ProfileData/>
    </div>
     </>
  )
}

}