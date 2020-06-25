//@flow
import * as React from 'react';
import { useDiagnosisCardStyles } from '../CardStyles';
import { useSelector } from 'react-redux';
import type { DiagnosisSeverity } from '../../../models/Instruction';

const EnglishSeverityContent = () => {
  return (
    <React.Fragment>
      <p>
        Practice Social Distancing and Wear Masks in Public. Avoid Large Crowds and those who are
        Showing Symptoms.
      </p>
      <p>
        Take care of your immune symptom. Get plenty of rest, fluids and eat non-processed foods.
        Get some sun and exercise regularly.
      </p>
      <p>
        If you can, use delivery services to purchase and deliver items to you such as food,
        supplies and prescriptions.
      </p>
    </React.Fragment>
  );
};

const SpanishSeverityContent = () => {
  return (
    <React.Fragment>
      <p>
        Practice Social Distancing and Wear Masks in Public. Avoid Large Crowds and those who are
        Showing Symptoms.
      </p>
      <p>
        Take care of your immune symptom. Get plenty of rest, fluids and eat non-processed foods.
        Get some sun and exercise regularly.
      </p>
      <p>
        If you can, use delivery services to purchase and deliver items to you such as food,
        supplies and prescriptions.
      </p>
    </React.Fragment>
  );
};

export const LowSeverity = ({
  language,
}: {|
  language: string,
|}) => {
  return language === 'es' ? <SpanishSeverityContent /> : <EnglishSeverityContent />;
};
