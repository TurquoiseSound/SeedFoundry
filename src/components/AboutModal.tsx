'use client';

import React, { useState } from 'react';

export default function AboutModal() {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowAboutModal(true)}
        className="text-white/60 hover:text-white transition-colors"
      >
        About
      </button>

      {showAboutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 max-w-3xl max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>

            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">
                <a
                  href="https://open.spotify.com/episode/4bCYmenpPpubT5U1dVHFNY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gradient hover:opacity-80 transition-opacity"
                >
                  An Invocation to Invisible Architectures:
                </a>
              </h2>

              {/* Spotify Embed - Smaller and Centered */}
              {/* Spotify Embed - Compact Player */}
              <div className="mb-6 flex justify-center">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/episode/4bCYmenpPpubT5U1dVHFNY?utm_source=generator&theme=0"
                  width="100%"
                  height="142"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>

              <h3 className="text-lg text-white/80 mb-8 italic text-center leading-relaxed max-w-2xl mx-auto">
                A prayer for the preservation of this invisible realm and those who tend to that
                which only grows in darkness— quiet cultivators of radiant roots, keepers of the
                hidden bloom.
              </h3>

              <div className="text-white/90 leading-relaxed space-y-6 max-w-2xl mx-auto">
                <p className="text-center">
                  I build—
                  <br />
                  not to master,
                  <br />
                  but to meet.
                  <br />
                  Not to control,
                  <br />
                  but to commune.
                  <br />
                  Not to take,
                  <br />
                  but to tend.
                  <br />
                  Not to grow endlessly,
                  <br />
                  but to grow mindfully.
                </p>

                <p className="text-center">
                  Design as devotion.
                  <br />
                  Risk as care.
                  <br />
                  Each choice,
                  <br />a thread entwined in the great loom
                  <br />
                  of what longs to be.
                </p>

                <p className="text-center">
                  To know—
                  <br />
                  in the marrow—
                  <br />
                  the value of life,
                  <br />
                  and the courage to tend
                  <br />
                  to the most fragile.
                </p>

                <p className="text-center">
                  To protect and shield.
                  <br />
                  Even when it slows us.
                  <br />
                  Even when it refuses to be measured.
                  <br />
                  Even when no one else sees
                  <br />
                  why it matters.
                </p>

                <p className="text-center">
                  Design as devotion.
                  <br />
                  Risk as care.
                  <br />
                  Each choice,
                  <br />a thread in the twisting tapestry
                  <br />
                  of what longs to last.
                </p>

                <p className="text-center">
                  The humility to walk in this beauty—
                  <br />
                  this Beauty Way, as the Diné say,
                  <br />
                  is to live in right relation:
                  <br />
                  with land,
                  <br />
                  with time,
                  <br />
                  with one another,
                  <br />
                  with the mystery itself.
                </p>

                <p className="text-center">
                  To tend the golden flower
                  <br />
                  is to protect that which blooms
                  <br />
                  only under strange conditions—
                  <br />a fierce tenderness,
                  <br />a principled art,
                  <br />a profound simplicity
                  <br />
                  that arises only when we slow down enough
                  <br />
                  to hear the deeper rhythms of our shared beating heart.
                </p>

                <p className="text-center">
                  We build with reverence
                  <br />
                  for the invisible, intimate architectures:
                  <br />
                  trust,
                  <br />
                  care,
                  <br />
                  love.
                  <br />
                  All of them named,
                  <br />
                  all of them unnamed,
                  <br />
                  laid in continuity,
                  <br />
                  anchored in immanence—
                  <br />a world beyond measure,
                  <br />
                  in a place beyond time.
                </p>

                <p className="text-center">
                  This is the path of Wise Innovation:
                  <br />
                  the choice to build not what is easy,
                  <br />
                  or fast,
                  <br />
                  or flashy—
                  <br />
                  but what is true.
                  <br />
                  What is lasting.
                  <br />
                  What is actually worthy of becoming an ancestor to.
                </p>

                <p className="text-center">
                  And if we can leave behind
                  <br />
                  even one lasting structure—
                  <br />a culture,
                  <br />
                  an institution,
                  <br />a way of communing together—
                  <br />
                  that shelters this kind of beauty
                  <br />
                  for the next generation to really feel
                  <br />
                  and truly follow,
                  <br />
                  then I will have finally
                  <br />
                  done something worthy
                  <br />
                  of the breath I was gifted,
                  <br />
                  of the life I was given.
                </p>

                <p className="mt-8 text-center">
                  <a
                    href="https://wiseinnovation.institute"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    © 2025 The Institute of Wise Innovation. All rights reserved.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
