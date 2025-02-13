"use client"

import React from 'react'

import styles from './AdminContent.module.css'
import { signOut } from 'next-auth/react'

export const AdminContent = () => {
  return (
 <>
   <button
       onClick={() => signOut()}
      className={styles.LogoutBtn}>
         Logout Now
      </button>
       <div className={styles.AdminContent}>
         <div>
         <h6>Welcome <span>Admin</span></h6>

         <h5>Have a Great Day

            <br />
            Add Features As Per Your Need
         </h5>
         </div>
    </div>
 </>
  )
}
