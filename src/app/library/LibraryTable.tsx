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

  const filteredItems = React.useMemo<Item[]>(() => {
    let newItems = items.filter((item) => {
      return item.name?.toLowerCase().includes(globalFilter.toLowerCase())
    })

    if (selectedGoals.length > 0) {
      newItems = newItems.sort((a, b) => {
        // compare aggragated scores of related goals to selected goals
        const aRelatedGoals = a.relatedGoals || {}
        const bRelatedGoals = b.relatedGoals || {}
        a.goalScore = isEmpty(aRelatedGoals) ? 0 : Object.keys(aRelatedGoals).filter(rg => selectedGoals.some(sg => sg.id === rg)).reduce((acc, rg) => acc * aRelatedGoals[rg], 1);
        b.goalScore = isEmpty(bRelatedGoals) ? 0 : Object.keys(bRelatedGoals).filter(rg => selectedGoals.some(sg => sg.id === rg)).reduce((acc, rg) => acc * bRelatedGoals[rg], 1);
        return b.goalScore - a.goalScore;
      })
    }

    return newItems;
  }, [items, globalFilter, selectedGoals]);

  const handleFilterChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  }, [])

  return (
    <div>
      {/* Hide until more useful <div className='mb-4 md:mb-0'>Search by name: <input name='globalFilter' value={globalFilter} onChange={handleFilterChange} /> </div> */}
      <table className={styles.libraryTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Compatible Entity Structures</th>
            <th>Compatible Business Models</th>
            <th>Compatible Funding Options</th>
            {selectedGoals.length > 0 ? <th>Goal Compatability</th> : null}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item : Item) => {
            const compatabilityColor = item.goalScore ? `bg-${item.goalScore >= 0.8 ? 'green' : item.goalScore >= 0.5 ? 'yellow' : 'red'}-400` : 'bg-gray-200';

            return (
              <tr key={item.name} className='bg-transparent mb-2' style={{ opacity: selectedGoals.length > 0 ? Math.max(item.goalScore || 0, 0.3) : 1}}>
                {/* data-label used to transform table into list on mobile */}

                <td className='text-center' data-label="">
                  <Link href={`/library/${type}/${item.id}`} className='body-text'>
                    <h3 className='text-xl font-bold'>{item.name}</h3>
                  </Link>
                </td>

                <td data-label="Compatible Entity Structures: ">
                  {item.entityTypes?.map(entity => (
                    <Link
                      href={`/library/entity-types/${entity.id}`}
                      className='rounded-2xl text-center px-4 py-1 mr-3 my-1 inline-block entity-type'
                      key={entity.name}
                    >
                      {entity.name}
                    </Link>
                  ))}
                </td>

                <td data-label="Compatible Business Models">
                  {item.businessModels?.map(model => (
                    <Link
                      href={`/library/business-models/${model.id}`}
                      className='rounded-2xl text-center px-4 py-1 mr-3 my-1 inline-block business-model'
                      key={model.name}
                    >
                      {model.name}
                    </Link>
                  ))}
                </td>

                <td data-label="Compatible Funding Options">
                  {item.fundingOptions?.map(option => (
                    <Link
                      href={`/library/funding-options/${option.id}`}
                      className='rounded-2xl text-center px-4 py-1 mr-3 my-1 inline-block funding-option'
                      key={option.name}
                    >
                      {option.name}
                    </Link>
                  ))}
                </td>

                {selectedGoals.length > 0 ?
                  <td data-label="Goal Compatibility" className='text-center'>
                    <span className={`pl-5 rounded-2xl w-8 h-8 shadow-md ${compatabilityColor}`} title={"Compatability Score: " + Math.round((item.goalScore || 0)  * 100).toString()}></span>
                  </td>
                  : null}
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryTable;
