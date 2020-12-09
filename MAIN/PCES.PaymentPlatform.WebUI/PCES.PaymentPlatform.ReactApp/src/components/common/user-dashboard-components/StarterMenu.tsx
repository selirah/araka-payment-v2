import React from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { StarterText } from './Styles';

const StarterMenu: React.FC = () => {
  return (
    <StarterText>
      <p>
        Your business is currently a starter business, and so there are limits
        on your total collections and available features
      </p>
      <Divider type="horizontal" />
      <Link to="/">Need help incorporating your business?</Link>
    </StarterText>
  );
};

export { StarterMenu };
