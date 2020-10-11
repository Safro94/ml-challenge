const mapCategories = categories => categories.map(category => category.name);

const mapFilters = filters => {
  const categories = filters.find(filter => filter.id.toLowerCase() === 'category');
  if (!categories) return [];

  return mapCategories(categories.values[0].path_from_root) 
};

/*  
  Tuve que agregar el address para la localidad que muestra cada producto
  a la derecha en la lista de productos, a pesar de que el ejercicio no decia
  que habia que devolver una propiedad address en el enunciado. 
  Por otro lado tuve que agregar category_id para poder obtener las categorias
  y armar el breadcrumb cuando se entra directamente a un producto por url
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
    address: result.seller_address.state.name,
    category_id: result.category_id
  };
};

const mapAuthor = () => ({
  name: 'Matias',
  lastname: 'Safranchik',
});

const mapResults = data => ({
  author: mapAuthor(),
  categories: data.filters.length ? mapFilters(data.filters) : [],
  items: data.results.map(result => mapItem(result)),
});

/*
  En relacion al comentario de arriba, aca tuve que agregar categories
  para poder armar el breadcrumb en la vista de detalle del producto
  a pesar de que en el enunciado no ponia una propiedad categories
  para el detalle del producto
*/
const mapItemDetail = (item, categories) => ({
  author: mapAuthor(),
  categories: mapCategories(categories.path_from_root),
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
