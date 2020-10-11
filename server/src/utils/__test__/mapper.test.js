const { mapResults, mapItemDetail } = require('../mapper');

describe('Mappers', () => {
  test('mapItemDetail should return an object mapped correctly', () => {
    //Arrange
    const pictures = [{ url: 'pic.jpg' }, { url: 'pic2.jpg' }]
    const item = getItem(pictures);
    const expectedResult = getMapItemDetailExpectedResult(pictures[0].url);

    //Act
    const result = mapItemDetail(item);

    //Assert
    expect(expectedResult).toEqual(result);
  });

  test('mapResults should return an object mapped correctly with empty categories', () => {
    //Arrange
    const results = getResults();
    const expectedResult = getMapResultsExpectedResult();

    //Act
    const result = mapResults(results);

    //Assert
    expect(expectedResult).toStrictEqual(result);
  });

  test('mapResults should return an object mapped correctly with categories when the filter has an id category', () => {
    //Arrange
    const filters = getFilters();
    const results = getResults(filters);

    const expectedCategories = getExpectedCategories();
    const expectedResult = getMapResultsExpectedResult(expectedCategories);

    //Act
    const result = mapResults(results);

    //Assert
    expect(expectedResult).toStrictEqual(result);
  });

  test('mapResults should return an object mapped correctly with empty categories when the filter does not have an id category', () => {
    //Arrange
    const filters = getFilters('brand');
    const results = getResults(filters);
    const expectedResult = getMapResultsExpectedResult();

    //Act
    const result = mapResults(results);

    //Assert
    expect(expectedResult).toStrictEqual(result);
  });
});

const getItem = (pictures = []) => ({
  id: 1,
  title: 'title',
  currency_id: 'ars',
  price: 100.1,
  thumbnail: 'a.jpg',
  pictures,
  condition: 'new',
  shipping: {
    free_shipping: true,
  },
  sold_quantity: 50,
  plain_text: 'description'
});

const getExpectedItem = (picture) => ({
  id: 1,
  title: 'title',
  price: {
    currency: 'ars',
    amount: 100,
    decimals: 1,
  },
  picture: picture || 'a.jpg',
  condition: 'new',
  free_shipping: true,
});

const getMapItemDetailExpectedResult = (picture) => ({
  author: {
    name: 'Matias',
    lastname: 'Safranchik',
  },
  item: {
    ...getExpectedItem(picture),
    sold_quantity: 50,
    description: 'description'
  },
});

const getFilters = (id = 'category') => ([
  {
    id,
    values: [
      {
        path_from_root: [
          { name: 'category 1' },
          { name: 'category 2' }
        ]
      }
    ]
  }
])

const getResults = (filters = []) => ({
  results: [
    {
      ...getItem()
    }
  ],
  filters
});

const getExpectedCategories = () => ([
  'category 1', 'category 2'
]);

const getMapResultsExpectedResult = (categories = []) => ({
  author: {
    name: 'Matias',
    lastname: 'Safranchik',
  },
  categories,
  items: [
    {...getExpectedItem()}
  ]
}); 