//@flow
import * as React from 'react';
import { useDiagnosisCardStyles } from '../CardStyles';
import { useSelector } from 'react-redux';
import type { DiagnosisSeverity } from '../../../models/Instruction';

const EnglishSeverityContent = () => {
  return (
    <React.Fragment>
      <p>It’s hard being sick, but your actions can protect others.</p>
      <p>
        Avoid contact with others as much as possible for at least 7 days from symptoms appearing.
        Wear masks and gloves and wash your hands regularly. If you share living space with others,
        find additional accommodations for them. You should not go to a hotel or any other public
        place. You should isolate at home and in sections of your home not exposed to others.You
        should not share bathrooms or other rooms with others in your household.
      </p>
      <p>
        If your symptoms improve and your fever subsides for 72 hours, you may leave isolation. Get
        plenty of rest, drink plenty of fluids and monitor and track your symptoms daily. If your
        symptoms begin to worsen, seek medial attention immediately or call your local Covid 19
        hotline. You may consider consulting with a medical professional about getting tested for
        Covid 19.
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

export const MediumSeverity = ({ language }: {| language: string |}) => {
  return language === 'es' ? <SpanishSeverityContent /> : <EnglishSeverityContent />;
};
