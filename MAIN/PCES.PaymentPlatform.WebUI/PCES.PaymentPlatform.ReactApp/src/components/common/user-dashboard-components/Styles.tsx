import styled from 'styled-components';

export const StarterText = styled.div`
  max-width: 260px;
  background: #fff;
  padding: 25px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid #efefef;
`;

export const MinVH = styled.div`
  min-height: 100vh;
`;

export const Logo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;

export const SiteLayoutBackground = styled.div`
  background: #fff;
  padding; 0;
`;

export const Trigger = styled.i`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  position: relative;
  z-index: 99999;
  :hover {
    color: #1890ff;
  }
`;

export const PortalTitle = styled.span`
  font-weight: 700;
`;

export const FloatRight = styled.div`
  float: right;
`;

export const ContentAlignment = styled.div`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
`;
