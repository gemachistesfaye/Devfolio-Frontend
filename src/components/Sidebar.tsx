import React from 'react';
import { NavLink } from 'react-router-dom';
import { Files, Search, GitBranch, Play, Settings, User } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <Files size={24} />, label: "Explorer", path: "/developer" },
    { icon: <Search size={24} />, label: "Search", path: "/developer/projects" },
    { icon: <GitBranch size={24} />, label: "Source Control", path: "/developer/skills" },
    { icon: <Play size={24} />, label: "Run & Debug", path: "/developer/architecture" },
    { icon: <User size={24} />, label: "Accounts", path: "/developer/timeline" },
    { icon: <Settings size={24} />, label: "Settings", path: "/developer/contact" }
  ];

  return (
    <div className="w-16 h-[calc(100vh-3.5rem)] bg-[#333333] dev-theme:bg-[#252526] border-r border-border-default dev-theme:border-none flex flex-col items-center py-4 fixed left-0 top-14 z-50">
      <div className="flex flex-col gap-4 w-full">
        {menuItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            title={item.label}
            className={({isActive}) => `
              w-full flex justify-center py-3 transition-all duration-200
              ${isActive ? 'text-white border-l-2 border-primary' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            {item.icon}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4 w-full">
        {menuItems.slice(4).map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            title={item.label}
            className="w-full flex justify-center py-3 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {item.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
