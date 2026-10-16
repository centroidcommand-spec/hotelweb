import React from 'react';
import { ShieldCheck, Flame, Award, HeartHandshake } from 'lucide-react';
import butterChickenImg from '../assets/images/dish_butter_chicken_curry_1792103747214.webp';

interface Props {
  onOpenReservations: () => void;
}

export const HeritageStorySection: React.FC<Props> = ({
  onOpenReservations
}) => {
  return (
    <section id="heritage" className="py-8 sm:py-12 bg-stone-900 text-stone-100 overflow-hidden font-sans-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Visual Showcase */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden border border-stone-800 shadow-xl aspect-16/10 bg-stone-950">
              <img
                src={butterChickenImg}
                alt="Shankar Restaurant Handcrafted Copper Handi Murgh Makhani"
                loading="lazy"
                decoding="async"
                width="800"
                height="500"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-stone-100">
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400 block">
                  Heritage Copper Handi
                </span>
                <p className="font-serif-display text-sm sm:text-base font-semibold">
                  Slow-Simmered Murgh Makhani over Charcoal Embers
                </p>
              </div>
            </div>

            {/* Adjacent Trust Badge */}
            <div className="mt-2.5 p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-300 text-[11px]">
                Dispatched piping hot from our clay tandoor oven
              </span>
              <span className="text-amber-400 font-medium text-[11px]">Connaught Place</span>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-semibold">
              <span>Our Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Connaught Place, New Delhi</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif-display font-bold text-white tracking-tight">
              Royal Charcoal Smoldering & Pure Discipline
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Founded over 50 years ago in Connaught Place, Shankar Restaurant honors royal Indian recipes. Every dish is cooked fresh to order with hand-ground spices and pure desi ghee—never reheated, never rushed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Stone-Ground Spices</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                    Whole dry-roasted spices hand-ground daily for pure aroma.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Desi Ghee</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                    Slow-simmered handi curries and live clay tandoor breads.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenReservations}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                Reserve Dining Table
              </button>
            </div>
          </div>
        </div>

        {/* Compact Quantified Stats Strip */}
        <div className="mt-8 pt-5 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-2 rounded-lg bg-stone-950/40">
            <div className="text-xl sm:text-2xl font-serif-display font-bold text-amber-400 tabular-nums">
              50+ Years
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Culinary Legacy</p>
          </div>
          <div className="p-2 rounded-lg bg-stone-950/40">
            <div className="text-xl sm:text-2xl font-serif-display font-bold text-amber-400 tabular-nums">
              100%
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Pure Desi Makhan & Ghee</p>
          </div>
          <div className="p-2 rounded-lg bg-stone-950/40">
            <div className="text-xl sm:text-2xl font-serif-display font-bold text-amber-400 tabular-nums">
              40+
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">Royal Recipes</p>
          </div>
          <div className="p-2 rounded-lg bg-stone-950/40">
            <div className="text-xl sm:text-2xl font-serif-display font-bold text-amber-400 tabular-nums">
              4.9 ★
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">2,400+ Guest Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
};
