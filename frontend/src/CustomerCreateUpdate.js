import React, { useState, useEffect } from "react";
import { customersService } from "./CustomersService";

const CustomerCreateUpdate = ({ match }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: ""
  });

  useEffect(() => {
    if (match && match.params && match.params.pk) {
      customersService.getCustomer(match.params.pk).then(c => {
        setFormData({
          first_name: c.first_name,
          last_name: c.last_name,
          email: c.email,
          phone: c.phone,
          address: c.address,
          description: c.description
        });
      });
    }
  }, []);

  const handleChange = e => {
    let { name, value, checked, type } = e.target;
    type === "checkbox" && (value = checked);
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    customersService
      .createCustomer(formData)
      .then(result => {
        console.log(result);
        alert("Customer updated!");
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  };

  const handleUpdate = pk => {
    customersService
      .updateCustomer({
        pk: pk,
        ...formData
      })
      .then(result => {
        console.log(result);
        alert("Customer updated!");
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  };

  const handleSubmit = e => {
    match && match.params && match.params.pk
      ? handleUpdate(match.params.pk)
      : handleCreate();

    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input
          className="form-control"
          type="text"
          name="first_name"
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          className="form-control"
          type="text"
          name="last_name"
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          className="form-control"
          type="text"
          name="phone"
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          className="form-control"
          type="text"
          name="email"
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          className="form-control"
          type="text"
          name="address"
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea className="form-control" name="description" onChange={handleChange}></textarea>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default CustomerCreateUpdate;
