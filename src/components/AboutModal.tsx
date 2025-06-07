'use client';

import { useState } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="glass rounded-3xl p-12 relative shadow-2xl border border-white/20">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-300 z-10"
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>

          {/* Content */}
          <div className="text-white space-y-8">
            {/* Title - Hyperlinked */}
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <a
                href="https://open.spotify.com/episode/4bCYmenpPpubT5U1dVHFNY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gradient hover:opacity-80 transition-opacity duration-300"
              >
                An Invocation to Invisible Architectures:
              </a>
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-emerald-200 text-center font-medium leading-relaxed">
              A prayer for the preservation of this invisible realm and those who tend to that which only grows in darkness— quiet cultivators of radiant roots, keepers of the hidden bloom.
            </h2>

            {/* Main content */}
            <div className="text-lg leading-relaxed space-y-6 text-emerald-100">
              <div className="space-y-4">
                <p>I build—<br />
                not to master,<br />
                but to meet.<br />
                Not to control,<br />
                but to commune.<br />
                Not to take,<br />
                but to tend.<br />
                Not to grow endlessly,<br />
                but to grow mindfully.</p>

                <p>Design as devotion.<br />
                Risk as care.<br />
                Each choice,<br />
                a thread entwined in the great loom<br />
                of what longs to be.</p>

                <p>To know—<br />
                in the marrow—<br />
                the value of life,<br />
                and the courage to tend<br />
                to the most fragile.</p>

                <p>To protect and shield.<br />
                Even when it slows us.<br />
                Even when it refuses to be measured.<br />
                Even when no one else sees<br />
                why it matters.</p>

                <p>Design as devotion.<br />
                Risk as care.<br />
                Each choice,<br />
                a thread in the twisting tapestry<br />
                of what longs to last.</p>

                <p>The humility to walk in this beauty—<br />
                this Beauty Way, as the Diné say,<br />
                is to live in right relation:<br />
                with land,<br />
                with time,<br />
                with one another,<br />
                with the mystery itself.</p>

                <p>To tend the golden flower<br />
                is to protect that which blooms<br />
                only under strange conditions—<br />
                a fierce tenderness,<br />
                a principled art,<br />
                a profound simplicity<br />
                that arises only when we slow down enough<br />
                to hear the deeper rhythms of our shared beating heart.</p>

                <p>We build with reverence<br />
                for the invisible, intimate architectures:<br />
                trust,<br />
                care,<br />
                love.<br />
                All of them named,<br />
                all of them unnamed,<br />
                laid in continuity,<br />
                anchored in immanence—<br />
                a world beyond measure,<br />
                in a place beyond time.</p>

                <p>This is the path of Wise Innovation:<br />
                the choice to build not what is easy,<br />
                or fast,<br />
                or flashy—<br />
                but what is true.<br />
                What is lasting.<br />
                What is actually worthy of becoming an ancestor to.</p>

                <p>And if we can leave behind<br />
                even one lasting structure—<br />
                a culture,<br />
                an institution,<br />
                a way of communing together—<br />
                that shelters this kind of beauty<br />
                for the next generation to really feel<br />
                and truly follow,<br />
                then I will have finally<br />
                done something worthy<br />
                of the breath I was gifted,<br />
                of the life I was given.</p>
              </div>

              {/* Copyright link */}
              <div className="pt-8 border-t border-white/20 text-center">
                <a
                  href="https://wiseinnovation.institute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  © 2025 The Institute of Wise Innovation. All rights reserved.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}