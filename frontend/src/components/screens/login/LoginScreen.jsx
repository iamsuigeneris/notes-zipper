import React,{useState, useEffect} from 'react'
import MainScreen from '../../MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './loginScreen.css'
import Loading from '../../Loading'
import ErrorMessage from '../../ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../../actions/userActions"

const LoginScreen = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  
  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes")
    }
  },[history, userInfo])
  
    const submithandler = async (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }

    return (
      <MainScreen title='Login'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submithandler}>
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

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer ? <Link to='/register'>Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    );
}

export default LoginScreen
