import React from 'react';

const NextImage = React.forwardRef((props, ref) => (
  <img ref={ref} {...props} />
));

export default NextImage;
