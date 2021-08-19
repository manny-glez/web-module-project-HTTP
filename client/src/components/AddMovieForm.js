import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

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

  const handleSubmit = (evt) => {
    evt.preventDefault()
    axios.post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        props.setMovies(res.data)
        push('/movies')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <> 
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
  
          <label>Title</label>
          <input onChange={handleChange} className="form-control" type="text" name="title" value={newMovie.title}/>

          <label>director</label>
          <input onChange={handleChange} className="form-control" type="text" name="director" value={newMovie.director}/>

          <label>genre</label>
          <input onChange={handleChange} className="form-control" type="text" name="genre" value={newMovie.genre}/>

          <label>metascore</label>
          <input onChange={handleChange} className="form-control" type="number" name="metascore" value={newMovie.metascore}/>

          <label>description</label>
          <input onChange={handleChange} className="form-control" name="description" value={newMovie.description}/>

          <button id="add-button">done</button>
  
        </form>
      </div>
    </>
  )
}

export default AddMovieForm;