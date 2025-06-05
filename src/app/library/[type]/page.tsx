import { startCase } from 'lodash';
import React, { Suspense } from 'react';
import Link from "next/link";
import LibraryTable from '../LibraryTable';
import GoalsSelect from '../../../components/GoalsSelect';
import { fetchItems } from '../../api/fetchItems';
import styles from './Library.module.scss'

interface PageProps {
  params: {
    type: string;
  };
}

const EntityList: React.FC<{ type: string }> = async ({ type }) => {
  const items = await fetchItems(type)

  return (
    <div>
      <LibraryTable items={items} type={type} />
    </div>
  );
};

const EntityTypesPage = ({ params }: PageProps) => {
  const type = params.type
  const name = startCase(params.type)

  return (
    <div>
      <div className='flex flex-col md:flex-row content-center align-center justify-between md:items-center'>
        <div className='mb-5'>
          <Suspense fallback={<div>Loading...</div>}>
            <GoalsSelect />
          </Suspense>
        </div>
        <div className='bg-slate-300 rounded-3xl p-2 inline-block mb-5 flex text-sm sm:text-base'>
          <Link
            href='/library/entity-types'
            className={'flex-1 text-nowrap text-center rounded-2xl px-2 py-1 ' + (type === 'entity-types' ? styles.selected : 'bg-transparent')}
          >
            Entity Types
          </Link>
          <Link
            href='/library/funding-options'
            className={'flex-1 text-nowrap text-center rounded-2xl px-2 py-1 ' + (type === 'funding-options' ? styles.selected : 'bg-transparent')}
          >
            Funding Options
          </Link>
          <Link
            href='/library/business-models'
            className={'flex-1 text-nowrap text-center rounded-2xl px-2 py-1 ' + (type === 'business-models' ? styles.selected : 'bg-transparent')}
          >
            Business Models
          </Link>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EntityList type={params.type} />
      </Suspense>
    </div>
  );
};

export default EntityTypesPage;