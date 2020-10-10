const mockReq = params => {
  const req = { ...params };
  return req;
};

const mockRes = params => {
  const res = { ...params };
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  
  return res;
};

module.exports = {
  mockReq,
  mockRes,
};