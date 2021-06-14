import { generateMedia } from 'styled-media-query'

export const BREAKPOINT_XS = 480;
export const BREAKPOINT_SM = 576;

export const media = generateMedia({
  xs: `${BREAKPOINT_XS}px`,
  sm: `${BREAKPOINT_SM}px`
});