import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'

const initialState = {
  title:"",
  director: "",
  genre: "",
  metascore: 0,
  description: ""
}

const AddMovieForm = (props) => {
  const { push } = useHistory();

  const [newMovie, setNewMovie] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewMovie({
      ...newMovie,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
    .post('http://localhost:5000/api/movies', newMovie)
    .then(res => {
      props.setMovies(res.data)
      push('/movies');
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="form-conatiner">
        <form onSubmit={handleSubmit}>

          <label>Title
          <input onChange={handleChange} type="text" value={newMovie.title} name="title" />
          </label>

          <label>Director
          <input onChange={handleChange} type="text" value={newMovie.director} name="director" />
          </label>

          <label>Genre
          <input onChange={handleChange} type="text" value={newMovie.genre} name="genre" />
          </label>
          
          <label>Metascore
          <input  onChange={handleChange} type="number" value={newMovie.metascore} name="metascore" />
          </label>

          <label>Description
          <input  onChange={handleChange} value={newMovie.description} name="description" />
          </label>

          <button>Add Movie</button>

        </form>
      </div>
    </>
    
  )
}

export default AddMovieForm;