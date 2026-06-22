import React from 'react';
import { useNavigate,  Link} from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useauth';
 

const Login = () => {

    const { loading, handleLogin} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        handleLogin({email,password})
    }

    if(loading){
        return ( <main><h1>Loading....</h1></main> )
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="" placeholder='Enter an Email' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="" placeholder='Enter valid Password' />
                </div>
                <div className="button primary-button">Login</div>
            </form>
            <p>Dont have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
