import React,{useState} from 'react'

const Login = () => {
const [user, setUser] = useState('')
const [password, setPassword] = useState('')

function handleChange(e){
    const {name, value} = e.target
    if(name === 'user'){
        setUser(value)
    }else if(name === 'password'){
        setPassword(value)
    }

}
return (
    <div>
        <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={handleChange}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
        />
        <button>Login</button>
    </div>
)
}

export default Login