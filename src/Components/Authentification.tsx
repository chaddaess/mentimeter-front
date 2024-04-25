import { FC, useState } from 'react';
import * as Components from './Component.tsx';
import {Navigate, useNavigate} from "react-router";


interface AuthentificationProps {
  signIn: boolean;
  toggle: (signIn: boolean) => void;
}

const Authentification: FC<AuthentificationProps> = ({ signIn, toggle }) => {
    const errorStyle={
        //Todo:style error messages
    }
    const [loginInputDetails,setLoginInputDetails] = useState([]);
    const [error,setError] = useState([]);
    const navigate=useNavigate()
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginInputDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = (event) => {
        console.log(loginInputDetails)
        event.preventDefault();
            fetch('http://localhost:3000/authentication/login', {
                method: "POST",
                body: JSON.stringify(loginInputDetails),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("data : ", data);
                    if (!data['statusCode']) {
                        localStorage.setItem('loginInfo', JSON.stringify(data));
                        navigate('/')
                    } else {
                        const errorMessages = Array.isArray(data.message) ? data.message : [data.message];
                        setError(errorMessages)
                        console.log("errors:", errorMessages)

                    }
                });
    }
  return (
      <>
          {!localStorage.getItem('loginInfo')?
              <Components.Container>
                  <Components.SignUpContainer signinin={signIn}>
                      <Components.Form>
                          <Components.Title>Create Account</Components.Title>
                          <Components.Input type='text' placeholder='Name'/>
                          <Components.Input type='email' placeholder='Email'/>
                          <Components.Input type='password' placeholder='Password'/>
                          <Components.Button>Sign Up</Components.Button>
                      </Components.Form>
                  </Components.SignUpContainer>

                  <Components.SignInContainer signinin={signIn}>
                      <Components.Form onSubmit={handleFormSubmit}>
                          <Components.Title>Sign in</Components.Title>
                          <Components.Input name="email" type='email' placeholder='Email' onChange={handleInputChange}/>
                          <Components.Input name="password" type='password' placeholder='Password' onChange={handleInputChange}/>
                          {/*<Components.Anchor href='#'>Forgot your password?</Components.Anchor>*/}
                          <Components.Button>Sigin In</Components.Button>
                          {error &&
                          <Components.Paragraph>
                                      <ul style={errorStyle}>
                                          {error[0]}
                                      </ul>

                          </Components.Paragraph>
                          }
                      </Components.Form>
                  </Components.SignInContainer>

                  <Components.OverlayContainer signinin={signIn}>
                      <Components.Overlay signinin={signIn}>
                          <Components.LeftOverlayPanel signinin={signIn}>
                              <Components.Title>Welcome Back!</Components.Title>
                              <Components.Paragraph>
                                  To keep connected with us please login
                              </Components.Paragraph>
                              <Components.GhostButton onClick={() => toggle(true)}>
                                  Sign In
                              </Components.GhostButton>
                          </Components.LeftOverlayPanel>

                          <Components.RightOverlayPanel signinin={signIn}>
                              <Components.Title>Hey, Friend!</Components.Title>
                              <Components.Paragraph>
                                  Don't have an account ? sign up Now !!!
                              </Components.Paragraph>
                              <Components.GhostButton onClick={() => toggle(false)}>
                                  Sigin Up
                              </Components.GhostButton>
                          </Components.RightOverlayPanel>
                      </Components.Overlay>
                  </Components.OverlayContainer>
              </Components.Container>
              :<Navigate to='/'/>
          }
      </>
  );
};

export default Authentification;