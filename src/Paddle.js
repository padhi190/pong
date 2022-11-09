import styled from 'styled-components';

export const Paddle = styled.div.attrs(props => ({
  style: {
    width: `${ props.width }px`,
    height: `${ props.height }px`,
    top: `${ props.position.top }px`,
    left: `${ props.position.left }px`
  }
}))`
  position: absolute;
  background-color: black;
  transition: all ease 0.25s;
`;
