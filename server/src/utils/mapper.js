const mapCategories = filters => {
  const categories = filters.find(filter => filter.id.toLowerCase() === 'category');
  if (!categories) return [];

  return categories.values[0].path_from_root.map(category => category.name);
};

/*  
  Tuve que agregar el address para la localidad que muestra cada producto
  a la derecha en la lista de productos, a pesar de que el ejercicio no decia
  que habia que devolver una propiedad address en el enunciado
*/
const mapItem = result => {
  const [amount, decimals] = result.price.toString().split('.');

  return {
    id: result.id,
    title: result.title,
    price: {
      currency: result.currency_id,
      amount: parseInt(amount, 10),
      decimals: parseInt(decimals, 10),
    },
    picture: result.pictures && result.pictures.length ? result.pictures[0].url : result.thumbnail,
    condition: result.condition,
    free_shipping: result.shipping.free_shipping,
    address: result.seller_address.state.name
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
