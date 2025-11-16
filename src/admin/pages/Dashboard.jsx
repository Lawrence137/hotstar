import React from 'react';
import { Trophy, Store, Image, FileText, ArrowUpRight, UserPlus, MessageSquare, ShoppingCart } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => {
  const Icon = icon;
  return (
    <div className={`bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-gray-800 hover:border-${color}-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-${color}-500/10`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-500/20 rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs text-green-400">
        <ArrowUpRight size={14} className="mr-1" />
        <span>5.2% vs last month</span>
      </div>
    </div>
  );
};

const RecentActivityItem = ({ icon, text, time }) => {
  const Icon = icon;
  return (
    <div className="flex items-center space-x-4 p-3 hover:bg-gray-800/50 rounded-lg">
      <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center">
        <Icon size={20} className="text-gray-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-white">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>
      <p className="text-gray-400 mb-8">Overview of your website's content and activity.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Matches" value="42" icon={Trophy} color="yellow" />
        <StatCard title="Marketplace Items" value="128" icon={Store} color="red" />
        <StatCard title="Gallery Images" value="345" icon={Image} color="blue" />
        <StatCard title="Blog Posts" value="58" icon={FileText} color="green" />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Recent Activity</h2>
        <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-2xl border border-gray-800 space-y-2">
          <RecentActivityItem icon={UserPlus} text="New user 'John Doe' registered." time="2 hours ago" />
          <RecentActivityItem icon={MessageSquare} text="New comment on blog post 'Championship Glory'." time="5 hours ago" />
          <RecentActivityItem icon={ShoppingCart} text="New order #1234 for 'Home Jersey 2024'." time="1 day ago" />
          <RecentActivityItem icon={FileText} text="New blog post 'Training Camp Insights' published." time="2 days ago" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
