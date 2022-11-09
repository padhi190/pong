import styled from 'styled-components';

export const Ball = styled.div.attrs(props => ({
    style: {
        width: `${ props.size }px`,
        height: `${ props.size }px`,
        top: `${ props.position.top }px`,
        left: `${ props.position.left }px`
    }
}))`
    position: absolute;
    background-color: red;
    border-radius: 50%;
`