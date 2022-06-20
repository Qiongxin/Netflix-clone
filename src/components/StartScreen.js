import React, { useState } from 'react'
import styled from 'styled-components'
import SignIn from './SignIn'

function StartScreen() {
  const [signIn, setSignIn] = useState(false)

  return (
    <Container>
        <Header>
            <LogoImg src='https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png' alt='netflix logo' />
            <SignInButton onClick={() => setSignIn(true)}>Sign In</SignInButton>
        </Header>
        {signIn ? <SignIn /> :
        <Contents>
            <h1>Unlimited films, TV programmes and More.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <form>
                <input type="email" placeholder='Email address' />
                <button onClick={() => setSignIn(true)}>Get Started</button>
            </form>
        </Contents>
        }
        <BgImage>
        </BgImage>
    </Container>
  )
}

export default StartScreen

const Container = styled.div`
    background: url('https://miro.medium.com/max/1400/1*5lyavS59mazOFnb55Z6znQ.png') center no-repeat;
    background-size: cover;
    height: 100vh;
    position: relative;
`
const Header = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
`

const LogoImg = styled.img`
    width: 120px;
    height: 80px;
    cursor: pointer;
`

const SignInButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: #E50914;
    padding: 10px 20px;
    color: white;
    border-radius: 2px;
    font-weight: 600;
    font-size: 1rem;
`
const Contents = styled.div`
    color: white;
    position: absolute;
    text-align: center;
    padding: 20px;
    top: 30%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin-bottom: 20px;
        font-size: 2.5rem;
    }

    h2 {
        font-size: 1.7rem;
        font-weight: 400;
        margin-bottom: 30px;
    }
    
    h3 {
        font-weight: 400;
        font-size: 1.1rem;
    }

    form {
        margin: 20px;
    }

    form > input {
        padding: 14.5px 300px 16px 15px;
        border: none;
        outline: none;
        max-width: 600px;
        font-size: 1.1rem;
    }

    form > button {
        padding: 16px 20px;
        border: none;
        background-color: #E50914;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: 600;
    }
`

const BgImage = styled.div`
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.8) 100%
    );
`