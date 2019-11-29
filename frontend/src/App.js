import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal, { useModal } from "./components/Modal";
import TodoForm from "./components/TodoForm";

const App = () => {
  const defaultFormData = { title: "", description: "", completed: false };
  const [viewCompleted, setViewCompleted] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [todoList, setTodoList] = useState([]);
  const [modal, toggleModal] = useModal();

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/todos/");
      setTodoList(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => setViewCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => setViewCompleted(false)}
          className={viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    return todoList.map(item => {
      return (
        item.completed === viewCompleted && (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`todo-title mr-2 ${
                viewCompleted ? "completed-todo" : ""
              }`}
              title={item.description}
            >
              {item.title}
            </span>
            <span>
              <button
                onClick={() => editItem(item)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </span>
          </li>
        )
      );
    });
  };
  const handleSubmit = item => {
      if (item.id) {
        axios.put(`todos/${item.id}/`, item);
      } else {
        axios.post("todos/", item);
      }
      refreshList();
      toggleModal();
  };

  const handleDelete = item =>
    axios.delete(`todos/${item.id}`).then(() => refreshList());

  const resetForm = () => setFormData(defaultFormData);

  const createItem = () => {
    resetForm();
    toggleModal();
  };

  const editItem = item => {
    setFormData(item);
    toggleModal();
  };

  return (
    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-primary">
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">{renderItems()}</ul>
          </div>
        </div>
      </div>
      <Modal {...modal}>
        <TodoForm
          activeItem={formData}
          onSave={handleSubmit}
          onClose={toggleModal}
        />
      </Modal>
    </main>
  );
};
export default App;
