import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DepartmentAdd = ({
  setIsAdding 
}) => {

  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/location/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.data);
      })
      .catch((error) => console.error("Error fetching results:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/departmentidmax/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setID(data.data[0][0] + 10)
      })
      .catch((error) => console.error("Error fetching Employees", error));
  }, []);

  const handleAdd = async () => {
    const newDepartment = {
      id,
      location,
      name,
    };

    try {
      const response = await fetch("http://localhost:3001/api/department/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepartment),
      });

      if (response.ok) {
        await response.json();
        setIsAdding(false);
        Swal.fire({
          icon: "success",
          title: "Department added successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add department",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: error.message,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Department</h1>
        <label htmlFor="name">Department Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="name">Location (ID)</label>
        <select
          id="location"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value={location}>{location}</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding (false)}
          />
        </div>
      </form>
    </div>
  );
};

export default DepartmentAdd;
