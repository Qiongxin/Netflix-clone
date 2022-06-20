import React, { useRef } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'

function SignIn() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
  }
  const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => {
            alert(error.message)
        })
  }

  return (
    <Container>
            <form>
                <h1>Sign In</h1>
                <input ref = {emailRef} type="email" placeholder='Email'/>
                <input ref = {passwordRef} type="password" placeholder='Password'/>
                <button type="submit" onClick = {signIn}>Sign In</button>
                <h4 onClick = {register}>New to Netflix? <span>Sign up now</span></h4>
            </form>
    </Container>
  )
}

export default SignIn

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    form {
        top: 20%;
        max-width: 400px;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 70px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;

        h1 {
            margin-bottom: 25px;
        }

        input {
            padding: 12px 100px 12px 20px;
            border: none;
            margin-bottom: 14px;
            border-radius: 3px;
            outline: none;
        }
        
        button {
            padding: 13px;
            font-size: 1rem;
            background-color: #E50914;
            color: white;
            border: none;
            font-weight: 600;
            margin: 20px 0 30px 0;
            border-radius: 5px;
            cursor: pointer;
        }

        h4 {
            color: grey;
        }

        h4 > span {
            cursor: pointer;
            color: white;

            :hover {
                text-decoration: underline;
            }
        }
    }
`