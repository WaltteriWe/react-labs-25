import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
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
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            className="m-4 p-4 rounded-lg w-3/4 border-2 border-red-500 neon-shadow"
            // value={inputs.username}
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
          className="m-4 p-4 rounded-lg w-3/4 border-2 border-red-500 neon-shadow"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button className="m-4 p-4 bg-black rounded-lg" type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
