import React, { useState } from 'react';
import DashboardCard from '../ui/DashboardCard';

const PEOPLE = [
  'Aman Sharma', 'Priya Verma', 'Rohit Gupta', 'Neha Singh', 'Karan Mehta',
  'Simran Kaur', 'Vikram Rao', 'Anjali Nair', 'Arjun Patel', 'Isha Kapoor',
  'Rahul Yadav', 'Sneha Iyer', 'Varun Joshi', 'Pooja Bansal', 'Nitin Malhotra',
  'Riya Soni', 'Sahil Khanna', 'Meera Das', 'Aditya Jain', 'Tanvi Arora'
];

const TeamManagement = () => {
  // true => Assigned (red, checked), false => Free (green, unchecked)
  const [assigned, setAssigned] = useState(() => PEOPLE.map(() => Math.random() < 0.5));

  const toggleAssigned = (idx) => {
    setAssigned((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <DashboardCard title="Team Management">
      <div className="max-h-72 overflow-y-auto pr-2">
        <ul className="divide-y divide-gray-200">
          {PEOPLE.map((name, idx) => (
            <li key={idx} className="flex items-center justify-between py-2">
              <span className={`text-sm font-medium ${assigned[idx] ? 'text-red-600' : 'text-green-600'}`}>{name}</span>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={assigned[idx]}
                  onChange={() => toggleAssigned(idx)}
                />
                <span className="text-gray-600">{assigned[idx] ? 'Assigned' : 'Free'}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </DashboardCard>
  );
};

export default TeamManagement;