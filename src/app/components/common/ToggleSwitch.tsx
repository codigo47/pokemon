// src/components/ToggleSwitch.tsx
import React from 'react';

interface ToggleSwitchProps {
  label: string;
  showPercentages: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, showPercentages, onToggle }) => {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showPercentages}
          onChange={onToggle}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 peer-checked:after:translate-x-5 peer-checked:after:bg-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
      <span>{label}</span>
    </div>
  );
};

export default ToggleSwitch;
