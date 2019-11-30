import React, { useState, useEffect } from "react";
import { customersService } from "./CustomersService";

const CustomersList = ({}) => {
  const [customers, setCustomers] = useState([]);
  const [nextPage, setNextPage] = useState("");

  const getUser = () =>
    new Promise(resolve =>
      fetch("https://randomuser.me/api/")
        .then(res => res.json())
        .then(res => resolve(res))
    );

  const fetchRand = () => {
    getUser().then(res => {
      console.log("res", res);
      const c = res.results[0];
      const l = c.location;
      const address = `${l.street.number} ${l.street.name} ${l.state} ${l.postcode}`;
      const customer = {
        first_name: c.name.first,
        last_name: c.name.first,
        // logo_url: c.picture.large,
        email: c.email,
        phone: c.phone,
        description: `Randomly generated user ${c.login.salt}`,
        address
      };
      console.log('customer', customer)
      customersService
        .createCustomer(customer)
        .then(res => console.log("Succesfully Created User", res))
        .catch(err => console.warn(err));
    });
  };

  console.log("customers", customers);
  useEffect(() => {
    fetchInitialCustomers();
  }, []);

  const fetchInitialCustomers = async () => {
    const { results, next } = await customersService.getCustomers();
    setCustomers(results);
    setNextPage(next);
  };

  const handleDelete = (e, pk) => {
    customersService.deleteCustomer({ pk: pk }).then(() => {
      var newArr = customers.filter(function(obj) {
        return obj.pk !== pk;
      });
      setCustomers(newArr);
    });
  };

  const loadNextPage = async () => {
    const { results, next } = await customersService.getCustomersByURL(
      nextPage
    );
    setCustomers(results);
    setNextPage(next);
  };

  return (
    <div className="customers--list">
      <table className="table">
        <thead key="thead">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id} </td>
              <td>{c.first_name}</td>
              <td>{c.last_name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>{c.description}</td>
              <td>
                <button onClick={e => handleDelete(e, c.id)}> Delete</button>
                <a href={"/customer/" + c.id}> Update</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={loadNextPage}>
        Next
      </button>
      <button className="btn btn-primary" onClick={fetchRand}>
        Fetch Random
      </button>
    </div>
  );
};

export default CustomersList;
