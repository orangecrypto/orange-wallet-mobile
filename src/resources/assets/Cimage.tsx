import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Responsive } from '@utils/Responsive';
import SVG from './SVG';


const logout = React.memo(() => <SvgXml
  width={Responsive.size24}
  height={Responsive.size24}
  xml={SVG.logout}
/>
);
const caretDown = React.memo(() => <SvgXml
  width={Responsive.size24}
  height={Responsive.size24}
  xml={SVG.caretDown}
/>
);
const caretUp = React.memo(() => <SvgXml
  width={Responsive.size24}
  height={Responsive.size24}
  xml={SVG.caretUp}
/>
);
const addIcon = React.memo(() => <SvgXml
  width={Responsive.size24}
  height={Responsive.size24}
  xml={SVG.addIcon}
/>
);

const walletIcon = React.memo(() => <SvgXml
  width={Responsive.size24}
  height={Responsive.size24}
  xml={SVG.walletIcon}
/>
);


export default {
  addIcon,
  caretDown,
  caretUp,
  logout,
  walletIcon
}