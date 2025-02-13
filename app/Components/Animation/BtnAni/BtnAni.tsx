import React from 'react'

import styles from './BtnAni.module.css'

const BtnAni = (
    {children}:{children:React.ReactNode}
) => {
  return (
    <div className={styles.BtnAni}>
        <div className={styles.Loader}></div>
        <div className={styles.Child}>
            {children}
        </div>
    </div>
  )
}

export default BtnAni