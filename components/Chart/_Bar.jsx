import React, { useState, useEffect } from 'react';

import { Bar } from '@ant-design/plots';

const _Bar = ({data}) => {
 
  const config = {
    width:900 ,
    height:200,
    data,
    xField: 'number',
    yField: 'name',
    seriesField: 'name',
    color: ({ name }) => {
      return name === 'At Post' ? '#FAAD14' : '#5B8FF9';
    },
    legend: false,
    meta: {
      name: {
        alias: '类别',
      },
      number: {
        alias: '销售额',
      },
    },
  };
  return <Bar {...config} />;
};

export default _Bar
