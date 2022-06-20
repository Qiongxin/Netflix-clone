import axios from '../axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import requests from '../Requests'

function Banner() {

const [movie, setMovie] = useState([])

useEffect(() => {
  async function fetchData() {
    const request = await axios.get(requests.fetchNetflixOriginals)
    setMovie(
        request.data.results[
            Math.floor(Math.random()*request.data.results.length - 1)
        ]
    )
    return request
  }
  fetchData()
}, [])

const Overflow = (string, n) => string?.length > 100 ? string.substr(0, n - 1) + ' ...' : string

  return (
    <Container const bg={movie}>
        <Wrapper>
            <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
            <Buttons>
                <LeftButton>Play</LeftButton>
                <RightButton>My List</RightButton>
            </Buttons>
            <Description> {Overflow(movie?.overview, 150)}
            </Description>
        </Wrapper>
        <FadeBottom />

    </Container>
  )
}

export default Banner

const Container = styled.div`
    position: relative;
    height: 448px;
    background-image: url(${props => `https://image.tmdb.org/t/p/original/${props.bg?.backdrop_path}`});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    object-fit: contain;
`

const Wrapper = styled.div`
    color: white;
    padding-top: 150px;
    margin-left: 25px;

    h1 {
        font-weight: 800;
        font-size: 3rem;
        padding-bottom: 0.3rem;
    }
`

const Buttons = styled.div``

const LeftButton = styled.button`
    border: none;
    background-color: rgba(51, 51, 51, 0.5);
    color: white;
    padding: 10px 35px;
    border-radius: 3px;
    margin-right: 20px;
    font-weight: 700;
    cursor: pointer;

    :hover {
        background-color: #e6e6e6;
        color: black;
        transition: all 0.4s;
    }
`

const RightButton = styled(LeftButton)``

const Description = styled.p`
    line-height: 1.3;
    font-size: 0.8rem;
    width: 40rem;
    max-width: 360px;
    height: 80px;
    margin-top: 15px;
`

const FadeBottom = styled.div`
    height: 6rem;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
`