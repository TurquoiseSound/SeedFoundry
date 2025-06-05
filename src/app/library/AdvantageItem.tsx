'use client';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const AdvantageItem = ({ title, description }: { title: string; description?: string }) => {
  const [showDescription, setShowDescription] = React.useState(false);

  return (
    <div className="glass rounded-xl p-4 relative">
      <h3
        className="font-bold text-white cursor-pointer"
        onClick={() => setShowDescription(!showDescription)}
      >
        {title}
      </h3>
      {description && description.length > 0 && (
        <button
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-300"
          onClick={() => setShowDescription(!showDescription)}
        >
          <FontAwesomeIcon icon={showDescription ? faChevronDown : faChevronRight} />
        </button>
      )}
      {description && description.length > 0 && (
        <p
          className={`text-emerald-200 mt-2 transition-all duration-300 ${
            showDescription ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default AdvantageItem;