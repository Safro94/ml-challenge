const nodeFetch = require('node-fetch');

const fetch = async ({ url, headers, method = 'get' }) => {
  const res = await nodeFetch(url, {
    method,
    headers: {
      ...(headers || ''),
      'Content-Type': 'application/json',
    },
  });
  if (!res) return;

  const data = await res.json();
  return data || {};
};

module.exports = fetch;
