import React, { Suspense } from 'react';
import { EntityType } from '../../../types';
import { NextPage } from 'next';
import LibraryTable from '../LibraryTable';
import { fetchEntityTypes } from '../../api/fetchEntityTypes';
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table'

interface EntityTypeListProps {
  entityTypes: EntityType[];
}

export const EntityList: React.FC = async () => {
  console.log('page entity list')

  const entityTypes = await getEntityTypes()

  console.log('page entity list complete')

  return (
    <div>
      <LibraryTable items={entityTypes} />
    </div>
  );
};

const EntityTypesPage: NextPage<EntityTypeListProps> = ({ entityTypes }) => {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Entity Types</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EntityList />
      </Suspense>
    </div>
  );
};

export const getEntityTypes = async (): Promise<EntityType[]> => {
  try {
    const entityTypes = await fetchEntityTypes();
    console.log('Fetched entity types:', entityTypes);
    return entityTypes;
  } catch (error) {
    console.error('Failed to fetch entity types:', error);
    return [];
  }
};

export default EntityTypesPage;