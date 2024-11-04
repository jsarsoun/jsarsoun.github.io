import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Process and aggregate data
  const vendorData = [
    { name: 'Microsoft', count: 8, details: 'Products: Copilot, Azure, Power Platform' },
    { name: 'DataBricks', count: 3, details: 'Focus: Data Analytics and ML Ops' },
    { name: 'Google', count: 2, details: 'Products: GCP, Gemini, Vertex AI' },
    { name: 'Others', count: 11, details: 'Including: Synerio, HR Acuity, Optiversal, etc.' }
  ];

  const statusData = [
    { name: 'New', count: 12, details: 'Initiatives in planning or early implementation' },
    { name: 'Existing', count: 6, details: 'Currently operational initiatives' }
  ];

  const departmentData = [
    { 
      name: '636 Data Science & Analytics', 
      count: 4, 
      details: 'Focus: Voice of Member, BI Modernization, UDP'
    },
    { 
      name: '634 Data & Platforms', 
      count: 4, 
      details: 'Focus: Power BI, Power Apps, Power Automate'
    },
    { 
      name: '602 Ancillary', 
      count: 3, 
      details: 'Focus: Pharmacy AI, Github Copilot'
    },
    { 
      name: 'Other/not company x IT', 
      count: 8, 
      details: 'Various initiatives across different business units'
    },
    { 
      name: 'Other Departments', 
      count: 5, 
      details: 'Including Enterprise Architecture, Information Security'
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">Count: {payload[0].value}</p>
          <p className="text-sm text-gray-600">{payload[0].payload.details}</p>
        </div>
      );
    }
    return null;
  };

  const PieCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">Count: {payload[0].value}</p>
          <p className="text-sm text-gray-600">{payload[0].payload.details}</p>
          <p className="text-sm">
            Percentage: {((payload[0].value / vendorData.reduce((acc, curr) => acc + curr.count, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI Initiatives Analysis Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vendor Distribution */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Vendor Distribution</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={vendorData}
                  cx={200}
                  cy={150}
                  labelLine={true}
                  label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {vendorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieCustomTooltip />} />
              </PieChart>
            </div>

            {/* Initiative Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Initiative Status</h3>
              <BarChart width={400} height={300} data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>

            {/* Department Distribution */}
            <div className="space-y-4 col-span-2">
              <h3 className="text-lg font-semibold">Department Distribution</h3>
              <BarChart width={800} height={300} data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
