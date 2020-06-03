// @flow
import React from 'react';

export const ThumbSVG = () => {
  return (
    <svg width="58" height="58" viewBox="0 0 58 58">
      <defs>
        <filter id="Ellipse_40" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse">
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-opacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="Mood_Chart_Dot" transform="translate(-3251 177.999)">
        <g id="Group_501" transform="translate(3259.669 -172.388)">
          <g id="Group_471" transform="translate(0 0)">
            <g transform="matrix(1, 0, 0, 1, -8.67, -5.61)" filter="url(#Ellipse_40)">
              <circle
                id="Ellipse_40-2"
                cx="20"
                cy="20"
                r="20"
                transform="translate(9 6)"
                fill="#5685ff"
              />
            </g>
            <g id="Path_297" transform="translate(6.681 6.681)" fill="#fff">
              <path
                d="M13.522,0A13.522,13.522,0,1,1,0,13.522,13.522,13.522,0,0,1,13.522,0Z"
                stroke="none"
              />
              <path
                d="M 13.52208995819092 4 C 8.271589279174805 4 4 8.271589279174805 4 13.52208995819092 C 4 18.77259063720703 8.271589279174805 23.04417991638184 13.52208995819092 23.04417991638184 C 18.77259063720703 23.04417991638184 23.04417991638184 18.77259063720703 23.04417991638184 13.52208995819092 C 23.04417991638184 8.271589279174805 18.77259063720703 4 13.52208995819092 4 M 13.52208995819092 0 C 20.9901294708252 0 27.04417991638184 6.054040908813477 27.04417991638184 13.52208995819092 C 27.04417991638184 20.9901294708252 20.9901294708252 27.04417991638184 13.52208995819092 27.04417991638184 C 6.054040908813477 27.04417991638184 0 20.9901294708252 0 13.52208995819092 C 0 6.054040908813477 6.054040908813477 0 13.52208995819092 0 Z"
                stroke="none"
                fill="rgba(6,103,246,0.1)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
