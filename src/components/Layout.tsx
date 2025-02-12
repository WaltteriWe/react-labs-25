import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext } from '../hooks/ContextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, [user, handleAutoLogin]);

  return (
    <>
      <h1 className='font-bold text-pink-600 neon-text'>Aldi Fever Dream INC</h1>
      <div>
        <nav>
          <ul className='m-0 list-none p-0bg-stone-600 flex justify-end'>
            <li>
              <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out" to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out" to="/profile">Profile</Link>
                </li>
                <li>
                  <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out" to="/upload">Upload</Link>
                </li>
                <li>
                  <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out" to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <li>
                <Link className="block p-4 text-center hover:bg-stone-900 duration-800 ease-in-out" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
