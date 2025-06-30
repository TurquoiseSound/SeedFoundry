'use client';

import React from 'react';

import Link from 'next/link';

import { GoalsContext } from '@/app/GoalsProvider';

import { Item } from '../../types';

const LibraryTable: React.FC<{ type: string; items: Item[] }> = ({ items }) => {
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
        a.goalScore =
          Object.keys(aRelatedGoals).length === 0
            ? 0
            : Object.keys(aRelatedGoals)
                .filter((rg) => selectedGoals.some((sg) => sg.id === rg))
                .reduce((acc, rg) => acc * aRelatedGoals[rg], 1);
        b.goalScore =
          Object.keys(bRelatedGoals).length === 0
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
            key={item.id}
            className="glass p-6 rounded-2xl backdrop-blur-xl border border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  {isClient && item.goalScore && (
                    <span className={`inline-block w-3 h-3 rounded-full ${compatabilityColor}`} />
                  )}
                </div>
                {item.description && (
                  <p className="text-white/80 leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>

            {/* Advantages and Disadvantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {item.advantages && item.advantages.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wide">
                    Advantages
                  </h4>
                  <ul className="space-y-2">
                    {item.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">+</span>
                        <div>
                          <p className="text-white font-medium">{advantage.title}</p>
                          {advantage.description && (
                            <p className="text-white/70 text-sm">{advantage.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.disadvantages && item.disadvantages.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">
                    Disadvantages
                  </h4>
                  <ul className="space-y-2">
                    {item.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">-</span>
                        <div>
                          <p className="text-white font-medium">{disadvantage.title}</p>
                          {disadvantage.description && (
                            <p className="text-white/70 text-sm">{disadvantage.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Examples and Resources */}
            <div className="flex flex-wrap gap-4 text-sm">
              {item.examples && (
                <div>
                  <span className="text-white/60">Examples: </span>
                  <span className="text-white">{item.examples}</span>
                </div>
              )}
              {item.resources && (
                <div>
                  <span className="text-white/60">Resources: </span>
                  <Link
                    href={`https://${item.resources}`}
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {item.resources}
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="glass p-6 rounded-2xl backdrop-blur-xl border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-1/4"></div>
              <div className="h-3 bg-white/20 rounded"></div>
              <div className="h-3 bg-white/20 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-white/20 rounded w-1/4"></div>
              <div className="h-3 bg-white/20 rounded"></div>
              <div className="h-3 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LibraryTable;
