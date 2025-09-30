import React, { useState } from 'react';
import {
  ArrowRight,
  Plus,
  MoreHorizontal,
  Home,
  BarChart3,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  Send,
  Wallet,
  ArrowDownToLine,
  HandCoins,
  Zap,
  Ticket,
  GraduationCap,
  Shield,
  TrendingUp,
  Wifi,
  Droplets
} from 'lucide-react';
// The import for Button is present but not necessary for the fix, keeping it for completeness
import { Button } from './ui/button';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Data Definitions (Contacts, Transactions, Menus) ---
  const contacts = [
    { name: 'Alexandria', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e6ad95?w=60&h=60&fit=crop&crop=face' },
    { name: 'Immanuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' },
    { name: 'Kayshania', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit-crop&crop=face' },
    { name: 'Ibrahim', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit-crop&crop=face' }
  ];

  const transactions = [
    {
      type: 'Transfer',
      date: 'Yesterday • 19:12',
      amount: '-Rp 600.000',
      icon: '💸',
      color: 'text-red-500'
    },
    {
      type: 'Top Up',
      date: 'May 29, 2023 • 19:12',
      amount: '+Rp 260.000',
      icon: '🚚',
      color: 'text-green-500'
    },
    {
      type: 'Internet',
      date: 'May 16, 2023 • 17:34',
      amount: '-Rp 350.000',
      icon: '📶',
      color: 'text-red-500'
    }
  ];

  const navigationItems = [
    { name: 'Home', icon: Home },
    { name: 'Reports', icon: BarChart3 },
    { name: 'History', icon: FileText },
    { name: 'Profile', icon: User }
  ];

  const mainMenuItems = [
    { name: 'Transfer', icon: Send, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Top Up', icon: Wallet, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Withdraw', icon: ArrowDownToLine, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'Request', icon: HandCoins, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const paymentItems = [
    { name: 'Electricity', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Online Ticket', icon: Ticket, color: 'text-pink-600', bg: 'bg-pink-100' },
    { name: 'Education', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Insurance', icon: Shield, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Invest', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Internet & TV Cable', icon: Wifi, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { name: 'Water', icon: Droplets, color: 'text-teal-600', bg: 'bg-teal-100' }
  ];
  // --- END Data Definitions ---


  return (
    // The main wrapper class is now simplified for the overall container.
    <div className="min-h-screen min-w-screen bg-gray-50 relative overflow-hidden">

      {/* 1. Backdrop Overlay (unchanged, as it's correctly dimming the whole screen area) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 2. Hamburger Menu (unchanged) */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Menu Header */}
        <div className="p-6 bg-gradient-to-br from-purple-600 to-purple-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 font-black">G</span>
              </div>
              <span className="text-white font-black text-xl">CashEase</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="p-6 overflow-y-auto h-full pb-20">
          {/* Navigation Items */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMenuOpen(false);
                  }}
                  className={`flex flex-col items-center p-4 rounded-2xl transition-all hover:scale-105 ${activeTab === item.name
                    ? 'bg-purple-100 text-purple-600 shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="w-8 h-8 mb-2" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Menu */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Main Menu</h3>
            <div className="grid grid-cols-2 gap-3">
              {mainMenuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center p-4 rounded-2xl transition-all hover:scale-105 bg-gray-50 hover:bg-gray-100"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mb-2`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment List */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Payment List</h3>
            <div className="grid grid-cols-2 gap-3">
              {paymentItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center p-4 rounded-2xl transition-all hover:scale-105 bg-gray-50 hover:bg-gray-100"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mb-2`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-6">
            <button className="w-full flex items-center justify-center p-4 text-red-600 hover:bg-red-50 rounded-2xl transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content (The fix is here) */}
      {/* We apply a transition and conditionally change the opacity based on isMenuOpen */}
      <div
        className={`min-h-screen transition-opacity duration-300 ${isMenuOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8">
          {/* Header with Hamburger and Points */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white hover:bg-white/20 p-3 rounded-full transition-colors mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-white text-2xl font-semibold mb-1">Welcome back!</h1>
                <p className="text-purple-200">Manage your finances with ease</p>
              </div>
            </div>
            <div className="bg-yellow-400 text-black px-6 py-3 rounded-full flex items-center">
              <span className="text-yellow-600 mr-2">⭐</span>
              <span className="font-semibold">1,972 Points</span>
            </div>
          </div>

          {/* Balance Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
            <p className="text-purple-200 mb-2">Your Balance</p>
            <div className="flex items-center justify-center">
              <h2 className="text-4xl font-black">Rp 24,321,900</h2>
              <span className="ml-3 text-3xl">💸</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-3 mx-auto">
                <Send className="w-7 h-7 text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">Transfer</span>
            </div>
            <div className="text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-3 mx-auto">
                <Wallet className="w-7 h-7 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Top Up</span>
            </div>
            <div className="text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-3 mx-auto">
                <ArrowDownToLine className="w-7 h-7 text-orange-600" />
              </div>
              <span className="text-gray-700 font-medium">Withdraw</span>
            </div>
            <div
              className="text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setIsMenuOpen(true)}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-3 mx-auto">
                <MoreHorizontal className="w-7 h-7 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium">More</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Send Again Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 text-lg">Send Again</h3>
                <button className="text-purple-600 text-sm flex items-center hover:text-purple-700">
                  See all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="flex space-x-4">
                {/* Add New */}
                <div className="text-center cursor-pointer">
                  <div className="w-16 h-16 border-2 border-dashed border-purple-300 rounded-full flex items-center justify-center mb-2 hover:border-purple-400 transition-colors">
                    <Plus className="w-7 h-7 text-purple-600" />
                  </div>
                  <span className="text-xs text-purple-600 font-medium">Add New</span>
                </div>

                {/* Contacts */}
                {contacts.map((contact, index) => (
                  <div key={index} className="text-center cursor-pointer">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-16 h-16 rounded-full object-cover mb-2 hover:scale-105 transition-transform"
                    />
                    <span className="text-xs text-gray-700 font-medium">{contact.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Transaction */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 text-lg">Latest Transactions</h3>
                <button className="text-purple-600 text-sm flex items-center hover:text-purple-700">
                  See all <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${transaction.type === 'Transfer' ? 'bg-red-100' :
                        transaction.type === 'Top Up' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                        {transaction.type === 'Transfer' && <Send className="w-6 h-6 text-red-600" />}
                        {transaction.type === 'Top Up' && <Wallet className="w-6 h-6 text-green-600" />}
                        {transaction.type === 'Internet' && <Wifi className="w-6 h-6 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${transaction.color}`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}