import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Loading from "../../Loading";
import MainScreen from "../../MainScreen";
import ErrorMessage from "../../ErrorMessage";
import "./registerScreen.css";

const RegisterScreen = ({history}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
    
 const submitHandler = async (e) => {
    e.preventDefault();

    // if (password !== confirmpassword) {
    //     setMessage("Passwords do not match");
    // } else dispatch(register(name, email, password, pic));
     if (password !== confirmpassword) {
         setMessage("Password Do not Match")
     } else {
         setMessage(null)
         try {
            const config = {
            headers: {
                "Content-type": "application/json",
                },
             };
            setLoading(true);
            const { data } = await axios.post(
                '/api/users/',
                { name, email, password, pic },
                config
             )
             console.log(data)
            setLoading(false);
            localStorage.setItem("userInfo", JSON.stringify(data));   
         } catch (error) {
            setError(error.response.data.message);
            // setLoading(false);
         }
      }
  };
  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an Image")
    }
    setPicMessage(null)
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset','note-zipper')
      data.append("cloud_name", "drap5t2wo");
      fetch("https://api.cloudinary.com/v1_1/drap5t2wo/image/upload", {
        method: "post",
        body:data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPic(data.url.toString())
        })
        .catch((err) => {
        console.log(err)
      })
    } else {
        return setPicMessage("Please Select an Image");
    }
  }
  return (
    <MainScreen title='REGISTER'>
      <div className='loginContainer'>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              value={name}
              placeholder='Enter name'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              value={confirmpassword}
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}
          <Form.Group controlId='pic'>
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id='custom-file'
              type='image/png'
              label='Upload Profile Picture'
              custom
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account ? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
