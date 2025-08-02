import React, { useState } from 'react';
import quotes from '../data/quotes';

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export default function Quote() {
  const [quote, setQuote] = useState(getRandomQuote());

  return (
    // Removed unnecessary layout classes like h-full and flex-grow
    <div className="rounded-lg w-full p-2">
      <blockquote>
        <p className="italic text-[10px] text-left text-sm">"{quote.text}"</p>
        <footer className="text-right mt-2 text-[10px] font-semibold text-xs">- {quote.author || 'Unknown'}</footer>
      </blockquote>

      <div className='flex flex-row justify-between items-center mt-8 p-2 border-t border-white'>
        <a href="github.com">g</a>
        <a href="github.com">g</a>
        <a href="github.com">g</a>
        <a href="github.com">g</a>
      </div>
    </div>
  );
}