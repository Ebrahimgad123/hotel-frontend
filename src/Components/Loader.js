import React from 'react';
import { css } from '@emotion/react';
import {  HashLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  return (
    <div className="sweet-loading" style={{ display: 'flex', justifyContent: 'center',marginTop:'200px', minHeight: '100vh', }}>
      <HashLoader color={'#000'} loading={true} css={override} size={80} />
    </div>
  );
};

export default Loader;

