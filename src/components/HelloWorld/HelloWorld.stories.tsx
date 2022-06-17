import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HelloWorld from './HelloWorld';

export default {
  title: 'Example/HelloWorld',
  component: HelloWorld,
  argTypes: {
    name: {
      name: 'Name',
      type: { name: 'string' },
    },
  },
} as ComponentMeta<typeof HelloWorld>;

const Template: ComponentStory<typeof HelloWorld> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <HelloWorld {...args} />
);

export const Mike = Template.bind({});
Mike.args = {
  name: 'Mike Krol',
};

export const Declan = Template.bind({});
Declan.args = {
  name: 'Declan McKenna',
};
