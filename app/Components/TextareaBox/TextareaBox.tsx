import React from 'react'

import styles from './TextareaBox.module.css'


interface Props{
  labelText:string,
  Id:string,
  value:string,
  fieldValidation?:string,
  onChange?:(event:React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaBox = (
  {
    labelText,
    Id,
    value,
    fieldValidation,
    onChange
  }:Props
) => {
  return (
    <div className={styles.TextareaBox}>
      <label htmlFor={Id}>{labelText}</label>
      {
        fieldValidation && (
      <span className={styles.ErrorMessage}>
        {fieldValidation}
      </span>
        )
      }
      <br />
      <textarea
        id={Id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
