import { useState } from 'react';

const usePostRequest = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const post = async (data) => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      const res = await fetch(url, requestOptions);
      const jsonData = await res.json();
      setResponse(jsonData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, post };
};

export default usePostRequest;
