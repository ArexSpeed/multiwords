import React, { useState, useRef, useEffect } from 'react';

type Props = {
  title: string;
  // eslint-disable-next-line no-undef
  children?: JSX.Element[] | JSX.Element;
};

const Accordion = ({ title, children }: Props) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px';
    }
  }, [contentRef, active]);

  const toogleActive = () => {
    setActive(!active);
  };

  return (
    <div className="flex flex-col w-full">
      <button
        className="bg-secondary bg-opacity-25 rounded-md h-xl mb-2 px-3 flex justify-between items-center transition ease-in"
        onClick={toogleActive}>
        <p className="text-lg">{title}</p>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div ref={contentRef} className="overflow-hidden transition-all ease-in">
        {children}
      </div>
    </div>
  );
};

export default Accordion;
