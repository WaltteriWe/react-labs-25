import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();

  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userResponse = await getUserByToken(token);
      setUser(userResponse.user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user && (
        <>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>User level: {user.level_name}</p>
          <p>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
    </>
  );
};

export default Profile;
