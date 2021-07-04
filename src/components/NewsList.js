import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import useAsync from '../hooks/useAsync';

async function newsApi() {
  const response = await axios.get(
    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=3cedf0eaaf074c6f95d0683508d3a0fb'
  );
  return response.data.articles;
}

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// const sampleArticle = {
//   title: '제목',
//   description: '내용',
//   url: 'https://google.com',
//   urlToImage: 'https://via.placeholder.com/160',
// };

function NewsList() {
  const [state, refetch] = useAsync(newsApi, [], false);
  const { loading, data: articles, error } = state;

  if (loading) return <NewsListBlock>로딩중...</NewsListBlock>;
  if (error) return <NewsListBlock>에러발생!</NewsListBlock>;
  if (!articles) return null;

  return (
    <NewsListBlock>
      <button onClick={refetch}>다시 불러오기</button>
      <div>
        {articles.map((article) => (
          <NewsItem key={article.url} article={article} />
        ))}
      </div>
      {/* <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} /> */}
    </NewsListBlock>
  );
}

export default NewsList;
