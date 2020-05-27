//@flow
import * as React from 'react';

const EnglishEmergency = () => {
  return (
    <React.Fragment>
      <p>
        STOP NOW and Dial Emergency Services (US – 911) if you are experiencing any of the
        following:
      </p>
      <ul>
        <li>Extreme Difficulty with Breathing</li>
        <li>Constant Chest Pain or Pressure</li>
        <li>Extreme Fatigue or lightheadedness</li>
        <li>Disorientation or Unresponsiveness</li>
      </ul>
    </React.Fragment>
  );
};

const SpanishEmergency = () => {
  return (
    <React.Fragment>
      <p>Spanish</p>
    </React.Fragment>
  );
};

export const EmergencyLanguageMapping = {
  en: EnglishEmergency,
  es: SpanishEmergency,
};
