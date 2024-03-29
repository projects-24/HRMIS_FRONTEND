import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const _LineGraph = ({data}) => {
 
  const config = {
    data,
    xField: 'name',
    yField: 'number',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};

export default _LineGraph