import React from 'react';

interface BannerProps {
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Banner: React.FC<BannerProps> = ({ image, title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-4 shadow-md bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-900 dark:to-indigo-900">
      <img
        src={image}
        alt={title}
        className="w-full h-36 object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 py-4 bg-black/40 dark:bg-black/60">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-lg">{title}</h2>
        {subtitle && <p className="text-sm sm:text-base text-white mb-2 drop-shadow">{subtitle}</p>}
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-colors"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner; 