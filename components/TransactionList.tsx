'use client';

import React from 'react';
import { Transaction, ChainId } from '@/lib/types';
import { SUPPORTED_CHAINS } from '@/lib/chain-config';
import { ListFilter, ExternalLink, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  chainId: ChainId;
  loading: boolean;
}

export default function TransactionList({ transactions, chainId, loading }: TransactionListProps) {
  const chainObj = SUPPORTED_CHAINS.find((c) => c.id === chainId) || SUPPORTED_CHAINS[0];

  if (loading) {
    return (
      <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
        <div className="h-4 w-48 bg-[#26262A] rounded-none mb-3 animate-skeleton"></div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-full bg-[#26262A] rounded-none animate-skeleton"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-[#26262A] bg-[#121214] p-4 rounded-sm">
      <div className="flex items-center justify-between border-b border-[#1E1E22] pb-2 mb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#71717A]">
          <ListFilter className="h-3.5 w-3.5 text-[#D9A441]" />
          RECENT TREASURY AUDIT AUDIT TRAIL ({transactions.length})
        </div>
        <span className="font-mono text-[11px] text-[#A1A1AA]">{chainObj.name}</span>
      </div>

      {transactions.length === 0 ? (
        <div className="p-6 text-center font-mono text-xs text-[#71717A]">
          This wallet has no activity to analyze
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#26262A] text-[#71717A] text-[11px]">
                <th className="py-2 px-2 font-semibold">TYPE</th>
                <th className="py-2 px-2 font-semibold">LABEL / DESCRIPTION</th>
                <th className="py-2 px-2 font-semibold">CATEGORY</th>
                <th className="py-2 px-2 font-semibold text-right">AMOUNT</th>
                <th className="py-2 px-2 font-semibold text-right">TX HASH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1E]">
              {transactions.slice(0, 15).map((tx) => {
                const isOutflow = tx.type === 'outflow';
                const txUrl = `${chainObj.explorerUrl}/tx/${tx.hash}`;

                return (
                  <tr key={tx.hash} className="hover:bg-[#18181B] transition-colors">
                    <td className="py-2 px-2 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 font-bold ${
                          isOutflow ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {isOutflow ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownLeft className="h-3 w-3" />
                        )}
                        {isOutflow ? 'OUTFLOW' : 'INFLOW'}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-[#F3F4F6] font-medium">{tx.label}</td>
                    <td className="py-2 px-2">
                      <span className="bg-[#1A1A1E] border border-[#26262A] text-[#A1A1AA] text-[10px] px-1.5 py-0.5 rounded-sm">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right whitespace-nowrap">
                      <span className={isOutflow ? 'text-[#F3F4F6]' : 'text-[#10B981]'}>
                        {isOutflow ? '-' : '+'}
                        {tx.amount.toFixed(4)} {chainObj.symbol}
                      </span>
                      <div className="text-[10px] text-[#71717A]">
                        (${tx.valueUsd.toLocaleString()})
                      </div>
                    </td>
                    <td className="py-2 px-2 text-right whitespace-nowrap">
                      <a
                        href={txUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#D9A441] hover:underline"
                      >
                        <span>{tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
