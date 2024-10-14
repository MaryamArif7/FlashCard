

export default function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-gray-900 text-gray-200">
        {/* App Logo or Brand */}
        <div className="flex items-center justify-center h-16 bg-gray-800 text-2xl font-bold">
          YourBrand
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-6">
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
 
              <span className="text-base">Home</span>
            </li>
            <li className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
             
              <span className="text-base">Channels</span>
            </li>
            <li className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
              
              <span className="text-base">Messages</span>
            </li>
          </ul>
        </div>
8
      
      </div>
      


    
    </div>
  );
}
