'use client'

import React from 'react';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { GoalsContext } from '@/app/GoalsProvider';
import { Item } from '../../types';
import styles from './LibraryTable.module.scss';

interface LibraryTableProps {
  type: string;
  items: Item[];
}

const LibraryTable: React.FC<LibraryTableProps> = ({ type, items }) => {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { selectedGoals }  = React.useContext(GoalsContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = React.useMemo<Item[]>(() => {
    let newItems = items.filter((item) => {
      return item.name?.toLowerCase().includes(globalFilter.toLowerCase())
    })

    if (selectedGoals.length > 0) {
      newItems = newItems.sort((a, b) => {
        const aRelatedGoals = a.relatedGoals || {}
        const bRelatedGoals = b.relatedGoals || {}
        a.goalScore = isEmpty(aRelatedGoals) ? 0 : Object.keys(aRelatedGoals).filter(rg => selectedGoals.some(sg => sg.id === rg)).reduce((acc, rg) => acc * aRelatedGoals[rg], 1);
        b.goalScore = isEmpty(bRelatedGoals) ? 0 : Object.keys(bRelatedGoals).filter(rg => selectedGoals.some(sg => sg.id === rg)).reduce((acc, rg) => acc * bRelatedGoals[rg], 1);
        return b.goalScore - a.goalScore;
      })
    }

    return newItems;
  }, [items, globalFilter, selectedGoals]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <table className={styles.libraryTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Compatible Entity Structures</th>
          <th>Compatible Business Models</th>
          <th>Compatible Funding Options</th>
          {selectedGoals.length > 0 ? <th>Goal Compatibility</th> : null}
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item: Item) => {
          const compatabilityColor = item.goalScore ? `bg-${item.goalScore >= 0.8 ? 'green' : item.goalScore >= 0.5 ? 'yellow' : 'red'}-400` : 'bg-gray-200';

          return (
            <tr 
              key={item.name} 
              className="animate-fade-in"
              style={{ opacity: selectedGoals.length > 0 ? Math.max(item.goalScore || 0, 0.3) : 1}}
            >
              <td data-label="">
                <Link href={`/library/${type}/${item.id}`} className={styles.itemName}>
                  {item.name}
                </Link>
                {item.description && (
                  <p className="text-neutral-600 mt-2">{item.description}</p>
                )}
              </td>

              <td data-label="Compatible Entity Structures">
                <div className={styles.tagContainer}>
                  {item.entityTypes?.map(entity => (
                    <Link
                      href={`/library/entity-types/${entity.id}`}
                      className='rounded-2xl text-center px-4 py-1 entity-type'
                      key={entity.name}
                    >
                      {entity.name}
                    </Link>
                  ))}
                </div>
              </td>

              <td data-label="Compatible Business Models">
                <div className={styles.tagContainer}>
                  {item.businessModels?.map(model => (
                    <Link
                      href={`/library/business-models/${model.id}`}
                      className='rounded-2xl text-center px-4 py-1 business-model'
                      key={model.name}
                    >
                      {model.name}
                    </Link>
                  ))}
                </div>
              </td>

              <td data-label="Compatible Funding Options">
                <div className={styles.tagContainer}>
                  {item.fundingOptions?.map(option => (
                    <Link
                      href={`/library/funding-options/${option.id}`}
                      className='rounded-2xl text-center px-4 py-1 funding-option'
                      key={option.name}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </td>

              {selectedGoals.length > 0 ? (
                <td data-label="Goal Compatibility" className='text-center'>
                  <span 
                    className={`pl-5 rounded-2xl w-8 h-8 shadow-md ${compatabilityColor}`} 
                    title={`Compatibility Score: ${Math.round((item.goalScore || 0) * 100)}%`}
                  />
                </td>
              ) : null}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className={`${styles.skeleton} ${styles.row}`} />
    ))}
  </div>
);

export default LibraryTable;