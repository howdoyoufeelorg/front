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

  const areaResources =
    resources.area && resources.area.twitterResources.length
      ? resources.area.twitterResources
      : null;
  const stateResources =
    resources.state && resources.state.twitterResources.length
      ? resources.state.twitterResources
      : null;

  const resourcesToUse = areaResources || stateResources || [];

  return (
    <Card className={classes.infoCard}>
      <>
          <div className={classes.sectionTitle}>
          Latest Twitter Posts for Your Area
        </div>
        <hr />
        {resourcesToUse.map((data, index) => (
          <TwitterResource profile={data.value} key={index} />
        ))}
      </>
    </Card>
  );
};
