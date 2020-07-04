//@flow
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import { BackButton, NextButton } from '../Components/BlueButton';
import { action } from '../sagas';
import { TextField } from '../Components/FormFields/TextField';
import { FlagDropDown } from '../Components/FlagDropDown';
import { DialogCard, DialogCardActions, DialogCardContent, DialogCardHeader } from './DialogCard';
import { genderChoices, raceChoices } from '../translations';
import { Select } from '../Components/FormFields/Select';
import Image from '../assets/images/Where_Are _You_From_Located.png';

const useStyles = makeStyles(styles);

export function Location(props: {
  onNext: () => void,
  onPrevious: () => void,
  progressCompleted: number,
}) {
  const classes = useStyles();
  const answers = useSelector((state) => state.answers);
  const { onNext, onPrevious, progressCompleted } = props;
  const {
    dialog_location_title,
    button_next,
    button_back,
    zipcode_input_label,
    zipcode_input_placeholder,
    country_selector_search_placeholder,
    alert_missing_zipcode,
    dialog_basic_info_title,
    age_input_label,
    age_input_placeholder,
    gender_input_label,
    gender_input_placeholder,
    race_input_label,
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
      <DialogCardHeader displayProgress progressCompleted={progressCompleted}></DialogCardHeader>
      <DialogCardContent classes={{ root: classes.content }}>
        <div className={classes.imageContainer} style={{ marginTop: 20, marginBottom: 60 }}>
          <img src={Image} alt="Illustration" />
        </div>
        <h2 className={classes.title} style={{ marginBottom: 32 }}>
          {dialog_location_title[language]}
        </h2>
        <div className={classes.formField}>
          <TextField
            label={zipcode_input_label[language]}
            placeholder={zipcode_input_placeholder[language]}
            size={'medium'}
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'zipcode', data: { value: event.target.value } })
            }
            value={answers['zipcode'].value}
            fullWidth
          />
        </div>
        <div>
          <InputLabel className={classes.label}>
            {country_selector_search_placeholder[language]}
          </InputLabel>
          <FlagDropDown
            onSelect={(value) =>
              action('ANSWER_SET', { questionId: 'country', data: { value: value } })
            }
          />
        </div>
        <h2 className={classes.title} style={{ marginTop: 74, marginBottom: 32 }}>
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
          <InputLabel className={classes.label}>{gender_input_label[language]}</InputLabel>
          <Select
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'gender', data: { value: event.target.value } })
            }
            value={answers['gender'].value || ''}
            displayEmpty
            placeholder={gender_input_placeholder[language]}
            options={genderChoices[language].map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </div>
        <div className={classes.formField}>
          <InputLabel className={classes.label}>{race_input_label[language]}</InputLabel>
          <Select
            onChange={(event) =>
              action('ANSWER_SET', { questionId: 'race', data: { value: event.target.value } })
            }
            value={answers['race'].value || ''}
            displayEmpty
            placeholder={race_input_placeholder[language]}
            options={raceChoices[language].map((item) => ({
              value: item,
              label: item,
            }))}
          />
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
