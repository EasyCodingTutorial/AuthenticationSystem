"use client"
import React, { useEffect, useState } from 'react'

import styles from './AuthForm.module.css'

import Link from 'next/link'
import Image from 'next/image'

// For Components
import { InputBox } from '@/app/Components/InputBox/InputBox'
import { DropDown } from '@/app/Components/DropDown/DropDown'
import { TextareaBox } from '@/app/Components/TextareaBox/TextareaBox'
import BtnAni from '../Animation/BtnAni/BtnAni'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const user__Info  = [
  {
    value: 'Student' ,
    label:'Student'
  },
  {
    value: 'Working' ,
    label:'Working'
  },
  {
    value: 'Unemployed' ,
    label:'Unemployed'
  },
]

export const AuthForm = () => {


  const {data:session, status} = useSession()

  // For Input Fields
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [aboutYou, setAboutYou] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  // For Field Validation
  const [fieldValidation, setFieldValidation] = useState<string>('')

  const [errorMessage, SetErrorMessage] = useState<string>('')
  const [successMessage, SetSuccessMessage] = useState<string>('')

  const [varient, setVarient] = useState<'Login' | 'Register'>('Login')

  const [loading , setLoading] = useState<boolean>(false)

  const router = useRouter()

  const switchVarient = () =>{
    setVarient(varient === 'Login' ? 'Register' : 'Login')
  }

  // For Register Submit
  const RegisterSubmit: React.FormEventHandler<HTMLFormElement> = async(e) =>
    {
      e.preventDefault()

      // Small Validation
      if(!name.trim()){
        setFieldValidation('Name is Required')
        document.getElementById('Name')?.focus()
        return
      }else if(!email.trim()){
        setFieldValidation('Email is Required')
        document.getElementById('Email')?.focus()
        return
      }else if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )){
        setFieldValidation('Invalid Email Format')
        document.getElementById('Email')?.focus()
        return
      }else if(!password.trim()){
        setFieldValidation('Password is Required')
        document.getElementById('Password')?.focus()
        return
      }else if(password.length < 6){
        setFieldValidation('Password is Too Short(>5)')
        document.getElementById('Password')?.focus()
        return
      }else if(!aboutYou.trim()){
        setFieldValidation('This Field is Required')
        document.getElementById('UserDetails')?.focus()
        return
      }else if(!message.trim()){
        setFieldValidation('Message Field is Required')
        document.getElementById('Message')?.focus()
        return
      }
      setFieldValidation('')




      // if All Set Then
      try {
         setLoading(true)

        //  API REQ TO CHECK WHETHER TEH EMAIL ID ALREADY REGISTERED OR NOT
        const resUserExists:Response = await fetch('/api/auth/users/userExists', {
           method:'POST',
           headers:{
            'Content-type':'application/json',
           },
           body: JSON.stringify({
            email
           })
        })

        const {userCheck} = await resUserExists.json()

        if(userCheck){
          setName('')
          setPassword('')
          setAboutYou('')
          setMessage('')
          alert('Email ID Already Registered! Login Now')
          SetErrorMessage('Email ID Already Registered! Login Now')
          SetSuccessMessage('')
          switchVarient()
          return
        }


        //  API REQ TO REGISTER NEW USER
        const res:Response = await fetch('/api/auth/users/Register', {
          method:"POST",
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            name, email, password, aboutYou, message
          })
        })

        if(res.ok){
          setName('')
          setPassword('')
          setAboutYou('')
          setMessage('')
          SetErrorMessage('')
          SetSuccessMessage('Account Created!, Pls Login')
          switchVarient()
          return
        }else{
          SetSuccessMessage('')
          SetErrorMessage('Internal Server Error! Try Again')
        }



      } catch (error) {
        SetErrorMessage('Something Went Wrong')
        console.log(error)
      }finally{
        setLoading(false)
      }

    }


  // For Login Submit
  const LoginSubmit: React.FormEventHandler<HTMLFormElement> = async(e) =>{
    e.preventDefault()

    if(!email.trim()){
      setFieldValidation('Email is Required')
      document.getElementById('Email')?.focus()
      return
    }else if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    )){
      setFieldValidation('Invalid Email Format')
      document.getElementById('Email')?.focus()
      return
    }else if(!password.trim()){
      setFieldValidation('Password is Required')
      document.getElementById('Password')?.focus()
      return
    }

    setFieldValidation('')


    // Next Auth
    try {
      setLoading(true)
      const res = await signIn('credentials', {
        redirect:false,
        email, password
      })

      if(res?.error){
        setPassword('')
        console.log(res.error)
        SetSuccessMessage('')
        // alert('Wrong Credentials! Check Again')
        SetErrorMessage('Wrong Credentials! Check Again')

        return
      }

      // if The Credentials are right Then
      // alert("Logged In")


      // Now Lets Fetch The Logged In Users Data To Check Their Role

        //  API REQ TO CHECK WHETHER TEH EMAIL ID ALREADY REGISTERED OR NOT
        const resUserExists:Response = await fetch('/api/auth/users/userExists', {
          method:'POST',
          headers:{
           'Content-type':'application/json',
          },
          body: JSON.stringify({
           email
          })
       })

       const {userCheck} = await resUserExists.json()

      //  Now Lets Redirect User's as per their Role
      if(userCheck?.isAdmin){
        router.replace('/Admin')
      }else {
        router.replace('/Home')
      }




    } catch (error) {
      SetErrorMessage('Something Went Wrong')
    }finally{
      setLoading(false)
    }




  }


  useEffect(() =>{
    if(status === 'authenticated'){
      if((session?.user as {isAdmin: boolean | null | undefined}).isAdmin){
        router.replace('/Admin')
      }else{
        router.replace('/Home')
      }
    }
  }, [session, status, router])


  return (
    <div className={styles.AuthForm}>
        <form onSubmit={varient === 'Login' ? LoginSubmit : RegisterSubmit}>


            <div className={styles.LogoContainer}>
                <Link href={'/'}>
                  <Image
                    src={'/assets/logo.png'}
                    height={50}
                    width={50}
                    alt='logo'
                  />
                </Link>

                <h6>
                  {
                    varient === 'Login' ? 'Login Now': 'Register Now'
                  }
                </h6>
            </div>


             {
              varient === 'Register' && (
                <InputBox
                labelText='Your Name'
                Id='Name'
                value={name}
                InputType='text'
                fieldValidation={fieldValidation === 'Name is Required' ? fieldValidation : ''}
                onChange={(e)=>setName(e.target.value)}
                />
              )
             }


            <InputBox
              labelText='Your Email'
              Id='Email'
              value={email}
              InputType='email'
              fieldValidation={fieldValidation === 'Email is Required' || fieldValidation === 'Invalid Email Format' ? fieldValidation : ''}
              onChange={(e)=>setEmail(e.target.value)}
              />

             <InputBox
              labelText='Your Password'
              Id='Password'
              value={password}
              InputType='password'
              fieldValidation={fieldValidation === 'Password is Required' || fieldValidation === 'Password is Too Short(>5)' ? fieldValidation : ''}
                onChange={(e)=>setPassword(e.target.value)}
              />


              {
                varient === 'Register' && (
                  <>
                   {/* For Dropdown */}
              <DropDown
                labelText='Are You A'
                Id='UserDetails'
                options={user__Info}
                value={aboutYou}
                fieldValidation={fieldValidation === 'This Field is Required' ? fieldValidation : ''}
                onChange={(e)=>setAboutYou(e.target.value)}
               />

               {/* About You */}
               <TextareaBox
                 labelText='Tell Us About Yourself'
                 Id='Message'
                 value={message}
                 fieldValidation={fieldValidation === 'Message Field is Required' ? fieldValidation : ''}
                 onChange={(e)=>setMessage(e.target.value)}
               />


                  </>
                )
              }

              <button type='submit' className={styles.Btn}>
                {
                  varient === 'Login' ?
                   (
                    loading ? <BtnAni>Login...</BtnAni> : 'Login Now'
                   )
                  :
                  (
                    loading ? <BtnAni>Registering...</BtnAni> : 'Register Now'
                   )
                }
              </button>

              {/* For Error/Success Messages */}
              <div className={styles.MessageBox}>

                {
                  errorMessage && (
                    <p className={styles.ErrorMessage}>{errorMessage}</p>
                  )
                }
               {
                successMessage && (
                  <p className={styles.SuccessMessage}>{successMessage}
                  </p>
                )
               }
              </div>




              {/* For Custom Message Box */}
              <div className={styles.CustomMessage__Box}>
                 <p className={styles.CustomMessage__Box__Text}>
                  {
                    varient === 'Login' ? 'Dont Have An Account?' : 'Already Have An Account?'
                  }
                   <span onClick={switchVarient}>
                    {
                      varient === 'Login' ? ' Register Now!' : ' Login Now!'
                    }
                   </span>
                 </p>

                 <p className={styles.TOC}>
                  By Continuing you agree to <strong>Easy&apos;s</strong> <span>Terms of Use</span> and <span>Privacy Policy</span>
                 </p>
              </div>



        </form>
    </div>
  )
}
