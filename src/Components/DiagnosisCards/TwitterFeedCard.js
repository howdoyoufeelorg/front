// @flow
import React from 'react';
import { TwitterResource } from '../TwitterResource';
import Card from '@material-ui/core/Card';
import { useDiagnosisCardStyles } from './CardStyles';

type EntityResources = {
  twitterResources: Array<any>,
};

type Resources = {
  area: EntityResources,
  state: EntityResources,
};

export const TwitterFeedCard = ({ resources }: { resources: Resources }) => {
  const classes = useDiagnosisCardStyles();

  return (
    <Card className={classes.infoCard}>
      {resources.area && resources.area.twitterResources.length ? (
        <>
          LATEST TWITTER POSTS FOR YOUR AREA
          <hr />
          {resources.area.twitterResources.map((data, index) => (
            <TwitterResource profile={data.value} key={index} />
          ))}
        </>
      ) : (
        ''
      )}
      {resources.state && resources.state.twitterResources.length ? (
        <>
          <span style={{ fontWeight: 900 }}>LATEST TWITTER POSTS FOR YOUR STATE</span>
          <hr />
          {resources.state.twitterResources.map((data, index) => (
            <TwitterResource profile={data.value} key={index} />
          ))}
        </>
      ) : (
        ''
      )}
    </Card>
  );
};
