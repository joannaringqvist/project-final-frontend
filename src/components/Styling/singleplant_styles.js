/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

export const HiddenCheck = styled.input.attrs({ type: 'checkbox' })`
  height: 32px;
  width: 48px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

export const CheckboxLabel = styled.label`
  min-width: 70px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  color: red;
  transition: 0.2s;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  padding: 0 1rem;
  z-index: 2;
`;
export const CheckboxContainer = styled.span`
  display: flex;
  width: 95%;
  height: 32px;
  border-radius: 32px;
  background-color: grey;
  pointer-events: none;
  position: absolute;
  z-index: -1;

  ${HiddenCheck}:checked + && {
    background-color: green;
  }
`;
