import styled from 'styled-components';

export const GameBox = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    position: relative;
    background-color: aqua;
    overflow: hidden;
`