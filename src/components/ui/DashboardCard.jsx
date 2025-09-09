const DashboardCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md flex flex-col ${className}`}>
      {title && <h3 className="text-md font-semibold text-gray-700 mb-2 border-b pb-2">{title}</h3>}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;