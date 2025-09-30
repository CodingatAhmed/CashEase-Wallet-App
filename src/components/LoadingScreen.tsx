import React from 'react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-12">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-4">
            <span className="text-purple-600 font-black text-3xl">G</span>
          </div>
          <span className="text-white text-5xl font-black">CashEase</span>
        </div>

        {/* Loading Content */}
        <div className="bg-white rounded-2xl p-12 shadow-2xl max-w-md mx-auto">
          {/* Animated Loading Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Setting up your account</h2>
          <p className="text-gray-600 mb-8">Please wait while we prepare everything for you...</p>

          {/* Loading Dots Animation */}
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}