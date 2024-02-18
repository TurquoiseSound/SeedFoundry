'use client'

import React from 'react';
import { EntityType } from '../../types';
// import EntityList from '../components/EntityList';
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table'
import styles from './LibraryTable.module.scss'

interface LibraryTableProps {
  items: EntityType[];
}

const LibraryTable: React.FC<LibraryTableProps> = ({ items }) => {
  console.log('tablexxx', items)

  const [globalFilter, setGlobalFilter] = React.useState('')

  const filteredEntityTypes = React.useMemo(() => items.filter((entityType) => {
    return entityType.name?.toLowerCase().includes(globalFilter.toLowerCase())
  }), [items, globalFilter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value)
  }

  return (
    <div>
      <div className='mb-8'>Filter: <input name='globalFilter' value={globalFilter} onChange={handleFilterChange} /> </div>
      <table className={styles.libraryTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Business Models</th>
            <th>Funding Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntityTypes.map((entityType) => (
            <tr key={entityType.name} className='bg-slate-50 mb-2'>
              <td className='text-center'>
                <h3 className='text-2xl font-bold'>{entityType.name}</h3>
              </td>
              <td>
                {entityType.businessModels.map(model => (
                  <span key={model.name}>{model.name}, </span>
                ))}
              </td>
              <td>
                {entityType.fundingOptions.map(option => (
                  <span key={option.name}>{option.name}, </span>
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
