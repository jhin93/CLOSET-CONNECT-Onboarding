import styled from 'styled-components';

export const AppWrapper = styled.div`
  padding: 20px;
`;

export const ContentItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  p {
    margin: 0;
    padding: 5px;
  }

  .title {
    font-weight: bold;
  }

  .price {
    color: green;
  }
`;

export const PricingOptionLabel = styled.label`
  margin-right: 15px;
`;
