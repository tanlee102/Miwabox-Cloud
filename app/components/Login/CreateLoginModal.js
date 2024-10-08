'use client'

import { useContext, useState } from "react";
import { env_variable } from "../../env"
import Link from "next/link";

import { WindowContext } from "@/app/context/WindowContext";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CreateLoginModal = () => {

  const { setDisplayLoginModel, setDisplayRegisterModel, setDisplayForgotModel}  = useContext(WindowContext);

  const router = useRouter()
  const pathname = usePathname()

  const [load, setLoad] = useState(false);
  
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [password, setPassword] = useState("");


  const onEmailChange = (e) => {
    setEmail(String(e.target.value).toLowerCase())
      let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if ( re.test(String(e.target.value)) || String(e.target.value) === '') {
        setIsValidEmail(true)
      }else {
        setIsValidEmail(false)
      }
  }

  const loginBtn = async () => {
    setLoad(true);
    try {
      const response = await fetch('https://miwa-cloud-api.netlify.app/api/auth/password/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          // Set cookies
          Cookies.set('token', data.token, { expires: 7 });
          // Redirect or update the UI as needed
          window.location.reload("/")
        } else {
          alert('Login failed: Token not received.');
        }
      } else {
        alert('Login failed: Invalid email or password.');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoad(false);
    }
  }


  return (
    <div className="contain-login">

      <div className="content-login">
          <div>

              <input style={{marginBottom: isValidEmail ? '10px' : '5px'}}  value={email} onChange={(e) => onEmailChange(e)} type="email" placeholder="Enter email"/>
              <span style={{color: "tomato",display: isValidEmail ? "none" : "block"}} className="info-text-login">Invalid email.</span>

              <input value={password} onChange={(e) => setPassword(String(e.target.value).replace(/\s/g, ''))} type="password" placeholder="Enter password"/>

              <span className="btn-login" onClick={ () => {loginBtn()}}>
                {!load ? <p>Login</p> : <div class="loader-circle-small"><div></div></div> }
              </span>

              <span className="btn-text-login" onClick={() => {setDisplayForgotModel(true); setDisplayLoginModel(false)}} >Forgot password?</span>

              <Link href={"https://miwa-cloud-api.netlify.app/api/auth/google"}>
              <span className="btn-icon-login btn-login">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    <p>Login with Google</p>
                  </div>
              </span>
              </Link>
          </div>

          <hr></hr>

          <div>
            {pathname === '/auth/login' ?
              <span onClick={() => router.push("/auth/signup")} className="btn-login" style={{backgroundColor: '#04AA6D'}}>Create account</span>
              :
              <span onClick={() => {setDisplayRegisterModel(true); setDisplayLoginModel(false)}} className="btn-login" style={{backgroundColor: '#04AA6D'}}>Create account</span>
            }
          </div>
      </div>

   </div>
  )
}

export default CreateLoginModal
