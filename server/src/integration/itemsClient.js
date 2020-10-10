const fetch = require('../utils/fetch');

const getItems = async query => {
  const data = await fetch({
    url: `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}`,
  });

  return data;
};

module.exports = {
  getItems,
};
