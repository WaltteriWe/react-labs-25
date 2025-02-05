import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Layout from './components/Layout';
import Login from './views/Login';
import {UserProvider} from './contexts/UserContext';
import Logout from './views/Logout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />}></Route>

            {/* TODO: add missing routes */}
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
