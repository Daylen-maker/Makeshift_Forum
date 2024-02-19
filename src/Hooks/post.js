import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const baseUrl = 'http://localhost:2020';

const usePostRequest = (url, listenOnPageReset) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { reset } = useSelector((state) => state.user);

  const post = async (data) => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const res = await fetch(baseUrl + url, requestOptions);
      const jsonData = await res.json();
      setResponse(jsonData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reset?.page === listenOnPageReset && listenOnPageReset) {
      post();
    }
  }, [reset?.page, reset?.shouldReset]);

  return { response, error, isLoading, post };
};

export default usePostRequest;
