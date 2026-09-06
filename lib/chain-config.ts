import { createConfig, http } from 'wagmi';
import { bsc, mainnet, base } from 'viem/chains';
import { ChainOption } from './types';

// BNB Chain (56) listed first as required by hackathon specification
export const wagmiConfig = createConfig({
  chains: [bsc, mainnet, base],
  transports: {
    [bsc.id]: http('https://bsc-dataseed.binance.org'),
    [mainnet.id]: http('https://cloudflare-eth.com'),
    [base.id]: http('https://mainnet.base.org'),
  },
});

export const SUPPORTED_CHAINS: ChainOption[] = [
  {
    id: '56',
    name: 'BNB Chain',
    symbol: 'BNB',
    logo: '⚡',
    isEVM: true,
    explorerUrl: 'https://bscscan.com',
  },
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: '⟠',
    isEVM: true,
    explorerUrl: 'https://etherscan.io',
  },
  {
    id: '8453',
    name: 'Base',
    symbol: 'ETH',
    logo: '🔵',
    isEVM: true,
    explorerUrl: 'https://basescan.org',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    logo: '◎',
    isEVM: false,
    explorerUrl: 'https://solscan.io',
  },
];

// Pre-loaded real active BNB Chain wallet for instant 3-second demo mode
export const DEMO_WALLET = {
  address: '0xc4589D0DC9D8E4Daa0026f956Cb1E01Ba9f52d34',
  chainId: '1' as const,
};
