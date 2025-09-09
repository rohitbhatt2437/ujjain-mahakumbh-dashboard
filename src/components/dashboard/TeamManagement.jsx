import React from 'react';
import DashboardCard from '../ui/DashboardCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// --- 1. Hardcoded data for team performance ---
const teamData = [
  { name: 'Team Alpha', responseTime: 2.5 },
  { name: 'Team Bravo', responseTime: 4.8 },
  { name: 'Team Charlie', responseTime: 6.2 },
  { name: 'Ghat 1 Unit', responseTime: 3.1 },
  { name: 'Sector 5 Crew', responseTime: 5.5 },
  { name: 'Mobile Unit 3', responseTime: 4.1 },
];

// --- 2. Logic to determine color based on performance ---
// Lower response time is better.
const getColor = (time) => {
  if (time <= 3.5) return '#16A34A'; // Green for excellent performance
  if (time <= 5.0) return '#FBBF24'; // Yellow for average performance
  return '#DC2626';                // Red for poor performance
};

const TeamManagement = () => {
  return (
    <DashboardCard title="Team Management Dashboard">
      <div className="w-full h-64"> {/* Set a height for the chart container */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={teamData}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend formatter={() => "Avg. Response Time"} />
            <Bar dataKey="responseTime">
              {/* 3. Apply the color to each bar individually */}
              {teamData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.responseTime)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default TeamManagement;