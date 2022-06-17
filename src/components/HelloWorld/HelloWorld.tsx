import React, { FunctionComponent } from 'react';

const HelloWorld: FunctionComponent<{ name: string }> = ({ name }) => (
  <div>Hello, {name}!</div>
);

export default HelloWorld;
