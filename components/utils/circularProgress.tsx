import React from 'react';

interface CircularProgressBarProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    children: any
}

const CircularProgressBar = ({
    percentage,
    size = 120,
    strokeWidth = 10,
    children
}: CircularProgressBarProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className='relative'>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="circular-progress-bar"
            >
                <circle
                    className="stroke-zinc-300 dark:stroke-zinc-700"
                    strokeWidth={strokeWidth}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                >
                </circle>
                <circle
                    className="stroke-blue-500 dark:stroke-blue-600"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate the circle to start at the top
                />


            </svg>
            <div className='absolute top-0 right-0 left-0 bottom-0.5 flex flex-col items-center justify-center'>
                {children}
            </div>
        </div>
    )
}

export default CircularProgressBar;