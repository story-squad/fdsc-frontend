import React, { useState } from 'react';
import ReactScroller from 'react-page-scroller';
import { Home } from './Home';
import { Steps } from './Steps';

const ScrollingLandingPageContainer = (): React.ReactElement => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const changePage = (newNum: number) => setCurrentPage(newNum);
  const beforePageChange = (newNum: number) => console.log(newNum);

  return (
    <ReactScroller
      pageOnChange={changePage}
      onBeforePageScroll={beforePageChange}
      customPageNumber={currentPage}
    >
      <Home />
      <Steps />
    </ReactScroller>
  );
};

export default ScrollingLandingPageContainer;