import React from 'react';

import { Countdown, Header } from '../../common';
import { time } from '../../../utils';

const VotingClosed = (): React.ReactElement => {
  return (
    <div>
      <Header />
      <div className="voting-page">
        <div className="countdown-display">
          <h2>Voting is currently closed!</h2>
          <p>
            Sorry you missed it :(
            <br />
            Voting begins every day at{' '}
            <span className="alt">
              {time.schedule.vote.start.format('h:mm A')}
            </span>
          </p>
          <p>
            Check back in <Countdown toEvent="vote" /> to vote!
          </p>
        </div>
      </div>
    </div>
  );
};

export default VotingClosed;