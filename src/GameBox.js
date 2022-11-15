import styled from 'styled-components';

export const GameBox = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    position: relative;
    background-color: white;
    border: 10px solid white;
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
`