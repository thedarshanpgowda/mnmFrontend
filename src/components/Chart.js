import styled from 'styled-components';

const ChartUI = styled.div`
    border-radius: ${props => props.$isset ? props.$val : "15px"};
    overflow: hidden;
`;

export default function Chart(props) {
  const { isset, val, className, ...rest } = props;
  return (
    <ChartUI $isset={isset} $val={val} className={className} {...rest}>
      {props.children}
    </ChartUI>
  );
}
