import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faRss, faPodcast } from '@fortawesome/free-solid-svg-icons';
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
                href="https://github.com/wiseinnovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a
                href="https://x.com/wiserinnovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCg-rES2l7ssC2Csbo4zPfpA"
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
                href="https://www.linkedin.com/company/instituteofwiseinnovation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
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
                <h4 className="text-white font-semibold mb-4">Seed Foundry</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/library/entity-types"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Entity Types
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/library/funding-options"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Funding Options
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/library/business-models"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      Business Models
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/wiseinnovation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Case Studies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Philosophy</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://wiseinnovation.podbean.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faPodcast} /> Podbean
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCg-rES2l7ssC2Csbo4zPfpA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faYoutube} /> YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/wiserinnovation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faXTwitter} /> X (Twitter)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/instituteofwiseinnovation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="https://www.collaborative.tech/images/cta-logo.png"
                  alt="Collaborative Technology Alliance"
                  width={20}
                  height={20}
                />
                <small className="text-white/40 text-sm">
                  Incubated at{' '}
                  <a
                    href="https://www.collaborative.tech/"
                    className="text-[#ff00ff] hover:text-[#ff40ff] transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Collaborative Technology Alliance
                  </a>
                </small>
              </div>
              <div className="flex items-center gap-6">
                <Image
                  src="/seed_logo copy.png"
                  alt="Institute of Wise Innovation"
                  width={24}
                  height={24}
                  className="opacity-50"
                />
                <span className="text-white/40 text-sm">
                  © 2025 Institute of Wise Innovation. All rights reserved.
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}