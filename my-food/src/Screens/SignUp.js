import React , {useState} from 'react'
import { Link ,useNavigate   } from 'react-router-dom'
 

export default function SignUp() {
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({naam:"" ,password:"" , email:"" , geolocation:""})
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/createuser" , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({naam:credentials.naam , email:credentials.email , password:credentials.password , location:credentials.geolocation})
      })
      const json  = await response.json()
      // console.log(json);

      if(!json.success)
      {
     alert("Enter valid credentials")
      }
      else
      {
        navigate('/login');
      }

    }
    const handleChange=(event)=>{
        setcredentials({...credentials , [event.target.name]:event.target.value})
    }
  return (
    <>
      <div className='container'>
      <form onSubmit={handleSubmit}>
      <div  className="mb-3">
    <label  htmlFor="name"  className="form-label">Name</label>
    <input type="text"  className="form-control"  name='naam' value={credentials.naam} onChange={handleChange}/>
    
  </div>
  <div  className="mb-3">
    <label  htmlFor="exampleInputEmail1"  className="form-label">Email address</label>
    <input type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange}/>
    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div  className="mb-3">
    <label  htmlFor="exampleInputPassword1"  className="form-label">Password</label>
    <input type="password"  className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange}/>
  </div>
  <div  className="mb-3">
    <label  htmlFor="name"  className="form-label">Address</label>
    <input type="text"  className="form-control" name='geolocation' value={credentials.geolocation} onChange={handleChange}/>
  </div>
   
  <button type="submit"  className="btn btn-primary">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
</form>
</div>  
    </>
  )
}
