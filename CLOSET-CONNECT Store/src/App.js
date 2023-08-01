// App.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PricingOption, setPricingOption, setSearchKeyword } from './app/store';
import axios from 'axios';
import './App.css';
import { persistor } from './app/store'; // persistor를 불러오기

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

  // persistor를 이용하여 상태를 재구성합니다.
  useEffect(() => {
    persistor.persist();
  }, []);

  return (
    <div className="App">
      <div>
        <input
          type="text"
          className='searchBar'
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Find the Items you're looking for"
          style={{ color: "white" }}
        />
      </div>
      <div className="label-container">
        <div className='containerLeft'>
          <p>Pricing Options</p>
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
        </div>
        <div className='containerRight'>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <ul>
        {searchResult.map((content) => (
          <li key={content.id}>
            <img src={content.imagePath} alt={content.title} />
            <div className="textDiv">
              <div className='itemInfo'>
                <p className="itemTitle">{content.title}</p>
                <p className="itemCreator">{content.creator}</p>
              </div>
              <div className='itemPrice'>
                {content.pricingOption === PricingOption.PAID && (
                  <p className="price">$ {content.price}</p>
                )}
                {content.pricingOption === PricingOption.FREE && (
                  <p className="price">FREE</p>
                )}
                {content.pricingOption === PricingOption.VIEW_ONLY && (
                  <p className="price">VIEW_ONLY</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
