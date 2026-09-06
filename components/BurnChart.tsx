'use client';

import React from 'react';
import { ChartPoint } from '@/lib/types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { Activity } from 'lucide-react';

interface BurnChartProps {
  data: ChartPoint[];
  loading: boolean;
}

export default function BurnChart({ data, loading }: BurnChartProps) {
  // Pure Skeleton Loader matching exact chart container height
  if (loading) {
    return (
      <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-48 bg-[#26262A] rounded-none animate-skeleton"></div>
          <div className="h-4 w-24 bg-[#26262A] rounded-none animate-skeleton"></div>
        </div>
        <div className="h-64 w-full bg-[#0A0A0B] border border-[#26262A] p-4 flex items-end justify-between gap-2">
          {Array.from({ length: 16 }).map((_, i) => {
            const heightPct = Math.max(15, 90 - i * 5);
            return (
              <div
                key={i}
                style={{ height: `${heightPct}%` }}
                className="w-full bg-[#26262A] rounded-none animate-skeleton"
              ></div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full border border-[#26262A] bg-[#121214] p-6 rounded-sm text-center font-mono text-xs text-[#71717A]">
        NO CHART DATA AVAILABLE
      </div>
    );
  }

  return (
    <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
      <div className="flex items-center justify-between mb-3 border-b border-[#1E1E22] pb-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
          <Activity className="h-3.5 w-3.5 text-[#D9A441]" />
          TREASURY BALANCE & RUNWAY PROJECTION
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 text-[#F3F4F6]">
            <span className="h-2 w-2 bg-[#D9A441]"></span>
            HISTORICAL
          </span>
          <span className="flex items-center gap-1.5 text-[#A1A1AA]">
            <span className="h-2 w-2 bg-[#71717A]"></span>
            PROJECTION
          </span>
        </div>
      </div>

      <div className="h-64 w-full bg-[#0A0A0B] border border-[#26262A] pt-4 pr-4 pl-0 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="date"
              stroke="#52525B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#26262A' }}
              tick={{ fill: '#A1A1AA', fontFamily: 'var(--font-ibm-plex-mono)' }}
            />
            <YAxis
              stroke="#52525B"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#26262A' }}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              tick={{ fill: '#A1A1AA', fontFamily: 'var(--font-ibm-plex-mono)' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pData = payload[0].payload as ChartPoint;
                  return (
                    <div className="bg-[#141416] border border-[#D9A441] p-2 text-xs font-mono rounded-sm">
                      <div className="text-[#71717A] text-[10px]">{pData.date}</div>
                      <div className="text-[#D9A441] font-bold mt-0.5">
                        ${pData.balanceUsd.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#A1A1AA]">
                        {pData.isProjection ? '[PROJECTION]' : '[HISTORICAL]'}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="3 3" />
            <Line
              type="linear"
              dataKey="balanceUsd"
              stroke="#D9A441"
              strokeWidth={2}
              dot={{ r: 2, fill: '#D9A441' }}
              activeDot={{ r: 4, fill: '#F3F4F6', stroke: '#D9A441' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
