
import React from 'react';

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.288.257m-3.288-.257C3.35 6.128 2.25 7.35 2.25 8.75v8.75a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 17.5V8.75a2.25 2.25 0 00-2.25-2.25h-1.5m-1.022-.165c-.001-.001-.001-.001-.002-.001a.752.752 0 01-.349-.124l-1.794-.897m0 0L12 2.25m0 0l-1.794.897m1.794-.897L12 2.25m6.75 3.512l-1.794-.897m0 0L12 2.25" />
  </svg>
);

export default TrashIcon;
