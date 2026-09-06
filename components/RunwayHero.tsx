'use client';

import React from 'react';
import { TreasuryMetrics } from '@/lib/types';
import { TrendingDown, TrendingUp, DollarSign, Calendar, Zap, AlertCircle } from 'lucide-react';

interface RunwayHeroProps {
  metrics: TreasuryMetrics | null;
  loading: boolean;
}

export default function RunwayHero({ metrics, loading }: RunwayHeroProps) {
  if (loading) {
    return (
      <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm animate-skeleton min-h-[140px] flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="h-6 w-32 bg-[#26262A] rounded-none"></div>
          <div className="h-4 w-24 bg-[#26262A] rounded-none"></div>
        </div>
        <div className="h-12 w-48 bg-[#26262A] my-3 rounded-none"></div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-8 bg-[#26262A] rounded-none"></div>
          <div className="h-8 bg-[#26262A] rounded-none"></div>
          <div className="h-8 bg-[#26262A] rounded-none"></div>
          <div className="h-8 bg-[#26262A] rounded-none"></div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const {
    runwayDays,
    dailyBurnRate,
    totalBalanceUsd,
    nativeBalance,
    nativeSymbol,
    outflow30dUsd,
    inflow30dUsd,
    isSurplus,
    hasActivity,
  } = metrics;

  return (
    <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* Hero Runway Metric (Top-Left, Large) */}
        <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-[#26262A] pb-4 lg:pb-0 lg:pr-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] tracking-wider uppercase">
              <Calendar className="h-3.5 w-3.5 text-[#D9A441]" />
              ESTIMATED TREASURY RUNWAY
            </div>
            
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-[#D9A441]">
                {!hasActivity
                  ? '0'
                  : isSurplus
                  ? '365+'
                  : runwayDays}
              </span>
              <span className="font-mono text-xl sm:text-2xl text-[#A1A1AA] uppercase">
                {!hasActivity ? 'DAYS' : isSurplus ? 'DAYS (SURPLUS)' : 'DAYS'}
              </span>
            </div>

            <p className="mt-1 text-xs text-[#A1A1AA]">
              {!hasActivity
                ? 'No transaction history detected on this wallet.'
                : isSurplus
                ? 'Treasury inflows exceed outflows over the past 30 days.'
                : `At current net burn rate of $${dailyBurnRate.toLocaleString()}/day.`}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E1E22] flex items-center justify-between text-xs font-mono">
            <span className="text-[#71717A]">DEPLETION PROJECTION:</span>
            <span className="text-[#F3F4F6] font-semibold">
              {isSurplus
                ? 'SUSTAINABLE (NET POSITIVE)'
                : `${runwayDays} DAYS (${new Date(Date.now() + runwayDays * 86400000).toLocaleDateString()})`}
            </span>
          </div>
        </div>

        {/* Dense Financial Metrics Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-3 pl-0 lg:pl-2">
          
          <div className="border border-[#26262A] bg-[#0A0A0B] p-2.5 rounded-sm">
            <div className="text-[11px] font-mono text-[#71717A] flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-[#D9A441]" />
              TOTAL BALANCE
            </div>
            <div className="font-mono text-lg font-bold text-[#F3F4F6] mt-1">
              ${totalBalanceUsd.toLocaleString()}
            </div>
            <div className="font-mono text-[11px] text-[#A1A1AA]">
              {nativeBalance} {nativeSymbol}
            </div>
          </div>

          <div className="border border-[#26262A] bg-[#0A0A0B] p-2.5 rounded-sm">
            <div className="text-[11px] font-mono text-[#71717A] flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-[#D9A441]" />
              DAILY BURN RATE
            </div>
            <div className="font-mono text-lg font-bold text-[#D9A441] mt-1">
              ${dailyBurnRate.toLocaleString()}
            </div>
            <div className="font-mono text-[11px] text-[#A1A1AA]">
              / 24h Average
            </div>
          </div>

          <div className="border border-[#26262A] bg-[#0A0A0B] p-2.5 rounded-sm">
            <div className="text-[11px] font-mono text-[#71717A] flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-[#EF4444]" />
              30D OUTFLOW
            </div>
            <div className="font-mono text-lg font-bold text-[#F3F4F6] mt-1">
              ${outflow30dUsd.toLocaleString()}
            </div>
            <div className="font-mono text-[11px] text-[#A1A1AA]">
              Recorded Outflows
            </div>
          </div>

          <div className="border border-[#26262A] bg-[#0A0A0B] p-2.5 rounded-sm">
            <div className="text-[11px] font-mono text-[#71717A] flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-[#10B981]" />
              30D INFLOW
            </div>
            <div className="font-mono text-lg font-bold text-[#F3F4F6] mt-1">
              ${inflow30dUsd.toLocaleString()}
            </div>
            <div className="font-mono text-[11px] text-[#A1A1AA]">
              Recorded Inflows
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
