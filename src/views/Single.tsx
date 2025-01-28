import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();

  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h2>Single</h2>
      <h3>{item?.title}</h3>
      {item && <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>}
      {item?.media_type.includes('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} />
        </video>
      )}
      <p>{item?.description}</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </>
  );
};

export default Single;
