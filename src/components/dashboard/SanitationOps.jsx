import DashboardCard from '../ui/DashboardCard';

const OPS_PEOPLE = [
  'Harpreet Singh',
  'Manpreet Kaur',
  'Gurpreet Sandhu',
  'Navjot Sidhu',
  'Ankita Sharma',
  'Deepak Kumar',
  'Jaspreet Kaur',
];

const SanitationOps = () => {
  return (
    <DashboardCard title="Sanitation Operations & Coordination">
      <div className="max-h-64 overflow-y-auto pr-2">
        <ul className="divide-y divide-gray-200">
          {OPS_PEOPLE.map((name, idx) => (
            <li key={idx} className="py-2 text-sm text-gray-800">{name}</li>
          ))}
        </ul>
      </div>
    </DashboardCard>
  );
}
export default SanitationOps