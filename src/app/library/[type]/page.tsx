import Link from 'next/link';
import React, { Suspense } from 'react';

import GoalsSelect from '../../../components/GoalsSelect';
import { fetchItems } from '../../api/fetchItems';
import LibraryTable from '../LibraryTable';

const EntityList: React.FC<{ type: string }> = async ({ type }) => {
  const items = await fetchItems();

  return (
    <div>
      <LibraryTable items={items} type={type} />
    </div>
  );
};

const EntityTypesPage = ({ params }: { params: { type: string } }) => {
  const type = params.type;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16">
      <div className="flex flex-col md:flex-row content-center align-center justify-between md:items-center mb-8">
        <div className="mb-5 md:mb-0">
          <Suspense fallback={<div className="h-14 skeleton rounded-lg w-[300px]"></div>}>
            <GoalsSelect />
          </Suspense>
        </div>
        <div className="glass rounded-2xl p-2 inline-flex text-sm sm:text-base gap-2">
          <Link
            href="/library/entity-types"
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              type === 'entity-types'
                ? 'bg-white/10 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Entity Types
          </Link>
          <Link
            href="/library/funding-options"
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              type === 'funding-options'
                ? 'bg-white/10 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Funding Options
          </Link>
          <Link
            href="/library/business-models"
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              type === 'business-models'
                ? 'bg-white/10 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
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