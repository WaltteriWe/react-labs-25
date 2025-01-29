import {MediaItemWithOwner, UserWithNoPassword} from 'hybrid-types/DBTypes';
import {useEffect, useState} from 'react';
import {fetchData} from '../lib/functions';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
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
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
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
  return {mediaArray};
};

const useUser = () => {};

const useComments = () => {};
export {useMedia, useUser, useComments};
