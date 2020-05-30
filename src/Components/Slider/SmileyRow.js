//@flow
import React from 'react';
import Emoji1 from '../../assets/icons/Mood_Emoji_1.svg';
import Emoji2 from '../../assets/icons/Mood_Emoji_2.svg';
import Emoji3 from '../../assets/icons/Mood_Emoji_3.svg';
import Emoji4 from '../../assets/icons/Mood_Emoji_4.svg';
import Emoji5 from '../../assets/icons/Mood_Emoji_5.svg';
import { makeStyles } from '@material-ui/core/styles';
import { useIsMobile } from '../../Hooks/useIsMobile';

const useStyles = makeStyles(() => ({
  smileyRow: {
    display: 'flex',
    width: 'calc(100% + 30px)',
    justifyContent: 'space-between',
    marginLeft: '-15px',
    marginTop: (props) => (props.isMobile ? -5 : 0),
    '& > img': {
      height: (props) => (props.isMobile ? 30 : 40),
    },
  },
}));

export const SmileyRow = () => {
  const isMobile = useIsMobile();
  const classes = useStyles({ isMobile });
  return (
    <div className={classes.smileyRow}>
      <img src={Emoji1} alt="Sad emoji" />
      <img src={Emoji2} alt="Sad emoji" />
      <img src={Emoji3} alt="Sad emoji" />
      <img src={Emoji4} alt="Sad emoji" />
      <img src={Emoji5} alt="Sad emoji" />
    </div>
  );
};
