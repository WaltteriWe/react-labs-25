import {MediaItemWithOwner, UserWithNoPassword} from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import {useEffect, useState} from 'react';
import SingleView from '../components/Singleview';
import {fetchData} from '../lib/functions';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);
  console.log(selectedItem);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // all media without owner info
        const media = await fetchData<MediaItemWithOwner[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        // get all owners based on id
        const mediaWithOwner: MediaItemWithOwner[] = await Promise.all(
          media.map(async (item) => {
            const owner = await fetchData<UserWithNoPassword>(
              import.meta.env.VITE_AUTH_API + '/users/' + item.media_id,
            );

            const mediaItemWithOwner: MediaItemWithOwner = {
              ...item,
              username: owner.username,
            };

            if (
              mediaItemWithOwner.screenshots &&
              typeof mediaItemWithOwner.screenshots === 'string'
            ) {
              mediaItemWithOwner.screenshots = JSON.parse(
                mediaItemWithOwner.screenshots as string,
              ).map((screenshot: string) => {
                return import.meta.env.VITE_FILE_URL + screenshot;
              });
            }
            return mediaItemWithOwner;
          }),
        );

        setMediaArray(mediaWithOwner);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    getMedia();
  }, []);

  console.log(mediaArray);

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              item={item}
              key={item.media_id}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
