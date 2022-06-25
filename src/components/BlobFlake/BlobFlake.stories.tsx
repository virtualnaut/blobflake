/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BlobFlake from './BlobFlake';

const degToRad = (deg: number) => (Math.PI / 180) * deg;
const radToDeg = (rad: number) => (180 / Math.PI) * rad;

export default {
  title: 'Example/BlobFlake',
  component: BlobFlake,
  argTypes: {
    // size: {
    //   name: 'Size',
    //   type: { name: 'number' },
    //   description: 'Width and height of the blob in pixels.',
    // },
    // lobes: {
    //   name: 'Lobes',
    //   type: { name: 'number' },
    //   description: 'The number of lobes that the blob has.',
    // },
    // asymptote: {
    //   name: 'Smoothing Asymptote',
    //   type: { name: 'number', required: false },
    //   description:
    //     'Changing this modifies the y-offset of the smoothing curve. This will affect all lobe counts linearly.',
    //   defaultValue: Blob.defaultProps?.asymptote,
    //   control: { type: 'range', min: -100, max: 100, step: 1 },
    // },
    // coefficient: {
    //   name: 'Smoothing Coefficient',
    //   type: { name: 'number', required: false },
    //   description:
    //     'Changing this modifies the coeffient of the smoothing curve. This will affect blobs with smaller lobe counts mode than larger ones.',
    //   defaultValue: Blob.defaultProps?.coefficient,
    //   control: { type: 'range', min: 0, max: 1000, step: 1 },
    // },
    // sharpness: {
    //   name: 'Sharpness',
    //   type: { name: 'number', required: false },
    //   description: 'How sharp the lobes are',
    //   defaultValue: Blob.defaultProps?.sharpness,
    //   control: { type: 'range', min: 0, max: 1, step: 0.01 },
    // },
    // depth: {
    //   name: 'Depth',
    //   type: { name: 'number' },
    //   description: 'The depth of the variation on the edge in pixels.',
    // },
    // squishX: {
    //   name: 'x-Axis Squish',
    //   type: { name: 'number' },
    //   description:
    //     "The number of pixels to offset the blob's valleys by in the x direction.",
    //   control: { type: 'range', min: -100, max: 100, step: 1 },
    //   defaultValue: Blob.defaultProps?.squishX,
    // },
    // squishY: {
    //   name: 'y-Axis Squish',
    //   type: { name: 'number' },
    //   description:
    //     "The number of pixels to offset the blob's valleys by in the y direction.",
    //   control: { type: 'range', min: -100, max: 100, step: 1 },
    //   defaultValue: Blob.defaultProps?.squishY,
    // },
    // rotation: {
    //   name: 'Rotation',
    //   type: { name: 'number' },
    //   description: 'The angle in radians to offset the blob by.',
    //   control: { type: 'range', min: 0, max: 360, step: 1 },
    //   defaultValue: radToDeg(Blob.defaultProps?.rotation!),
    // },
    // layers: {
    //   name: 'Layers',
    //   type: { name: 'number' },
    //   description: 'The number of layers that the blob has.',
    //   defaultValue: Blob.defaultProps?.layers,
    // },
    // layerGap: {
    //   name: 'Layer Gap',
    //   type: { name: 'number' },
    //   description: 'The distance in pixels between layers',
    //   control: { type: 'range', min: 0, max: 50, step: 1 },
    //   defaultValue: Blob.defaultProps?.layerGap,
    // },
    // linearColourA: {
    //   name: 'Colour A',
    //   type: { name: 'string' },
    //   control: 'color',
    //   defaultValue: Blob.defaultProps?.linearColourA,
    // },
    // linearColourB: {
    //   name: 'Colour B',
    //   type: { name: 'string' },
    //   control: 'color',
    //   defaultValue: Blob.defaultProps?.linearColourB,
    // },
    // layerOpacity: {
    //   name: 'Layer Opacity',
    //   type: { name: 'number' },
    //   control: { type: 'range', min: 0, max: 1, step: 0.05 },
    //   defaultValue: Blob.defaultProps?.layerOpacity!,
    // },
    // linearGradientAngle: {
    //   name: 'Linear Gradient Angle',
    //   type: { name: 'number' },
    //   control: { type: 'range', min: 0, max: 360, step: 1 },
    //   defaultValue: radToDeg(Blob.defaultProps?.linearGradientAngle!),
    // },
  },
} as ComponentMeta<typeof BlobFlake>;

const Template: ComponentStory<typeof BlobFlake> = ({
  //   rotation,
  //   linearGradientAngle,
  ...args
}) => (
  <BlobFlake
    // rotation={degToRad(rotation!)}
    // linearGradientAngle={degToRad(linearGradientAngle!)}
    {...args}
  />
);

export const Trilobe = Template.bind({});
Trilobe.args = {
  size: 200,
  //   lobes: 3,
  //   depth: 50,
  //   layers: 3,
};

// export const Octolobe = Template.bind({});
// Octolobe.args = {
//   size: 200,
//   lobes: 8,
//   depth: 20,
//   layers: 5,
// };

// export const Squished = Template.bind({});
// Squished.args = {
//   size: 200,
//   lobes: 7,
//   depth: 15,
//   squishX: -10,
//   squishY: 6,
//   layers: 4,
//   layerGap: 10,
//   linearColourA: '#ff00bf',
//   linearColourB: '#ffb000',
//   layerOpacity: 0.3,
// };
