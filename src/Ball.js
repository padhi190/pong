import styled from 'styled-components';

export const Ball = styled.div.attrs(props => ({
    style: {
        width: `${ props.size }px`,
        height: `${ props.size }px`,
        top: `${ props.position.top - 15}px`,
        left: `${ props.position.left - 15 }px`
    }
}))`
    position: absolute;
    background-color: #2574db;
    border-radius: 50%;
    z-index: 1000;
    border: 5px solid white;
`