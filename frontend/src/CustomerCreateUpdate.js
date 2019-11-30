import React, { useState, useEffect } from "react";
import { customersService } from "./CustomersService";

const CustomerCreateUpdate = ({ history, location, match }) => {
  console.log("match", match);
  console.log("location", location);
  console.log("history", history);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    logo_url: ''
  });

  useEffect(() => {
    if (match && match.params && match.params.pk) {
      customersService.getCustomer(match.params.pk).then(customer => {
        setFormData({
          ...customer
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
          value={formData.first_name}
        />

        <label>Last Name:</label>
        <input
          className="form-control"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <label>Logo Url:</label>
        <input
          className="form-control"
          type="text"
          name="logo_url"
          value={formData.logo_url}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          className="form-control"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          className="form-control"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          className="form-control"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default CustomerCreateUpdate;
