import React from 'react'

import styles from './page.module.css'



import { AdminContent } from './_components/AdminContent/AdminContent'

export const metadata = {
    title:"Welcome Admin"
}

const Adminpage = () => {
  return (
    <div className={styles.Adminpage}>
        <AdminContent/>
    </div>
  )
}

export default Adminpage