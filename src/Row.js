import React, { useState, useEffect } from 'react'
import axios from './axios'
import instance from './axios';
import './Row.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'
const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl,setTrailerUrl] = useState("")
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            // console.log(request)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }
    const handleClick = (movie) =>{
    if(trailerUrl)
    {
        setTrailerUrl('')
    }
    else{
        movieTrailer(movie?movie.name||"":"").then(url=>{
         const urlParams = new URLSearchParams(  new URL(url).search)
        setTrailerUrl(urlParams.get("v"))
        }).catch((error)=>console.log(error.message))
    }
    }
    console.log(movies)
    //var that is pulled in from oustside in useeffect has to be included in []            //[] run once when row loads ..not again
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {/* ROW POSTER */}

                {movies.map(movie => (
                    <img onClick={()=>handleClick(movie)} key={movie.id} className={`row__poster ${isLargeRow && 'row__posterLarge'}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {/* containers -> posters */}
           {trailerUrl &&(
            <Youtube videoId={trailerUrl} opts={opts} />
           )} 
        </div>
    )
}

export default Row
