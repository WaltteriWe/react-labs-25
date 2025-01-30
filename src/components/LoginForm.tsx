import {useNavigate} from 'react-router-dom';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';

const LoginForm = () => {
  const navigate = useNavigate();
  const {postLogin} = useAuthentication();

  const initValues: Credentials = {
    username: 'waltteri',
    password: 'lemonke',
  };

  const doLogin = async () => {
    try {
      const loginResult = await postLogin(inputs as Credentials);
      console.log('loginResult', loginResult);
      if (loginResult) {
        localStorage.setItem('token', loginResult.token);
        alert('Login success');
        navigate('/');
      }
      console.log(inputs);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="UserWithLevelname">Username</label>
          <input
            name="username"
            type="text"
            id="UserWithLevelname"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            value={inputs.password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
