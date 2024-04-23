import React, { useState } from 'react';

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  // console.log(name,age,email);

  const[error, setError] = useState ("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adduser = {name, email,age}
    const response = await fetch("http://localhost:5000", {
      method:"POST",
      body:JSON.stringify(adduser),
      headers:{
        "content-Type":"application/json",
      },
    });
    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge(0);

    }
// 
  }

  return (
    <div className="container my-2">

{ error && <div class="alert alert-danger">{error}</div>}
  

      <h2 className='text-center'>Enter the Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={handleNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={handleEmailChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" className="form-control" id="age" placeholder="Enter Age" value={age} onChange={handleAgeChange}/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Create;
