import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Minus,
  Star,
  Clock,
  Check,
  Search,
  Sparkles,
  Utensils,
  Wine,
  Coffee,
  LayoutGrid,
  List
} from 'lucide-react';
import {
  MENU_ITEMS,
  ALL_DAY_CATEGORIES,
  LUNCH_CATEGORIES,
  BAR_CATEGORIES
} from '../data/menuData';
import { MenuItem, MenuSectionType, SpiceLevel, CartItem } from '../types/restaurant';

interface Props {
  activeMenuSection: MenuSectionType;
  onChangeMenuSection: (section: MenuSectionType) => void;
  onAddToCart: (item: MenuItem, portion: 'full' | 'half', spiceLevel: SpiceLevel) => void;
  onOpenItemModal: (item: MenuItem) => void;
  cartItems?: CartItem[];
  onUpdateQuantity?: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem?: (cartItemId: string) => void;
}

export const MenuSection: React.FC<Props> = ({
  activeMenuSection,
  onChangeMenuSection,
  onAddToCart,
  onOpenItemModal,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'bestseller' | 'chef_special'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileLayoutMode, setMobileLayoutMode] = useState<'grid' | 'compact'>('grid');
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});

  // Reset category filter when sub-menu changes
  useEffect(() => {
    setSelectedCategory('all');
  }, [activeMenuSection]);

  const currentCategories =
    activeMenuSection === 'lunch'
      ? LUNCH_CATEGORIES
      : activeMenuSection === 'bar'
      ? BAR_CATEGORIES
      : ALL_DAY_CATEGORIES;

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSection = item.menuSection === activeMenuSection;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'veg' && (item.dietary === 'veg' || item.dietary === 'vegan')) ||
      (dietaryFilter === 'non-veg' && item.dietary === 'non-veg') ||
      (dietaryFilter === 'bestseller' && !!item.isBestseller) ||
      (dietaryFilter === 'chef_special' && !!item.isChefSpecial);

    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hindiName && item.hindiName.includes(searchQuery));

    return matchesSection && matchesCategory && matchesDietary && matchesSearch;
  });

  // High-performance O(1) cart quantity lookup map
  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, { quantity: number; cartItemId: string | null }>();
    for (const c of cartItems) {
      const existing = map.get(c.menuItem.id);
      if (existing) {
        existing.quantity += c.quantity;
      } else {
        map.set(c.menuItem.id, { quantity: c.quantity, cartItemId: c.cartItemId });
      }
    }
    return map;
  }, [cartItems]);

  const getItemCartQuantity = (menuItemId: string): { quantity: number; cartItemId: string | null } => {
    return cartQuantityMap.get(menuItemId) || { quantity: 0, cartItemId: null };
  };

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, 'full', item.spiceLevel);

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleIncrement = (item: MenuItem, cartItemId: string | null, currentQty: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemId && onUpdateQuantity) {
      onUpdateQuantity(cartItemId, currentQty + 1);
    } else {
      handleQuickAdd(item, e);
    }
  };

  const handleDecrement = (item: MenuItem, cartItemId: string | null, currentQty: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemId && onUpdateQuantity) {
      onUpdateQuantity(cartItemId, currentQty - 1);
    }
  };

  return (
    <section id="menu" className="pt-2 sm:pt-4 pb-10 sm:pb-16 max-w-7xl mx-auto px-3 sm:px-6 scroll-mt-16 font-sans-body">
      {/* Compact Top Header & Sub-Menu Switcher */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-baseline gap-1.5">
          <h2 className="text-lg sm:text-2xl font-serif-display font-bold text-stone-900">
            Our Menu
          </h2>
          <span className="text-[10px] sm:text-xs text-stone-500 font-mono">
            ({filteredItems.length})
          </span>
        </div>

        {/* Compact 3-tab sub menu switcher */}
        <div className="inline-flex p-0.5 bg-stone-200/90 rounded-xl border border-stone-300/70 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onChangeMenuSection('all_day')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[30px] ${
              activeMenuSection === 'all_day'
                ? 'bg-amber-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            All Day
          </button>
          <button
            type="button"
            onClick={() => onChangeMenuSection('lunch')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[30px] ${
              activeMenuSection === 'lunch'
                ? 'bg-amber-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Lunch
          </button>
          <button
            type="button"
            onClick={() => onChangeMenuSection('bar')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[30px] ${
              activeMenuSection === 'bar'
                ? 'bg-amber-900 text-white font-bold shadow-xs'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      {/* Sticky Compact Controls: Search, View Toggle, Dietary & Categories Scroller */}
      <div className="sticky top-[48px] sm:top-[52px] z-30 bg-[#faf8f5]/95 backdrop-blur-md pt-1 pb-1.5 mb-2.5 border-b border-stone-200/90 space-y-1.5">
        {/* Row 1: Search & Dietary Quick Filters & Layout Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 shadow-xs h-8"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold p-1 cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Dietary Filters (Compact Icons/Chips) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 h-8 ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-400'
              }`}
              title="Filter Pure Veg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === 'non-veg' ? 'all' : 'non-veg')}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 h-8 ${
                dietaryFilter === 'non-veg'
                  ? 'bg-rose-700 text-white font-bold shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-rose-400'
              }`}
              title="Filter Non-Veg"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>Non-Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietaryFilter(dietaryFilter === 'bestseller' ? 'all' : 'bestseller')}
              className={`px-2 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 h-8 ${
                dietaryFilter === 'bestseller'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400'
              }`}
              title="Bestsellers"
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          </div>

          {/* View Toggle (Grid / List) */}
          <div className="flex items-center p-0.5 bg-stone-200/90 rounded-lg shrink-0 h-8">
            <button
              type="button"
              onClick={() => setMobileLayoutMode('grid')}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                mobileLayoutMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileLayoutMode('compact')}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                mobileLayoutMode === 'compact' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Row 2: Compact Category Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar scroll-smooth overscroll-x-contain">
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 min-h-[30px] flex items-center justify-center ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Compact List of Dishes */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3 mt-4">
          <p className="text-sm font-semibold text-stone-800">No culinary dishes matched your criteria.</p>
          <p className="text-xs text-stone-500">
            Try switching to another category or clearing your search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setDietaryFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-xl hover:bg-stone-800 cursor-pointer min-h-[40px]"
          >
            Reset Filters
          </button>
        </div>
      ) : mobileLayoutMode === 'compact' ? (
        /* Mobile Compact List View */
        <div className="mt-3 space-y-2.5 sm:hidden">
          {filteredItems.map((item) => {
            const { quantity: cartQty, cartItemId } = getItemCartQuantity(item.id);
            const isJustAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onOpenItemModal(item)}
                className="bg-white rounded-xl border border-stone-200/90 p-2.5 flex items-center justify-between gap-2.5 active:bg-stone-50 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      width="64"
                      height="64"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute bottom-1 left-1 w-2 h-2 rounded-full border border-white ${
                        item.dietary === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs font-bold text-stone-900 truncate">
                        {item.name}
                      </h3>
                      {item.isBestseller && (
                        <span className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1 rounded">
                          ★
                        </span>
                      )}
                    </div>

                    {item.hindiName && (
                      <span className="text-[10px] text-stone-400 block -mt-0.5 truncate">
                        {item.hindiName}
                      </span>
                    )}

                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                        ₹{item.price}
                      </span>
                      {item.halfPrice && (
                        <span className="text-[9px] text-stone-500 font-mono">
                          / Half ₹{item.halfPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action: Quantity Stepper or Add button with ergonomic touch targets */}
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {cartQty > 0 ? (
                    <div className="flex items-center bg-stone-900 text-white rounded-lg shadow-xs overflow-hidden">
                      <button
                        type="button"
                        onClick={(e) => handleDecrement(item, cartItemId, cartQty, e)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-800 active:scale-95 text-amber-300 font-bold min-w-[32px] min-h-[32px]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold tabular-nums">
                        {cartQty}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleIncrement(item, cartItemId, cartQty, e)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-stone-800 active:scale-95 text-amber-300 font-bold min-w-[32px] min-h-[32px]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(item, e)}
                      className={`h-8 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer min-h-[32px] ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-900 hover:bg-amber-800 text-white shadow-xs'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Multi-Box 2-Column Responsive Grid on Mobile, 3 on Tablet, 4 on Desktop */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 mt-3 sm:mt-5">
          {filteredItems.map((item) => {
            const { quantity: cartQty, cartItemId } = getItemCartQuantity(item.id);
            const isJustAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onOpenItemModal(item)}
                className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-lg transition-all shadow-xs cursor-pointer"
              >
                {/* Thumbnail Image Container with fixed aspect ratio to prevent CLS */}
                <div className="relative aspect-[16/11] sm:aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="275"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {/* Dietary badge in top corner */}
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-semibold flex items-center gap-1 shadow-xs">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.dietary === 'veg'
                          ? 'bg-emerald-500'
                          : item.dietary === 'vegan'
                          ? 'bg-teal-500'
                          : 'bg-rose-500'
                      }`}
                    />
                    <span className="capitalize text-stone-800 text-[9px]">
                      {item.dietary === 'non-veg' ? 'Non-Veg' : item.dietary}
                    </span>
                  </div>

                  {/* Rating / Badges */}
                  <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                    {item.isBestseller && (
                      <span className="bg-amber-400 text-stone-950 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase shadow-xs">
                        Bestseller
                      </span>
                    )}
                  </div>

                  {/* Hindi Title & Rating Overlay */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[10px]">
                    <span className="text-stone-200 truncate font-medium text-[10px]">
                      {item.hindiName || ''}
                    </span>
                    <div className="flex items-center gap-0.5 bg-stone-900/80 px-1 py-0.5 rounded shrink-0">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[9px]">{item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5 hidden sm:block">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Price & ADD Button / Stepper */}
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100 gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-mono font-bold text-stone-950 tabular-nums">
                        ₹{item.price}
                      </span>
                      {item.halfPrice && (
                        <span className="text-[9px] text-stone-400 font-mono">
                          Half ₹{item.halfPrice}
                        </span>
                      )}
                    </div>

                    {cartQty > 0 ? (
                      <div className="flex items-center bg-stone-900 text-white rounded-lg shadow-xs overflow-hidden shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleDecrement(item, cartItemId, cartQty, e)}
                          className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center hover:bg-stone-800 active:scale-95 text-amber-300 font-bold min-w-[28px] min-h-[28px]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 sm:w-6 text-center text-xs font-mono font-bold tabular-nums">
                          {cartQty}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleIncrement(item, cartItemId, cartQty, e)}
                          className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center hover:bg-stone-800 active:scale-95 text-amber-300 font-bold min-w-[28px] min-h-[28px]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer shrink-0 min-h-[28px] ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-900 hover:bg-amber-800 text-white shadow-xs'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>ADD</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
