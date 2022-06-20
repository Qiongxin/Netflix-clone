import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Navbar from './Navbar'
import Plans from './Plans'

function Profile() {
  const user = useSelector(selectUser)

  return (
    <Container>
        <Navbar />
        <Wrapper>
            <h1>Edit Profile</h1>
            <Info>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar" />
                <InfoDetail>
                    <h4>{user.email}</h4>
                    <PlanInfo>
                        <Plans />
                    </PlanInfo>
                    <button onClick={() => auth.signOut()}>Sign out</button>
                </InfoDetail>
            </Info>
        </Wrapper>
    </Container>
  )
}

export default Profile

const Container = styled.div`
    background-color: black;
    color: white;
    height: 100vh;
`

const Wrapper =styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;

    h1 {
        padding-top: 15%;
        font-size: 2.5rem;
    }

`

const Info = styled.div`
    display: flex;
    margin-top: 20px;

    img {
        width: 100px;
        height: 100px;
    }
`
const InfoDetail = styled.div`
    width: 500px;
    margin-left: 20px;

    h4 {
        background-color: gray;
        padding: 10px;
    }

    > button {
        width: 100%;
        padding: 10px 0;
        background-color: #E50419;
        color: white;
        border: none;
        font-weight: 600;
        cursor: pointer;
    }
`
const PlanInfo = styled.div``