import React, { useState } from "react";

const TodoForm = ({ activeItem, onSave, onClose }) => {
  const [formData, setFormData] = useState(activeItem);

  const handleChange = e => {
    let { name, value, checked, type } = e.target;
    type === "checkbox" && (value = checked);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Todo Title"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Todo description"
        />
        <label htmlFor="completed">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          Completed
        </label>
      </form>
      <button color="success" onClick={onClose}>
        Cancel
      </button>
      <button color="success" onClick={() => onSave(formData)}>
        Save
      </button>
    </>
  );
};

export default TodoForm;
