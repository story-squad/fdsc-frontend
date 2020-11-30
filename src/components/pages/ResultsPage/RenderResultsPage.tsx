import React from 'react';
import { useRecoilValue } from 'recoil';
import celebration from '../../../assets/img/celebration-station.png';
import dragonBoi from '../../../assets/img/dragon-boi.svg';
import { results } from '../../../state';
import { Header, Histogram, SubCard, ThoughtBubble } from '../../common';

const RenderResultsPage = (): React.ReactElement => {
  const winner = useRecoilValue(results.winner);

  return (
    <div>
      <Header />
      <div className="results-page">
        <img src={celebration} alt="Celebration Station" />
        {winner && (
          <div className="celebration">
            <ThoughtBubble
              render={() => <WinnerBubble winnerName={winner.username} />}
            />
            <div className="bottom">
              <div className="dragon">
                <img src={dragonBoi} alt="1st place dragon" />
              </div>
              <div className="sub">
                <SubCard {...winner} />
              </div>
            </div>
          </div>
        )}
        <Histogram />
      </div>
    </div>
  );
};

const WinnerBubble = (props: WinnerBubbleProps): React.ReactElement => {
  return (
    <div className="winner-bubble">
      <h3>Today We Celebrate:</h3>
      <h2>{props.winnerName}</h2>
      <div className="flames">&#128293; &#128293; &#128293;</div>
    </div>
  );
};

interface WinnerBubbleProps {
  winnerName: string;
}

export default RenderResultsPage;
