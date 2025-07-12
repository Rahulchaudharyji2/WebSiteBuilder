import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLogin }) {
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    onLogin(res.user);
  };

  return <button onClick={login}>Login with Google</button>;
}

export default Login;
