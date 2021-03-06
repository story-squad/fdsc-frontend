import ConvertKitForm from 'convertkit-react';
import React from 'react';
import { convertKitConfig } from '../../../../../config';

const EmailCollectionForm = (): React.ReactElement => {
  return (
    <div className="email-collection">
      <h2>Find Out Who Wins!</h2>
      <p>
        Your vote has been cast! Enter your name and email below and be the
        first to find out who wrote the best story!
      </p>
      <ConvertKitForm {...convertKitConfig} />
    </div>
  );
};

export default EmailCollectionForm;
