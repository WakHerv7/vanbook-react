import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { BiSolidEdit } from "react-icons/bi";

const FileUploader = ({ fieldOnChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles);
    fieldOnChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png' ]
    }
  });

  return (
    <div {...getRootProps()} className='flex justify-start items-center gap-1 p-3 cursor-pointer w-full md:w-96 rounded-lg hover:bg-gray-100'>
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className='mr-3'>
            <img
              src={fileUrl}
              alt='userimage'
              className='w-16 h-16 rounded-full object-cover'
            />
          </div>
          <div className='flex flex-col justify-start items-start gap-1'>
            <p className='basis-3/4 font-thin text-left text-sm'>Replace avatar</p>
            <BiSolidEdit />
          </div>
        </>
        ) : (
          <div className='mr-3'>
            <img
              src={fileUrl}
              alt='userimage'
              className='w-16 h-16 rounded-full object-cover'
            />
            <p className='basis-3/4 text-left py-5 px-10'>Choose avatar</p>
          </div>
        )
      }
    </div>
  )
}

export default FileUploader
