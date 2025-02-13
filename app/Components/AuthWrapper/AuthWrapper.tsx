import React from 'react'

import styles from './AuthWrapper.module.css'

const AuthWrapper = (
    {children}:{children:React.ReactNode}
) => {
  return (
    <div className={styles.AuthWrapper__Parent}>
        <video autoPlay muted loop src="/assets/AuthBg.mp4"></video>
        <div className={styles.AuthWrapper}>
        {children}
        </div>
    </div>
  )
}

export default AuthWrapper