import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Map, Leaf } from 'lucide-react';

const TreeDemo = () => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [activeTab, setActiveTab] = useState('map');

  // Sample tree data
  const trees = [
    { id: 1, species: "Pine", lat: "39.9042", lon: "116.4074", carbonSeq: 150.5, growth: 85 },
    { id: 2, species: "Oak", lat: "31.2304", lon: "121.4737", carbonSeq: 180.2, growth: 92 },
    { id: 3, species: "Maple", lat: "22.5431", lon: "114.0579", carbonSeq: 120.8, growth: 78 }
  ];

  // Sample carbon data for charts
  const carbonData = [
    { month: 'Jan', carbon: 120 },
    { month: 'Feb', carbon: 135 },
    { month: 'Mar', carbon: 150 },
    { month: 'Apr', carbon: 168 },
    { month: 'May', carbon: 185 },
    { month: 'Jun', carbon: 200 }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tree Carbon Sequestration Demo</h1>
        <p className="text-gray-600">Interactive demonstration of tree tracking and carbon data</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'map' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('map')}
        >
          <Map size={20} />
          Map View
        </button>
        <button 
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'trees' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveTab('trees')}
        >
          <Leaf size={20} />
          Tree List
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel - Tree List or Map */}
        <div className="bg-gray-50 p-4 rounded-lg">
          {activeTab === 'map' ? (
            <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center">
              <Map size={48} className="text-gray-400" />
              <p className="text-gray-600 ml-2">Interactive Map Placeholder</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trees.map(tree => (
                <div 
                  key={tree.id}
                  className={`p-4 rounded-lg cursor-pointer ${selectedTree?.id === tree.id ? 'bg-green-100 border-2 border-green-500' : 'bg-white border border-gray-200'}`}
                  onClick={() => setSelectedTree(tree)}
                >
                  <div className="flex items-center gap-3">
                    <Leaf size={24} className="text-green-600" />
                    <div>
                      <h3 className="font-semibold">Tree #{tree.id} - {tree.species}</h3>
                      <p className="text-sm text-gray-600">Location: {tree.lat}, {tree.lon}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Tree Details and Charts */}
        <div className="bg-gray-50 p-4 rounded-lg">
          {selectedTree ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Tree Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Species:</span> {selectedTree.species}</p>
                  <p><span className="font-medium">Location:</span> {selectedTree.lat}, {selectedTree.lon}</p>
                  <p><span className="font-medium">Carbon Sequestered:</span> {selectedTree.carbonSeq} kg</p>
                  <p><span className="font-medium">Growth Status:</span> {selectedTree.growth}%</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Carbon Sequestration Trend</h3>
                <LineChart width={300} height={200} data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="carbon" stroke="#059669" />
                </LineChart>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select a tree to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeDemo;
