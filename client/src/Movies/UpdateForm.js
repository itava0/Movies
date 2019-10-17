import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateForm = props => {
  console.log(props)
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    const itemToEdit = props.items.find(
      item => `${item.id}` === props.match.params.id
    );

    if(itemToEdit) setItem(itemToEdit);
  }, [props.items, props.match.params.id]);

  const changeHandler = e => {
    e.persist();
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        // needs to call setItems
        const newItem = props.items.map(item => {
          if(item.id === res.data.id) {
            return res.data
          }
        })
        props.updateItems(newItem);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2 className="formTitle">Update Movie</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="Title">Title</label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />
        <label htmlFor="Director">Director</label>
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <label htmlFor="Metascore">Metascore</label>
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <label htmlFor="Stars">Stars</label>
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.stars}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
