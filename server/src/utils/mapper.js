const mapCategories = filters => {
  const categories = filters.find(filter => filter.id.toLowerCase() === 'category');
  if (!categories) return [];

  return categories.values[0].path_from_root.map(category => category.name);
};

const mapItem = result => {
  const [amount, decimals] = result.price.toString().split('.');

  return {
    id: result.id,
    title: result.title,
    price: {
      currency: result.currency_id,
      amount: parseInt(amount || 0, 10),
      decimals: parseInt(decimals || 0, 10),
    },
    picture: result.thumbnail,
    condition: result.condition,
    free_shipping: result.shipping.free_shipping,
  };
};

const mapItems = results => results.map(result => mapItem(result));

const mapAuthor = () => ({
  name: 'Matias',
  lastname: 'Safranchik',
});

const mapResults = data => ({
  author: mapAuthor(),
  categories: data.filters.length ? mapCategories(data.filters) : [],
  items: mapItems(data.results),
});

const mapItemDetail = item => ({
  author: mapAuthor(),
  item: {
    ...mapItem(item),
    sold_quantity: item.sold_quantity,
    description: item.plain_text,
  },
});

module.exports = {
  mapResults,
  mapItemDetail,
};
