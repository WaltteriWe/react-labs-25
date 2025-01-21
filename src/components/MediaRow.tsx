import {MediaItem} from 'hybrid-types/DBTypes';

type MediaRowProps = {
  item: MediaItem;
  setSelectedItem: (item: MediaItem | undefined) => void;
};

const MediaRow = (props: MediaRowProps) => {
  const {item, setSelectedItem} = props;
  return (
    // TODO: move <tr> element  for each item property from Home.tsx here
    <tr key={item.media_id}>
      <td>
        <img src={item.thumbnail || undefined} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button
          onClick={() => {
            setSelectedItem(item);
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default MediaRow;
