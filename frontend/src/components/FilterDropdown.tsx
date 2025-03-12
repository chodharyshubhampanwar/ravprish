import React from "react";

interface FilterDropdownProps {
  label: string;
  value: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  //   onClear: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  defaultValue = "all",
  options,
  onChange,
  //   onClear,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value={defaultValue}>All {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-blue-700">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
