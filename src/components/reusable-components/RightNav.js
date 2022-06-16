/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgb(78, 235, 61);
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    margin-top: 0px;
    height: 100vh;
    width: 300px;

    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <Link to='/profile'>
        <li>My profile</li>
      </Link>
      <Link to='/addplant'>
        <li>Add plant</li>
      </Link>
      <Link to='/plants'>
        <li>Plantfeed</li>
      </Link>
      <Link to='/calendar'>
        <li>Calendar</li>
      </Link>
      <li>Sign In</li>
      <li>Sign Up</li>
    </Ul>
  );
};

export default RightNav;
