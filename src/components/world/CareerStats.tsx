import React from 'react';
import { Card } from '../ui/Card';
import { formatNumber } from '../../utils/formatters';
import { CareerStats as CareerStatsType } from '../../types';

interface CareerStatsProps {
  stats: CareerStatsType;
}

export const CareerStats: React.FC<CareerStatsProps> = ({ stats }) => {
  const statItems = [
    { label: 'SHOWS REALIZADOS', value: stats.shows },
    { label: 'CIDADES ALCANÇADAS', value: stats.cities },
    { label: 'PAÍSES VISITADOS', value: stats.countries },
    { label: 'STREAMS GLOBAIS', value: formatNumber(stats.streams) },
    { label: 'COLABORAÇÕES', value: stats.collaborations },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {statItems.map((item, idx) => (
        <Card key={idx} className="flex flex-col items-center justify-center p-6 text-center">
          <span className="text-3xl sm:text-4xl font-display font-black text-accent shadow-glow mb-1">
            {item.value}
          </span>
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-text-muted uppercase">
            {item.label}
          </span>
        </Card>
      ))}
    </div>
  );
};
