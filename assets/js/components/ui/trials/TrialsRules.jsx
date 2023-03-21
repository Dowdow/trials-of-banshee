import React from 'react';
import CategoryTitle from '../CategoryTitle';
import gunsmith from '../../../../img/misc/gunsmith.png';

export default function TrialsRules() {
  return (
    <section>
      <CategoryTitle title="Rules" />
      <div className="flex items-center gap-6 mt-4">
        <img src={gunsmith} alt="Gunsmith logo" className="hidden md:block w-40 h-40" />
        <p className="text-lg text-white/90">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed tincidunt dolor, ut bibendum quam. Nulla sapien nisl, posuere et eros in, pellentesque lobortis lectus. Nulla gravida eleifend elit non vulputate. Aliquam erat volutpat. Mauris porta pharetra enim, sed aliquet odio accumsan at. Nunc sit amet eros tincidunt, porttitor ante non, dignissim mauris. Vestibulum rutrum porttitor nibh in venenatis.</p>
      </div>
    </section>
  );
}
