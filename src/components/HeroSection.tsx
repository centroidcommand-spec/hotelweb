import React from 'react';
import { BookingType } from '../types/restaurant';
import { RESTAURANT_HERO_IMAGE } from '../data/menuData';

interface Props {
  bookingType: BookingType;
  onChangeBookingType: (type: BookingType) => void;
  onOpenReservations: () => void;
  onScrollToMenu: () => void;
}

export const HeroSection: React.FC<Props> = ({
  bookingType,
  onChangeBookingType,
  onOpenReservations,
  onScrollToMenu
}) => {
  return (
    <section className="relative bg-stone-950 text-stone-100 overflow-hidden font-sans-body">
      {/* Background Hero Image with measured scrim and LCP optimization */}
      <div className="absolute inset-0">
        <img
          src={RESTAURANT_HERO_IMAGE}
          alt="Shankar Restaurant Grand Royal Dining Interior"
          fetchPriority="high"
          decoding="async"
          width="1376"
          height="768"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-6 sm:pt-8 sm:pb-9">
        <div className="max-w-2xl space-y-2 sm:space-y-2.5">
          {/* Compact editorial kicker */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-amber-400 font-semibold">
            <span>Since 1974</span>
            <span aria-hidden="true">·</span>
            <span>Connaught Place, New Delhi</span>
          </div>

          {/* Clean concise title */}
          <h1 className="text-2xl sm:text-4xl font-serif-display font-bold text-white tracking-tight leading-tight">
            Shankar Restaurant
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
            Royal Awadhi dum biryanis, clay-tandoor smoked kebabs, and slow-simmered handi curries crafted fresh to order.
          </p>

          {/* Compact ordering selector & action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* Segmented Selector */}
            <div className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex p-1 rounded-xl bg-stone-900/90 border border-stone-800 shadow-xs">
              <button
                type="button"
                onClick={() => onChangeBookingType('delivery')}
                className={`py-1.5 px-3 text-center text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[34px] flex items-center justify-center ${
                  bookingType === 'delivery'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => onChangeBookingType('dine_in')}
                className={`py-1.5 px-3 text-center text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[34px] flex items-center justify-center ${
                  bookingType === 'dine_in'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Dine-In
              </button>
              <button
                type="button"
                onClick={() => onChangeBookingType('takeaway')}
                className={`py-1.5 px-3 text-center text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[34px] flex items-center justify-center ${
                  bookingType === 'takeaway'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Takeaway
              </button>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onScrollToMenu}
                className="px-4 py-2 text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center min-h-[38px]"
              >
                Order Food
              </button>

              <button
                type="button"
                onClick={onOpenReservations}
                className="px-3.5 py-2 text-xs sm:text-sm font-medium bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center min-h-[38px]"
              >
                Book Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
