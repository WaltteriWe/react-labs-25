// Upload.tsx
import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
    } catch (error) {
      console.log(error as Error);
    }
    setUploading(false);

    console.log('doing the uploadings');
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h1>Upload</h1>
      {uploading && <p>Uploading...</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
