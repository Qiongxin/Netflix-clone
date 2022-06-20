import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectUser } from '../features/userSlice'
import db from '../firebase'

function Plans() {
  const [products, setProducts] = useState([])
  const user = useSelector(selectUser)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    db.collection('products')
    .where('active', '==', true)
    .get()
    .then((querySnapshot) => {
      const products = {}
      querySnapshot.forEach(async (doc) => {
        products[doc.id] = doc.data()
        const priceSnap = await doc.ref.collection('prices').get()
        priceSnap.docs.forEach((price) => {
            products[doc.id].prices = {
                priceId: price.id,
                priceData: price.data()
            }
        })
      })
      setProducts(products)
    })
  }, [])


  const loadCheckout = async (priceId) => {
    const docRef = await db
    .collection('customers')
    .doc(user.uid)
    .collection('checkout_sessions')
    .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });
    docRef.onSnapshot((snap) => {
        const { error, url } = snap.data();
        if (error) {
            alert(`An error occured: ${error.message}`);
        }
        if (url) {
            window.location.assign(url);
        }
    });

  }


  useEffect(() => {
    db.collection('customers')
    .doc(user.uid)
    .collection('subscriptions')
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(async subscription => {
            setSubscription({
                role: subscription.data().role,
                current_period_start: subscription.data().current_period_start.seconds,
                current_period_end: subscription.data().current_period_end.seconds
            })
        })
    })
  }, [user.uid])
  

  return (
    <Container>
        <h3>Plans{subscription && ` (Current Plan: ${subscription.role})`}</h3>
        {subscription && <p>Renewal date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}
        {Object.entries(products).map(([productId, productData]) => {
            const isCurrentPackage = productData.name?.includes(subscription?.role)
            return (
                <Wrapper key={productId}>
                    <Plan>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </Plan>
                    <PlanButton onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)} 
                    current = {isCurrentPackage? 'true' : 'false'}>
                        {isCurrentPackage ? 'Current Pakage' : 'Subscription'}
                    </PlanButton>
                </Wrapper>
            )
        })}
    </Container>
  )
}

export default Plans

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    opacity: 0.8;

    :hover {
        opacity: 1;
    }
`

const PlanButton = styled.button`
    padding: 10px 25px;
    background-color: ${props => props.current === 'true' ? `gray` : `#E50419`};
    color: white;
    border: none;
    cursor: ${props => props.current === 'true' ? `default` : `pointer`};
    font-weight: 600;
`

const Plan = styled.div`
`

const Container = styled.div`
    h3 {
        border-bottom: 1px solid gray;
        margin: 20px 0;
    }
`