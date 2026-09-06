'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TerminalHeader from '@/components/TerminalHeader';
import WalletInput from '@/components/WalletInput';
import RunwayHero from '@/components/RunwayHero';
import BurnChart from '@/components/BurnChart';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import TransactionList from '@/components/TransactionList';
import { ChainId, TreasuryMetrics } from '@/lib/types';
import { DEMO_WALLET } from '@/lib/chain-config';

export default function Home() {
  const [address, setAddress] = useState<string>(DEMO_WALLET.address);
  const [selectedChain, setSelectedChain] = useState<ChainId>(DEMO_WALLET.chainId);
  const [metrics, setMetrics] = useState<TreasuryMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const analyzeWallet = useCallback(async (targetAddr?: string, targetChain?: ChainId) => {
    const queryAddr = (targetAddr !== undefined ? targetAddr : address).trim();
    const queryChain = targetChain !== undefined ? targetChain : selectedChain;

    if (!queryAddr) {
      setError("That doesn't look like a wallet address");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch(
        `/api/treasury?address=${encodeURIComponent(queryAddr)}&chainId=${encodeURIComponent(queryChain)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Data provider is rate-limited, try again shortly');
        setMetrics(null);
      } else {
        if (data.error && !data.hasActivity) {
          // Empty activity state handled cleanly
          setError(data.error);
        }
        setMetrics(data);
      }
    } catch (err: unknown) {
      console.error('Fetch error:', err);
      setError('Data provider is rate-limited, try again shortly');
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, [address, selectedChain]);

  // Pre-load live example on initial mount (3 second SLA requirement)
  useEffect(() => {
    analyzeWallet(DEMO_WALLET.address, DEMO_WALLET.chainId);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#F3F4F6] flex flex-col justify-between selection:bg-[#D9A441]/30">
      <div className="w-full">
        {/* Top Bloomberg Terminal Header */}
        <TerminalHeader />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-4">
          {/* Wallet Address Input & Chain Switcher */}
          <WalletInput
            address={address}
            setAddress={setAddress}
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
            onAnalyze={(overrideAddr, overrideChain) => analyzeWallet(overrideAddr, overrideChain)}
            loading={loading}
            error={error}
          />

          {/* Hero Runway Metric & Financial Grid */}
          <RunwayHero metrics={metrics} loading={loading} />

          {/* Chart & Outflow Category Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7">
              <BurnChart data={metrics?.chartData || []} loading={loading} />
            </div>
            <div className="lg:col-span-5">
              <CategoryBreakdown
                categories={metrics?.categoryBreakdown || []}
                loading={loading}
              />
            </div>
          </div>

          {/* Dense Transaction Audit Trail */}
          <TransactionList
            transactions={metrics?.transactions || []}
            chainId={metrics?.chainId || selectedChain}
            loading={loading}
          />
        </div>
      </div>

      {/* Terminal Footer */}
      <footer className="border-t border-[#26262A] bg-[#0D0D0E] py-3 px-4 text-center font-mono text-[11px] text-[#71717A] mt-6">
        RUNWAY TREASURY AGENT v2.4 // HACKATHON BUILD // EVM (BNB CHAIN, ETH, BASE) & SOLANA
      </footer>
    </main>
  );
}
