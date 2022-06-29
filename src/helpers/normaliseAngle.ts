/**
 * Makes sure the given angle (radians) obeys 0 <= angle < 360.
 */
const normaliseAngle = (angle: number) => (angle >= 360 ? angle - 360 : angle);
export default normaliseAngle;
