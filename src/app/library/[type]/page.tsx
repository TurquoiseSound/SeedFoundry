import React, { Suspense } from 'react';

import Link from 'next/link';

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
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              type === 'entity-types'
                ? 'text-gradient font-medium'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Legal Entities
          </Link>
          <Link
            href="/library/business-models"
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              type === 'business-models'
                ? 'text-gradient font-medium'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Business Models
          </Link>
          <Link
            href="/library/funding-options"
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              type === 'funding-options'
                ? 'text-gradient font-medium'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Funding
          </Link>
        </div>
      </div>

      <Suspense fallback={<div className="h-96 skeleton rounded-lg"></div>}>
        <EntityList type={type} />
      </Suspense>
    </div>
  );
};

export default EntityTypesPage;