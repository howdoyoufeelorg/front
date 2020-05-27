//@flow
import * as React from 'react';

const EnglishDisclaimer = () => {
  return (
    <React.Fragment>
      <p>
        This Service is offered for public benefit and research purposes. Your information will
        always remain completely anonymous unless you choose to de-anonymize it at some point in the
        future. HowDoYouFeel.org ( the “Service” ) is not intended to treat or definitively
        diagnosis any disease or health condition. Instead, this Service aims to provide relevant
        guidance based on presumed accurate information provided by you, and in accordance with the
        most up-to-date guidelines for active syndrome response given geographic location and
        reported symptoms.
      </p>

      <p>
        You should not ignore professional medical advice in favor of information received from
        HowDoYouFeel.org. If you believe you or somebody you know is having an emergency, please
        call a medical professional or dial local Emergency Services ( US – 911 ) immediately.
        HowDoYouFeel.org Service does not constitute the practice of medicine or professional
        medical advice, diagnosis or treatment.
      </p>

      <p>
        By using the Service and clicking Get Started, you agree to do so solely at your own risk,
        and are acknowledging that you have reviewed and agree to our terms of use and privacy
        policy.
      </p>
    </React.Fragment>
  );
};

const SpanishDisclaimer = () => {
  return (
    <React.Fragment>
      <p>Spanish</p>
    </React.Fragment>
  );
};

export const ComponentLanguageMapping = {
  en: EnglishDisclaimer,
  es: SpanishDisclaimer,
};
