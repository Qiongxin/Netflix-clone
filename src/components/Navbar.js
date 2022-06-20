import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import db from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function Navbar() {
  const [show, setShow] = useState(false)
  const history = useNavigate()
  const user = useSelector(selectUser)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    db.collection('customers')
    .doc(user.uid)
    .collection('subscriptions')
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(async subscription => {
            setSubscription({
                role: subscription.data().role
            })
        })
    })
  }, [user.uid])

  const showNav = () => {
    if (window.scrollY > 100) {
        setShow(true)
    } else {
        setShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', showNav)
    return () => {
      window.removeEventListener('scroll', showNav)
    }
  }, [show])
  
  return (
    <Container>
        <TopWrapper trigger={show}>
            <LogoImg onClick={() => subscription ? history('/') : history('/profile')} src='https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png' alt='netflix logo' />
            <Avatar onClick={() => history('/profile')} src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='avatar' />
        </TopWrapper>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
`

const LogoImg = styled.img`
    width: 120px;
    height: 80px;
    cursor: pointer;
`

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;
`

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.trigger ? 'black' : 'transparent'};
    width: 100vw;
    position: fixed;
    padding: 10px 25px;
    z-index: 1;
`