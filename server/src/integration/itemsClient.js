const fetch = require('../utils/fetch');

const getItems = async query => {
  const data = await fetch({
    url: `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}`,
  });

  return data;
};

const getItemById = async id => {
  const endpoint = `${process.env.MELI_API_URL}/items/${id}`;

  const getItem = () => fetch({ url: endpoint });

  const getItemDescription = () => fetch({ url: `${endpoint}/description` });

  const [item, description] = await Promise.all([
    getItem(),
    getItemDescription(),
  ]);

  return { ...item, ...description };
};

module.exports = {
  getItems,
  getItemById,
};
