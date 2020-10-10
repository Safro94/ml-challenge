const notFound = require('../notFound');
const { mockReq, mockRes } = require('../../testUtils/helpers');

describe('Not found', () => {
it('should set the status to 404 and call next with the error', () => {
    // Arrange
    const next = jest.fn();
    const req = mockReq({
      originalUrl: '/test'
    });
    const res = mockRes();
    const errorMessage = new Error(`Not found ${req.originalUrl}`);

    // Act
    notFound(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});