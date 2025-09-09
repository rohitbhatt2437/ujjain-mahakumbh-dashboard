import DashboardCard from '../ui/DashboardCard';
import { FiUploadCloud } from 'react-icons/fi';

const FileUpload = () => {
  return (
    <DashboardCard title="Medical File Upload Center">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-full">
        <FiUploadCloud className="text-4xl text-blue-500 mb-2" />
        <p className="text-gray-500">Drag/Drop Files Here</p>
        <p className="text-xs text-gray-400 mt-1">or click to browse</p>
      </div>
       <div className="mt-2 text-xs text-gray-500">
        <p>Recent Upload Progress...</p>
      </div>
    </DashboardCard>
  );
};

export default FileUpload;