import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faOpenCollective,
  faPodcast,
  faSubstack,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

config.autoAddCss = false;

import GoalsProvider from './GoalsProvider';
import HeaderScroll from './HeaderScroll';

export const metadata: Metadata = {
  title: 'The Institute of Wise Innovation | SEED Foundry',
  description: 'How do you want to plant and grow your ethical tech business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="top-fade"></div>
        <header className="header-container">
          <div className="max-w-7xl mx-auto pl-[35px] pr-4 sm:pr-6 lg:pr-8 py-1 relative flex justify-between items-start">
            <Link href="/" className="flex flex-col">
              <h2 className="text-[1.89rem] font-bold text-white mb-0 leading-tight">
                The Institute of Wise Innovation
              </h2>
              <h3 className="text-[1.69rem] font-bold text-gradient leading-tight">SEED FOUNDRY</h3>
            </Link>
            <div className="flex flex-col items-end">
              <Image
                src="/seed_logo copy.png"
                alt="Institute of Wise Innovation Logo"
                width={36}
                height={36}
                className="transition-transform duration-300 hover:scale-110 mt-1"
                priority
              />
              <span className="text-white text-xs mt-1">Peer</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/30 via-transparent to-white/30 transform transition-opacity duration-300 header-divider"></div>
          </div>
        </header>
        <div className="relative pt-20 flex-grow">
          <GoalsProvider>{children}</GoalsProvider>
        </div>
        <HeaderScroll />
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-center space-x-8">
              <a
                href="https://wiseinnovation.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faSubstack} size="lg" />
              </a>
              <a
                href="https://opencollective.com/wise-innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faOpenCollective} size="lg" />
              </a>
              <a
                href="https://github.com/wise-innovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a
                href="https://twitter.com/wiseinnovation_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>
              <a
                href="https://www.youtube.com/@wiseinnovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
              <a
                href="https://wiseinnovation.podbean.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faPodcast} size="lg" />
              </a>
              <a
                href="/rss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faRss} size="lg" />
              </a>
            </div>
          </div>
        </div>
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/library/entity-types" className="text-white/60 hover:text-white transition-colors">Entity Types</Link></li>
                  <li><Link href="/library/funding-options" className="text-white/60 hover:text-white transition-colors">Funding Options</Link></li>
                  <li><Link href="/library/business-models" className="text-white/60 hover:text-white transition-colors">Business Models</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Guides</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Case Studies</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <Image
                  src="/seed_logo copy.png"
                  alt="Institute of Wise Innovation"
                  width={24}
                  height={24}
                  className="opacity-50"
                />
                <span className="text-white/40 text-sm">© 2025 Institute of Wise Innovation. All rights reserved.</span>
              </div>
              <div className="flex items-center">
                <small className="text-white/40 text-sm">
                  Incubated at{' '}
                  <a
                    href="https://www.collaborative.tech/"
                    className="text-white/40 hover:text-white transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Collaborative Technology Alliance
                  </a>
                </small>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}