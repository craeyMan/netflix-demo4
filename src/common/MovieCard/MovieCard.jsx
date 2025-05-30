import React, { useState } from 'react';
import './MovieCard.style.css';
import { FaPlay, FaThumbsUp, FaChevronDown } from 'react-icons/fa';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { Badge } from 'react-bootstrap';


const MovieCard = ({ movie, onMovieClick }) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(!liked);

  const {data:genreData} = useMovieGenreQuery()
  const showGenre = (genreIdList) => {
    if(!genreData) 
      return []
    const genreNameList = genreIdList.map((id) => {
    const genreObj = genreData.find((genre)=>genre.id === id)
    return genreObj.name;
    })

    return genreNameList

  }

  return (
    <div className="movie-card">
      <div
        className="movie-thumbnail"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
        }}
      ></div>

      <div className="movie-overlay">
        <div className="button-group">
          <FaPlay className="icon" />
          <FaThumbsUp
            className={`icon ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          />
          <FaChevronDown
          className="icon right-icon"
          onClick={() => onMovieClick(movie)}
        />
        </div>

        <div className="movie-title">
          {movie.title}
        </div>

        <div className="movie-genres">
        {showGenre(movie.genre_ids)?.map((genre, index) => (
          <Badge bg="danger" key={index} className="me-1">
            {genre}
          </Badge>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MovieCard;