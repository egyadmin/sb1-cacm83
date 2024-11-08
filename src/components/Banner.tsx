import React from 'react';

export function Banner() {
  return (
    <div className="relative w-full">
      <div className="aspect-[21/6] w-full overflow-hidden">
        <img
          src="https://j.top4top.io/p_3231ybf8a1.png"
          alt="Sajco Banner"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}