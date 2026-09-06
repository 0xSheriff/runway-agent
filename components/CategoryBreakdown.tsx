'use client';

import React from 'react';
import { CategoryBreakdown as CategoryItem } from '@/lib/types';
import { PieChart, Layers } from 'lucide-react';

interface CategoryBreakdownProps {
  categories: CategoryItem[];
  loading: boolean;
}

export default function CategoryBreakdown({ categories, loading }: CategoryBreakdownProps) {
  if (loading) {
    return (
      <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
        <div className="h-4 w-40 bg-[#26262A] rounded-none mb-3 animate-skeleton"></div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-6 w-full bg-[#26262A] rounded-none animate-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
      <div className="flex items-center justify-between border-b border-[#1E1E22] pb-2 mb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
          <Layers className="h-3.5 w-3.5 text-[#D9A441]" />
          OUTFLOW CATEGORY DISTRIBUTION
        </div>
        <span className="font-mono text-[11px] text-[#A1A1AA]">30D AUDIT</span>
      </div>

      {categories.length === 0 ? (
        <div className="p-4 text-center font-mono text-xs text-[#71717A]">
          No outflow categories detected
        </div>
      ) : (
        <div className="space-y-2.5">
          {categories.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#F3F4F6] font-medium">{item.category}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#A1A1AA]">${item.amountUsd.toLocaleString()}</span>
                  <span className="text-[#D9A441] font-bold w-9 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-[#0A0A0B] border border-[#26262A] rounded-none">
                <div
                  style={{ width: `${Math.min(100, Math.max(2, item.percentage))}%` }}
                  className="h-full bg-[#D9A441] rounded-none transition-all duration-300"
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
