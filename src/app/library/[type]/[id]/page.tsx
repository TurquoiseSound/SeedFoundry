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
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 p-20 opacity-50"></div>
      <div className="bg-slate-200 rounded-xl p-10 z-10 mt-5 relative">
        <Link className="absolute top-5 right-5 body-text" href={`/library/${params.type}`}>
          <FontAwesomeIcon icon={faXmark} className="fa-2xl"></FontAwesomeIcon>
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
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
    <div>
      <h1 className="text-3xl mb-5">
        {typeName.substring(0, typeName.length - 1)}: {item.name}
      </h1>
      <p>{item.description}</p>
      <div className="flex flex-wrap gap-4 mt-10">
        <ul className="flex-1 w-full bg-slate-400 p-5 border rounded-lg border-dashed text-center">
          <h2 className="text-2xl pb-5">👍 Advantages</h2>
          {item.advantages?.map((advantage: Advantage, i) => (
            <AdvantageItem key={i} title={advantage.title} description={advantage.description} />
          ))}
        </ul>
        <ul className="flex-1 w-full bg-slate-400 p-5 border rounded-lg border-dashed text-center">
          <h2 className="text-2xl pb-5">👎 Disadvantages</h2>
          {item.disadvantages?.map((advantage: Advantage, i) => (
            <AdvantageItem key={i} title={advantage.title} description={advantage.description} />
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-2">👀 Examples</h2>
        <span dangerouslySetInnerHTML={{ __html: item.examples || '' }} />
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-2">🌐 Resources</h2>
        <span dangerouslySetInnerHTML={{ __html: item.resources || '' }} />
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-2">🏢 Compatible Entity Structures</h2>
        {item.entityTypes?.map((option: Item, i) => (
          <Link
            key={i}
            href={`/library/entity-types/${option.id}`}
            className="rounded-2xl text-center px-4 py-1 mr-3 mb-2 inline-block entity-type"
          >
            {option.name}
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-2">💰 Compatible Funding Options</h2>
        {item.fundingOptions?.map((option: Item, i) => (
          <Link
            key={i}
            href={`/library/funding-options/${option.id}`}
            className="rounded-2xl text-center px-4 py-1 mr-3 mb-2 inline-block funding-option"
          >
            {option.name}
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-2">🤝 Compatible Business Models</h2>
        {item.businessModels?.map((model: Item, i) => (
          <Link
            key={i}
            href={`/library/business-models/${model.id}`}
            className="rounded-2xl text-center px-4 py-1 mr-3 mb-2 inline-block business-model"
          >
            {model.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewItemPage;
