import axios from '../axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Row({title, fetchUrl, isLargeRow=false}) {

const [movies, setMovies] = useState([])
const base_url = 'https://image.tmdb.org/t/p/original/'

useEffect(() => {
  async function fetchData() {
    const request = await axios.get(fetchUrl)
    setMovies(request.data.results)
    return request 
  }
  fetchData()

}, [fetchUrl])

  return (
    <Container>
        <h2>{title}</h2>
        <Wrapper large={isLargeRow}>
            {movies.map(movie => ((
              (isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&
                (<img src={base_url + (isLargeRow ? movie.poster_path : movie.backdrop_path)} alt={movie.name || movie.original_title} key={movie?.id}/>)
            ))}
        </Wrapper>
    </Container>
  )
}

export default Row

const Container = styled.div`
    color: white;
    margin-left: 20px;

    h2 {
      margin-left: 10px;
    }
`
const Wrapper = styled.div`
    display: flex;
    overflow-x: scroll;
    padding: 15px 15px 15px 10px;

    img {
        max-height: ${props => props.large ? `230px` : `110px`};
        margin-right: 10px;
        object-fit: contain;
        cursor: pointer;
        transition: transform 0.45s;

        :hover {
          transform: ${props => props.large ? `scale(1.09)` : `scale(1.07)`};
        }
    }

    ::-webkit-scrollbar {
        display: none;
    }
`