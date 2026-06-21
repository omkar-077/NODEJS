import React from 'react';
import { useNavigate,  Link} from 'react-router'
import "../auth.form.scss"
 

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" placeholder='Enter an Email' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" placeholder='Enter valid Password' />
                </div>
                <div className="button primary-button">Login</div>
            </form>
            <p>Dont have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
