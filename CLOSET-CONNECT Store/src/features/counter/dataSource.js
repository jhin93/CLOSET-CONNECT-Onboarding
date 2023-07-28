import axios from "axios";

let dataSet;
const dataSource = () => {
  axios.get('https://closet-recruiting-api.azurewebsites.net/api/data')
    .then((response) => {
      // 요청이 성공하면 response 객체에서 데이터를 가져옵니다.
      console.log('Data:', response.data);
      dataSet = response.data
    })
    .catch((error) => {
      // 요청이 실패하면 error 객체에서 에러를 가져옵니다.
      console.error('Error:', error.message);
    });
};


console.log("-------------- dataSource : ", dataSource)
