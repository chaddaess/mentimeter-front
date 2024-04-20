import { FC, useEffect, useState } from 'react';
import * as Components from './Component.tsx';

interface AuthentificationProps {
  signIn: boolean;
  toggle: (signIn: boolean) => void;
}

const Authentification: FC<AuthentificationProps> = ({ signIn, toggle }) => {
  const [registrationData, setRegistrationData] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch('http://localhost:3000/authentication/register');
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        const jsonData = await response.json();
        setRegistrationData(jsonData);
      } catch (error:any) {
        setError(error);
      }
    };

    const fetchLoginData = async () => {
      try {
        const response = await fetch('http://localhost:3000/authentication/login');
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const jsonData = await response.json();
        setLoginData(jsonData);
      } catch (error:any) {
        setError(error);
      }
    };

    fetchRegistrationData();
    fetchLoginData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Components.Container>
      <Components.SignUpContainer signinin={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type='text' placeholder='Name' />
          <Components.Input type='email' placeholder='Email' />
          <Components.Input type='password' placeholder='Password' />
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinin={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type='email' placeholder='Email' />
          <Components.Input type='password' placeholder='Password' />
          <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
          <Components.Button>Sigin In</Components.Button>
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
  );
};

export default Authentification;