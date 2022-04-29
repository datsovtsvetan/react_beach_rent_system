import React , {useState} from 'react'
import Button from './Button';

const LoginForm = ({Login, error}) => {
    const [details, setDetails] = useState({username: "", password: ""});

    const submitHandler = (e) => {
        e.preventDefault();
        Login(details);

    };
  return (
    <form onSubmit={submitHandler}>
        <div className="form-inner">
            <h2>Login</h2>
            {/** Error! */}
            <div className="form-group">
                <label htmlFor="username">Email:</label>
                <input type="email" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>

            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
            </div>
            <Button type="submit" title="Login" color="green" />
        </div>
    </form>
  )
}

export default LoginForm