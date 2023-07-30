import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PricingOption, setPricingOption, setSearchKeyword } from './app/store';
import axios from 'axios';
import './App.css'; // index.css 대신에 App.css를 불러옵니다.

const App = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const pricingOptions = useSelector((state) => state.pricingOptions);
  const searchKeyword = useSelector((state) => state.searchKeyword);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
      .then((response) => {
        setContents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredContents = contents.filter((content) => {
    // Pricing Option으로 필터링
    if (pricingOptions.length === 0) return true;
    return pricingOptions.includes(content.pricingOption);
  });

  const searchResult = filteredContents.filter((content) => {
    // 검색 키워드로 필터링
    if (searchKeyword === '') return true;
    return (
      content.creator.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      content.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  const handlePricingOptionChange = (option) => {
    const updatedOptions = pricingOptions.includes(option)
      ? pricingOptions.filter((item) => item !== option)
      : [...pricingOptions, option];

    dispatch(setPricingOption(updatedOptions));
  };

  const handleSearchInputChange = (event) => {
    const keyword = event.target.value;
    setSearchInput(keyword);
    dispatch(setSearchKeyword(keyword));
  };

  const handleReset = () => {
    dispatch(setPricingOption([]));
    dispatch(setSearchKeyword(''));
    setSearchInput('');
  };

  return (
    <div className="App">
      <h1>Contents List</h1>
      <div className="label-container">
        <label>
          <input
            type="checkbox"
            checked={pricingOptions.includes(PricingOption.PAID)}
            onChange={() => handlePricingOptionChange(PricingOption.PAID)}
          />
          Paid Option
        </label>
        <label>
          <input
            type="checkbox"
            checked={pricingOptions.includes(PricingOption.FREE)}
            onChange={() => handlePricingOptionChange(PricingOption.FREE)}
          />
          Free Option
        </label>
        <label>
          <input
            type="checkbox"
            checked={pricingOptions.includes(PricingOption.VIEW_ONLY)}
            onChange={() => handlePricingOptionChange(PricingOption.VIEW_ONLY)}
          />
          View Only Option
        </label>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search by name or title"
        />
      </div>
      <ul>
        {searchResult.map((content) => (
          <li key={content.id}>
            <img src={content.imagePath} alt={content.title} />
            <div>
              <p className="title">{content.title}</p>
              <p>Creator: {content.creator}</p>
              <p>Pricing Option: {content.pricingOption}</p>
              {content.pricingOption === PricingOption.PAID && (
                <p className="price">Price: {content.price}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
