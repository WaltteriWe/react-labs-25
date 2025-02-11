import { MediaItemWithOwner } from 'hybrid-types/DBTypes';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const { state } = useLocation();
  const item: MediaItemWithOwner = state.item;

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-bold">Single</h2>
      <h3 className="text-2xl">{item.title}</h3>
      <p className="text-gray-400 mb-4">{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      {item.media_type.includes('image') ? (
        <img
          className="m-4 max-w-full lg:max-w-3xl rounded-lg shadow-md"
          src={item.filename}
          alt={item.title}
        />
      ) : (
        <video
          className="m-4 max-w-full lg:max-w-3xl rounded-lg shadow-md"
          src={item.filename}
          controls
        />
      )}
      <div className="m-4 p-4 rounded-lg bg-black text-white max-w-full lg:max-w-3xl">
        <p className="mb-2">{item.description}</p>
        <p className="mb-2">Owner: {item.username}</p>
        <p className="mb-2">Type: {item.media_type}</p>
        <p className="mb-2">Size: {Math.round(item.filesize / 1024)} kB</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-red-700 ease-in-out duration-300"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Single;
