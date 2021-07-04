import axios from 'axios';
import React from 'react';
import useAsync from './hooks/useAsync';

async function newsApi() {
  const response = await axios.get(
    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=3cedf0eaaf074c6f95d0683508d3a0fb'
  );
  console.log(response.data);
  return response.data;
}

function News() {
  const [state, refetch] = useAsync(newsApi, [], false);
  const { loading, data: datas, error } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러발생!</div>;
  if (!datas) return null;

  return (
    <>
      <button onClick={refetch}>최신뉴스 불러오기</button>
      <textarea rows={7} value={JSON.stringify(datas, null, 2)} />
      {/* <ul>
        {datas.map((data) => (
          <li key={data.url}>{data.description}</li>
        ))}
      </ul> */}
    </>
  );
}

export default News;
