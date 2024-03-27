'use client'

import React from 'react';
import { Item } from '../../types';
import Link from 'next/link';
import styles from './LibraryTable.module.scss'

interface LibraryTableProps {
  type: string
  items: Item[];
}

const LibraryTable: React.FC<LibraryTableProps> = ({ type, items }) => {
  const [globalFilter, setGlobalFilter] = React.useState('')

  const filteredItems = React.useMemo(() => items.filter((item) => {
    return item.name?.toLowerCase().includes(globalFilter.toLowerCase())
  }), [items, globalFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value)
  }

  return (
    <div>
      <div className='mb-0'>Filter: <input name='globalFilter' value={globalFilter} onChange={handleFilterChange} /> </div>
      <table className={styles.libraryTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Compatible Entity Structures</th>
            <th>Compatible Business Models</th>
            <th>Compatible Funding Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.name} className='bg-slate-50 mb-2'>
              <td className='text-center'>
                <Link href={`/library/${type}/${item.id}`}>
                  <h3 className='text-xl font-bold'>{item.name}</h3>
                </Link>
              </td>
              <td>
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
              <td>
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
              <td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default LibraryTable;
