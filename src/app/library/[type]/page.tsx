import { startCase } from 'lodash';
import React, { Suspense } from 'react';
import { NextPage } from 'next';
import Link from "next/link";
import LibraryTable from '../LibraryTable';
import GoalsSelect from '../../../components/GoalsSelect';
import { fetchItems } from '../../api/fetchItems';
import styles from './Library.module.scss'

const EntityList: React.FC<{ type: string }> = async ({ type }) => {
  const items = await fetchItems(type)

  return (
    <div>
      <LibraryTable items={items} type={type} />
    </div>
  );
};

const EntityTypesPage: NextPage<{ params: { type: string } }> = ({ params }) => {
  const type = params.type
  const name = startCase(params.type)

  return (
    <div>
      {/* <h1 className='text-3xl font-bold mb-3'>{name}</h1> */}
      <div className='flex flex-row content-center align-center justify-between'>
        <Suspense fallback={<div>Loading...</div>}>
          <GoalsSelect />
        </Suspense>
        <div className='bg-slate-300 rounded-3xl p-3 mb-5 inline-block'>
          <Link
            href='/library/entity-types'
            className={'rounded-2xl p-2 ' + (type === 'entity-types' ? styles.selected : 'bg-transparent')}
          >
            Entity Types
          </Link>
          <Link
            href='/library/business-models'
            className={'rounded-2xl p-2 ' + (type === 'business-models' ? styles.selected : 'bg-transparent')}
          >
            Business Models
          </Link>
          <Link
            href='/library/funding-options'
            className={'rounded-2xl p-2 ' + (type === 'funding-options' ? styles.selected : 'bg-transparent')}
          >
            Funding Options
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