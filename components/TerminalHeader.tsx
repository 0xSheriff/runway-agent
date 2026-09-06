'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, ShieldCheck, RefreshCw } from 'lucide-react';

export default function TerminalHeader() {
  const [timeStr, setTimeStr] = useState<string>('');
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleWalletClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      const injected = connectors.find((c) => c.id === 'injected') || connectors[0];
      if (injected) {
        connect({ connector: injected });
      }
    }
  };

  return (
    <header className="w-full border-b border-[#26262A] bg-[#0D0D0E] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-mono font-bold tracking-wider text-[#D9A441]">
          <span className="inline-block h-2 w-2 bg-[#D9A441] rounded-none"></span>
          RUNWAY // TREASURY TERMINAL
        </div>
        <span className="text-[#52525B]">|</span>
        <div className="hidden sm:flex items-center gap-2 text-[#A1A1AA] font-mono text-[11px]">
          <span className="text-[#10B981] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping"></span>
            LIVE
          </span>
          <span>BNB (56) • ETH (1) • BASE • SOL</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block font-mono text-[#71717A] text-[11px]">
          {timeStr || '2026-09-06 02:00:00 UTC'}
        </div>

        <button
          onClick={handleWalletClick}
          className="flex items-center gap-1.5 border border-[#26262A] bg-[#141416] px-2.5 py-1 text-xs font-mono text-[#D9A441] hover:border-[#D9A441] hover:bg-[#1A1A1E] transition-all rounded-sm"
        >
          <Wallet className="h-3.5 w-3.5" />
          {isConnected && address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : 'CONNECT WALLET'}
        </button>
      </div>
    </header>
  );
}
