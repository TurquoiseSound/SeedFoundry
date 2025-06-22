'use client';

import React from 'react';

import isEmpty from 'lodash.isempty';


import Link from 'next/link';

import { GoalsContext } from '@/app/GoalsProvider';

import { Item } from '../../types';

const LibraryTable: React.FC<{ type: string; items: Item[] }> = ({ type, items }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);
  const { selectedGoals } = React.useContext(GoalsContext);

  React.useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = React.useMemo<Item[]>(() => {
    if (!isClient) return items;

    let newItems = items;

    if (selectedGoals.length > 0) {
      newItems = newItems.sort((a, b) => {
        const aRelatedGoals = a.relatedGoals || {};
        const bRelatedGoals = b.relatedGoals || {};
        a.goalScore = isEmpty(aRelatedGoals)
          ? 0
          : Object.keys(aRelatedGoals)
              .filter((rg) => selectedGoals.some((sg) => sg.id === rg))
              .reduce((acc, rg) => acc * aRelatedGoals[rg], 1);
        b.goalScore = isEmpty(bRelatedGoals)
          ? 0
          : Object.keys(bRelatedGoals)
              .filter((rg) => selectedGoals.some((sg) => sg.id === rg))
              .reduce((acc, rg) => acc * bRelatedGoals[rg], 1);
        return b.goalScore - a.goalScore;
      });
    }

    return newItems;
  }, [items, selectedGoals, isClient]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {filteredItems.map((item: Item) => {
        const compatabilityColor =
          isClient && item.goalScore
            ? `bg-${item.goalScore >= 0.8 ? 'green' : item.goalScore >= 0.5 ? 'yellow' : 'red'}-400`
            : 'bg-gray-200';

        return (
          <div
            key={item.name}
            className="glass p-8 rounded-2xl animate-fade-in"
            style={{
              opacity:
                isClient && selectedGoals.length > 0 ? Math.max(item.goalScore || 0, 0.3) : 1,
            }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Link
                  href={`/library/${type}/${item.id}`}
                  className="text-2xl font-bold text-white hover:text-sophisticated-accent transition-colors duration-300"
                >
                  {item.name}
                </Link>
                {item.description && <p className="text-sophisticated mt-4">{item.description}</p>}
              </div>

              {isClient && selectedGoals.length > 0 && (
                <div className="flex items-center justify-center">
                  <div
                    className={`compatibility-indicator ${compatabilityColor}`}
                    title={`Compatibility Score: ${Math.round((item.goalScore || 0) * 100)}%`}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <h3 className="text-white/70 text-sm mb-3">Compatible Entity Structures</h3>
                <div className="flex flex-wrap gap-2">
                  {item.entityTypes?.map((entity) => (
                    <Link
                      key={entity.id}
                      href={`/library/entity-types/${entity.id}`}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm"
                    >
                      {entity.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white/70 text-sm mb-3">Compatible Business Models</h3>
                <div className="flex flex-wrap gap-2">
                  {item.businessModels?.map((model) => (
                    <Link
                      key={model.id}
                      href={`/library/business-models/${model.id}`}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm"
                    >
                      {model.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white/70 text-sm mb-3">Compatible Funding Options</h3>
                <div className="flex flex-wrap gap-2">
                  {item.fundingOptions?.map((option) => (
                    <Link
                      key={option.id}
                      href={`/library/funding-options/${option.id}`}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="glass h-64 rounded-2xl animate-pulse" />
    ))}
  </div>
);

export default LibraryTable;