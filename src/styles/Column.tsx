import styled from 'styled-components';

interface Props {
  alignItems?: any;
  alignSelf?: any;
  background?: any;
  alignContent?: any;
  align?: any;
  gap?: any;
  column?: any;
  justify?: any;
  justifyItems?: any;
  margin?: any;
  padding?: any;
  width?: any;
}

export const Column = styled.div<Props>`
  align-content: ${(props) => props.alignContent || 'unset'};
  align-items: ${(props) => props.align || 'unset'};
  background: ${(props) => props.theme.background};
  display: grid;
  gap: ${(props) => props.gap || 'unset'};
  grid-auto-flow: column;
  grid-template-columns: ${(props) => props.column || 'unset'};
  justify-content: ${(props) => props.justify || 'unset'};
  justify-items: ${(props) => props.justifyItems || 'unset'};
  margin: ${(props) => props.margin || 'unset'};
  padding: ${(props) => props.padding || 'unset'};
  width: ${(props) => props.width || 'unset'};
`;
