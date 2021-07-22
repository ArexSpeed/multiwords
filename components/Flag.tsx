import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import eng from 'assets/eng.png';
import fra from 'assets/fra.png';
import ger from 'assets/ger.png';
import ita from 'assets/ita.png';
import ned from 'assets/ned.png';
import pol from 'assets/pol.png';
import spa from 'assets/spa.png';

interface Props {
  flag: string;
}

const Flag: React.FC<Props> = ({ flag }) => {
  const [flagSrc, setFlagSrc] = useState(eng);

  useEffect(() => {
    flag === 'eng'
      ? setFlagSrc(eng)
      : flag === 'fra'
      ? setFlagSrc(fra)
      : flag === 'ger'
      ? setFlagSrc(ger)
      : flag === 'ita'
      ? setFlagSrc(ita)
      : flag === 'ned'
      ? setFlagSrc(ned)
      : flag === 'pol'
      ? setFlagSrc(pol)
      : flag === 'spa'
      ? setFlagSrc(spa)
      : setFlagSrc(eng);
  }, [flag]);

  return (
    <div className="w-lg h-lg m-2 rounded-full overflow-hidden">
      <Image src={flagSrc} alt={flag} />
    </div>
  );
};

export default Flag;
