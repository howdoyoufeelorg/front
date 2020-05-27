import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, InputLabel } from '@material-ui/core';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton, {BackButton, NextButton} from '../Components/BlueButton';
import { action } from '../sagas';
import { TextField } from '../Components/TextField';
import { FlagDropDown } from '../Components/FlagDropDown';
import { DialogCard, DialogCardActions, DialogCardContent, DialogCardHeader } from './DialogCard';
import { genderChoices, raceChoices } from '../translations';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(styles);

export function Location(props) {
  const classes = useStyles();
  const answers = useSelector((state) => state.answers);
  const { onNext, onPrevious } = props;
  const {
    dialog_location_title,
    button_next,
    button_back,
    zipcode_input_placeholder,
    country_selector_search_placeholder,
    alert_missing_zipcode,
    dialog_basic_info_title,
    age_input_label,
    age_input_placeholder,
    gender_input_placeholder,
    race_input_placeholder,
  } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
  const onButtonClick = () => {
    if (answers['zipcode'].value === '') {
      alert(alert_missing_zipcode[language]);
    } else {
      onNext();
    }
  };
  return (
    <DialogCard>
      <DialogCardHeader displayProgress progressCompleted={60}>
        <div className={classes.titleText}></div>
        <LanguageSelector />
      </DialogCardHeader>
      <DialogCardContent classes={{ root: classes.content }}>
        <h2 className={classes.title}>{dialog_location_title[language]}</h2>
        <div className={classes.formField}>
          <TextField
            label={zipcode_input_placeholder[language]}
            size={'medium'}
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'zipcode', data: { value: event.target.value } })
            }
            value={answers['zipcode'].value}
            fullWidth
          />
        </div>
        <div>
          <InputLabel style={{ fontWeight: 900 }}>
            {country_selector_search_placeholder[language]}
          </InputLabel>
          <FlagDropDown
            onSelect={(value) =>
              action('ANSWER_SET', { questionId: 'country', data: { value: value } })
            }
          />
        </div>
        <h2 className={classes.title} style={{ marginTop: 40 }}>
          {dialog_basic_info_title[language]}
        </h2>
        <div className={classes.formField}>
          <TextField
            size={'medium'}
            label={age_input_label[language]}
            placeholder={age_input_placeholder[language]}
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'age', data: { value: event.target.value } })
            }
            value={answers['age'].value}
            fullWidth
          />
        </div>
        <div className={classes.formField}>
          <TextField
            size={'medium'}
            select
            label={gender_input_placeholder[language]}
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'gender', data: { value: event.target.value } })
            }
            value={answers['gender'].value}
            fullWidth
          >
            {genderChoices[language].map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.formField}>
          <TextField
            size={'medium'}
            select
            label={race_input_placeholder[language]}
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'race', data: { value: event.target.value } })
            }
            value={answers['race'].value}
            fullWidth
          >
            {raceChoices[language].map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </DialogCardContent>
      <DialogCardActions className={classes.actions}>
        <BackButton variant="noShadow" onClick={() => onPrevious()} size="regular">
          {button_back[language]}
        </BackButton>
        <NextButton variant="default" onClick={() => onButtonClick()} size="large">
          {button_next[language]}
        </NextButton>
      </DialogCardActions>
    </DialogCard>
  );
}
