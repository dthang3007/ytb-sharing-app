import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getVideos } from '../api';
import { Video } from '../types';
import { getLink } from '../utils';

type Props = {};

const Main = (props: Props) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Video[]>(['video'], {
    queryFn: ({ pageParam }) => {
      return getVideos({ limit: 5, cursor: pageParam });
    },
    getNextPageParam: (lastPage) => {
      const cursor = lastPage[lastPage.length - 1]?.id;
      return cursor;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main>
      {data?.pages?.length > 0 ? (
        data.pages.map((page, index) => (
          <Fragment key={index}>
            {page.length > 0 &&
              page.map((item, i) => (
                <div className="video" key={index + i}>
                  <div className="iframe">
                    <iframe title="thangpham" width="100%" height="300px" src={getLink(item.link)}></iframe>
                  </div>
                  <div className="info">
                    <h3>{item.title}</h3>
                    <span>
                      Shared by: <b>{item.user.email}</b>
                    </span>
                    <p>Description:</p>
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            {hasNextPage && <span ref={ref}>...</span>}
          </Fragment>
        ))
      ) : (
        <p>No data</p>
      )}
    </main>
  );
};

export default Main;
