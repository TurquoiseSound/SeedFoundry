import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase } from 'lodash';
import Link from 'next/link';
import React, { Suspense } from 'react';

import { Advantage, Item } from '../../../../types';
import { fetchItem } from '../../../api/fetchItems';
import AdvantageItem from '../../AdvantageItem';

interface PageProps {
  params: {
    id: string;
    type: string;
  };
}

const ViewItemPage = ({ params }: PageProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="glass rounded-2xl p-10 z-10 mt-5 relative max-w-7xl mx-auto">
        <Link
          className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors duration-300"
          href={`/library/${params.type}`}
        >
          <FontAwesomeIcon icon={faXmark} className="fa-2xl" />
        </Link>
        <Suspense fallback={<div className="skeleton h-96 rounded-xl"></div>}>
          <ItemDetails id={params.id} type={params.type} />
        </Suspense>
      </div>
    </>
  );
};

const ItemDetails: React.FC<{ id: string; type: string }> = async (props) => {
  const item = await fetchItem(props.id);
  const typeName = startCase(props.type);

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-8">
        {typeName.substring(0, typeName.length - 1)}: {item.name}
      </h1>
      <p className="text-emerald-200 text-lg mb-10">{item.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">👍 Advantages</h2>
          <div className="space-y-4">
            {item.advantages?.map((advantage: Advantage, i) => (
              <AdvantageItem key={i} title={advantage.title} description={advantage.description} />
            ))}
          </div>
        </div>
        
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6">👎 Disadvantages</h2>
          <div className="space-y-4">
            {item.disadvantages?.map((advantage: Advantage, i) => (
              <AdvantageItem key={i} title={advantage.title} description={advantage.description} />
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-4">👀 Examples</h2>
        <div className="text-emerald-200" dangerouslySetInnerHTML={{ __html: item.examples || '' }} />
      </div>

      <div className="glass p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-4">🌐 Resources</h2>
        <div className="text-emerald-200" dangerouslySetInnerHTML={{ __html: item.resources || '' }} />
      </div>

      <div className="glass p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-4">🏢 Compatible Entity Structures</h2>
        <div className="flex flex-wrap gap-3">
          {item.entityTypes?.map((option: Item) => (
            <Link
              key={option.id}
              href={`/library/entity-types/${option.id}`}
              className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="glass p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold mb-4">💰 Compatible Funding Options</h2>
        <div className="flex flex-wrap gap-3">
          {item.fundingOptions?.map((option: Item) => (
            <Link
              key={option.id}
              href={`/library/funding-options/${option.id}`}
              className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="glass p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">🤝 Compatible Business Models</h2>
        <div className="flex flex-wrap gap-3">
          {item.businessModels?.map((model: Item) => (
            <Link
              key={model.id}
              href={`/library/business-models/${model.id}`}
              className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
            >
              {model.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewItemPage;