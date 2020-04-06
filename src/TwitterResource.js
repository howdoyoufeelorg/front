import React, {useState, useEffect}  from 'react';
import {TwitterTimelineEmbed} from "react-twitter-embed";

export const TwitterResource = (props) =>
{
    const {profile} = props;
    return (
        <>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName={profile}
                options={{height: 400}}
            />
        </>
    );
}