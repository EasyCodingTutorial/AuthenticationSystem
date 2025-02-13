import React from 'react'

import styles from './InputBox.module.css'

interface Props{
    labelText:string,
    Id:string,
    InputType:string,
    value:string,
    fieldValidation?:string,
    disabaled?:boolean,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = (
    {
        labelText,
        Id,
        InputType,
        value,
        disabaled,
        fieldValidation,
        onChange
    }:Props
) => {
  return (
    <div className={styles.InputBox}>
        <label htmlFor={Id}>{labelText}</label>

          {
            fieldValidation && (
              <span
              className={styles.ErrorMessage}>
              {fieldValidation}
            </span>
            )
          }



        <br />
        <input
        id={Id}
        value={value}
         type={InputType}
         disabled={disabaled}
         className={fieldValidation ? styles.InputBoxError : ''}
          onChange={onChange}
         />
    </div>
  )
}
