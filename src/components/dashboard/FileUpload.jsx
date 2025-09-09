import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DashboardCard from '../ui/DashboardCard';
import { FiUploadCloud, FiFileText, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { uploadFile } from '../../utils/api';

const FileUpload = () => {
  const [recentUploads, setRecentUploads] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadStatus('uploading');

    const formData = new FormData();
    formData.append('medicalFile', file);

    try {
      const response = await uploadFile(formData);

      if (!response.ok) {
        throw new Error('Upload failed'); 
      }

      const result = await response.json();
      setRecentUploads(prev => [result.file, ...prev.slice(0, 4)]); // Add to recent list
      setUploadStatus('success');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    } finally {
      // Reset status after a few seconds
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <DashboardCard title="Medical File Upload Center">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center h-40 cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${uploadStatus === 'uploading' ? 'bg-gray-100' : ''}`}
      >
        <input {...getInputProps()} />
        
        {uploadStatus === 'idle' && (
          <>
            <FiUploadCloud className="text-4xl text-blue-500 mb-2" />
            <p className="text-gray-500">
              {isDragActive ? 'Drop the file here...' : 'Drag & drop a PDF or JPG file'}
            </p>
            <p className="text-xs text-gray-400 mt-1">or click to browse</p>
          </>
        )}

        {uploadStatus === 'uploading' && <FiLoader className="text-4xl text-gray-500 animate-spin" />}
        {uploadStatus === 'success' && <FiCheckCircle className="text-4xl text-green-500" />}
        {uploadStatus === 'error' && <FiAlertCircle className="text-4xl text-red-500" />}
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-600">Recent Uploads</h4>
        <ul className="mt-2 space-y-2">
          {recentUploads.length > 0 ? (
            recentUploads.map((file) => (
              <li key={file._id} className="flex items-center text-sm p-2 bg-gray-50 rounded-md">
                <FiFileText className="mr-3 text-gray-500" />
                <span className="flex-1 truncate text-gray-700" title={file.originalName}>{file.originalName}</span>
                <span className="text-xs text-gray-400">{new Date(file.uploadDate).toLocaleTimeString()}</span>
              </li>
            ))
          ) : (
            <p className="text-xs text-gray-500 text-center py-2">No files uploaded yet.</p>
          )}
        </ul>
      </div>
    </DashboardCard>
  );
};

export default FileUpload;