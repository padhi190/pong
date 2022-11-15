import styled from 'styled-components';

export const CenterColumn = styled.div.attrs(props => ({
    style: {
        width: `${ props.size.width }px`,
        height: `${ props.size.height }px`,
        top: `${ props.position.top }px`,
        left: `${ props.position.left - 3 }px`, // - half of border right width
    }
}))`
    position: absolute;
    border-right: 6px dashed white
`