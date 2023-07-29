// actions.js
const setPricingOption = (pricingOptions) => ({
    type: 'SET_PRICING_OPTION',
    payload: pricingOptions,
  });
  
  const setSearchKeyword = (searchKeyword) => ({
    type: 'SET_SEARCH_KEYWORD',
    payload: searchKeyword,
  });
  
  export { setPricingOption, setSearchKeyword };
  