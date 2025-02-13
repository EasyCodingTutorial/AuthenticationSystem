import React from 'react'

import styles from './DropDown.module.css'


interface Props{
    labelText:string,
    Id:string,
    value:string,
    fieldValidation?:string,
    options:{value:string, label:string}[],
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>) => void
}

export const DropDown = (
    {
        labelText,
        Id,
        value,
        fieldValidation,
        options,
        onChange
    }:Props
) => {
  return (
    <div className={styles.DropDown}>
        <label htmlFor={Id}>{labelText}</label>
        {
            fieldValidation && (
                <span className={styles.ErrorMessage}>{fieldValidation}</span>
            )
        }
        <br />

        <select name="" id={Id} value={value} onChange={onChange}>
            <option value="">Select an Option</option>

            {
                options.map((option) =>(
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
            }
        </select>
    </div>
  )
}
