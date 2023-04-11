import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { claimGrass } from '../../../actions/user';
import { useCanSeeXur } from '../../../hooks/bounty';
import { useT } from '../../../hooks/translations';
import { useUserXurBountyClaimable } from '../../../hooks/user';
import { ITEMS, ITEM_IMAGES } from '../../../utils/collections';
import CategoryTitle from '../CategoryTitle';
import Tooltipable from '../Tooltipable';

export default function EternityXur() {
  const dispatch = useDispatch();
  const t = useT();

  const claimable = useCanSeeXur();
  const completed = useUserXurBountyClaimable();

  const [animationClick, setAnimationClick] = useState(false);

  const handleClick = () => {
    setAnimationClick(true);
  };

  const handleAnimationEnd = () => {
    dispatch(claimGrass());
    setAnimationClick(false);
  };

  if (!claimable) {
    return null;
  }

  return (
    <section>
      <CategoryTitle title={t('eternity.xur')} />
      <div className="flex flex-col gap-y-0.5 md:gap-y-1.5 mt-4 text-sm md:text-lg text-white tracking-wide">
        <div>
          {t('eternity.xur.message.1')}
        </div>
        <div>
          {t('eternity.xur.message.2')}
        </div>
        <div>
          {t('eternity.xur.message.3')}
        </div>
        <div className="italic">
          {t('eternity.xur.message.4')}
        </div>
        <div>
          {t('eternity.xur.message.5')}
        </div>
        <div className="italic">
          {t('eternity.xur.message.6')}
        </div>
      </div>
      <div className="-ml-1 mt-4 md:mt-8">
        <Tooltipable>
          {(onMouseEnter, onMouseLeave) => (
            <button
              type="button"
              disabled={completed || !claimable}
              onClick={handleClick}
              className={`p-0.5 border-2 border-transparent disabled:hover:border-white/30 ${animationClick ? 'hover:border-transparent' : 'hover:border-white/70'} transition-colors duration-300 disabled:cursor-not-allowed`}
              onAnimationEnd={handleAnimationEnd}
              onMouseOver={() => onMouseEnter(t(ITEMS.xurGrassItem), t('items.description'))}
              onMouseOut={() => onMouseLeave()}
              onFocus={() => onMouseEnter(t(ITEMS.xurGrassItem), t('items.description'))}
              onBlur={() => onMouseLeave()}
            >
              <div className={`relative overflow-hidden ${animationClick && 'animate-bounty'} ${completed ? 'bg-dark-grey' : 'bg-white'}`}>
                <img src={ITEM_IMAGES.xurGrassItem} alt={t(ITEMS.xurGrassItem)} className={`${animationClick ? 'opacity-0 hover:opacity-0' : 'hover:opacity-70'} ${completed && 'opacity-70'} border border-white/30 transition-opacity duration-300`} loading="lazy" />
                {completed && (
                  <>
                    <div className="absolute -bottom-10 -right-10 bg-light-blue h-20 w-20 rotate-45" />
                    <div className="absolute bottom-3.5 right-2.5 h-2.5 w-4 border-l-4 border-b-4 border-white -rotate-45" />
                  </>
                )}
              </div>
            </button>
          )}
        </Tooltipable>
      </div>
    </section>
  );
}
