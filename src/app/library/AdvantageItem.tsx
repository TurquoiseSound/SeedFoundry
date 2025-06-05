'use client';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'; // import the icons you need
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component
import React from 'react';

const AdvantageItem = ({ title, description }: { title: string; description?: string }) => {
  const [showDescription, setShowDescription] = React.useState(false);

  return (
    <li className="rounded-xl bg-slate-100 mb-2 p-2 relative text-left">
      <h3 className="font-bold" onClick={() => setShowDescription(!showDescription)}>
        {title}
      </h3>
      {description && description.length > 0 && (
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowDescription(!showDescription)}
        >
          {
            <FontAwesomeIcon
              icon={showDescription ? faChevronDown : faChevronRight}
            ></FontAwesomeIcon>
          }
        </button>
      )}
      {description && description.length > 0 && (
        <p className={showDescription ? '' : 'hidden'}>{description}</p>
      )}
    </li>
  );
};

export default AdvantageItem;
