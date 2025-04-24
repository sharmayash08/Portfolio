import React from 'react';

const CircularProgress = ({ value, total, easy, medium, hard, className }) => {
  const radius = 55; // Slightly smaller radius
  const strokeWidth = 6; // Thinner stroke
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // Calculate percentages for each difficulty
  const easyPercentage = (easy.solved / easy.total) * 100;
  const mediumPercentage = (medium.solved / medium.total) * 100;
  const hardPercentage = (hard.solved / hard.total) * 100;

  // Calculate stroke lengths for each segment
  const totalLength = circumference;
  const easyLength = (easyPercentage / 100) * totalLength * 0.4; // 40% of circle
  const mediumLength = (mediumPercentage / 100) * totalLength * 0.4; // 40% of circle
  const hardLength = (hardPercentage / 100) * totalLength * 0.2; // 20% of circle

  return (
    <div className={`relative ${className}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="#262626"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Easy progress (green) */}
        <circle
          stroke="#43CD89"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${easyLength} ${circumference}`}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300"
        />

        {/* Medium progress (yellow) */}
        <circle
          stroke="#FFB800"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${mediumLength} ${circumference}`}
          strokeDashoffset={-easyLength}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300"
        />

        {/* Hard progress (red) */}
        <circle
          stroke="#FF375F"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${hardLength} ${circumference}`}
          strokeDashoffset={-(easyLength + mediumLength)}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[22px] font-medium text-[#42A1FF] -mt-0.5">{value}</span>
      </div>
    </div>
  );
};

export default CircularProgress;