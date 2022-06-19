import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Blob from './Blob';

export default {
  title: 'Example/Blob',
  component: Blob,
  argTypes: {
    size: {
      name: 'Size',
      type: { name: 'number' },
      description: 'Width and height of the blob in pixels.',
    },
    lobes: {
      name: 'Lobes',
      type: { name: 'number' },
      description: 'The number of lobes that the blob has.',
    },
    asymptote: {
      name: 'Smoothing Asymptote',
      type: { name: 'number', required: false },
      description:
        'Changing this modifies the y-offset of the smoothing curve. This will affect all lobe counts linearly.',
      defaultValue: Blob.defaultProps?.asymptote,
      control: { type: 'range', min: -100, max: 100, step: 1 },
    },
    coefficient: {
      name: 'Smoothing Coefficient',
      type: { name: 'number', required: false },
      description:
        'Changing this modifies the coeffient of the smoothing curve. This will affect blobs with smaller lobe counts mode than larger ones.',
      defaultValue: Blob.defaultProps?.coefficient,
      control: { type: 'range', min: 0, max: 1000, step: 1 },
    },
    sharpness: {
      name: 'Sharpness',
      type: { name: 'number', required: false },
      description: 'How sharp the lobes are',
      defaultValue: Blob.defaultProps?.sharpness,
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    depth: {
      name: 'Depth',
      type: { name: 'number' },
      description: 'The depth of the variation on the edge in pixels.',
    },
    squishX: {
      name: 'x-Axis Squish',
      type: { name: 'number' },
      description: "The number of pixels to offset the blob's valleys by.",
      control: { type: 'range', min: -100, max: 100, step: 1 },
      defaultValue: Blob.defaultProps?.squishX,
    },
    squishY: {
      name: 'x-Axis Squish',
      type: { name: 'number' },
      description: "The number of pixels to offset the blob's valleys by.",
      control: { type: 'range', min: -100, max: 100, step: 1 },
      defaultValue: Blob.defaultProps?.squishY,
    },
    rotation: {
      name: 'Rotation',
      type: { name: 'number' },
      description: 'The angle in radians to offset the blob by.',
      control: { type: 'range', min: 0, max: 2 * Math.PI, step: Math.PI / 10 },
      defaultValue: Blob.defaultProps?.rotation,
    },
  },
} as ComponentMeta<typeof Blob>;

const Template: ComponentStory<typeof Blob> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Blob {...args} />
);

export const Trilobe = Template.bind({});
Trilobe.args = {
  size: 200,
  lobes: 3,
  depth: 50,
};

export const Octolobe = Template.bind({});
Octolobe.args = {
  size: 200,
  lobes: 8,
  depth: 20,
};
