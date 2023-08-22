import visitorCount from "../visitorCount";

describe("visitorCount", () => {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const uniqueReq = {
    cookies: {},
  };

  const notUniqueReq = {
    cookies: {
      unique_visitor: true,
    },
  };

  it("should increment the visitor count if the user doesn't have a cookie", () => {
    // make 3 unique requests
    visitorCount(uniqueReq as any, res as any);
    visitorCount(uniqueReq as any, res as any);
    visitorCount(uniqueReq as any, res as any);

    // check the 3rd response
    expect(res.json.mock.calls[2][0]).toEqual({ visitorCount: 3 });
    expect(res.status).toHaveBeenCalledWith(200);
    console.log(res.json.mock.calls);
  });

  it("should not increment the visitor count if the user has a cookie", () => {
    // make 4th request
    visitorCount(notUniqueReq as any, res as any);

    // check the 4th response
    expect(res.json.mock.calls[3][0]).toEqual({ visitorCount: 3 });
    expect(res.status).toHaveBeenCalledWith(200);
    console.log(res.json.mock.calls);
  });

  it("should calculate the visitor count correctly", () => {
    // make 6 more requests - total of 10 in sequenial tests
    visitorCount(uniqueReq as any, res as any);
    visitorCount(uniqueReq as any, res as any);
    visitorCount(uniqueReq as any, res as any);
    visitorCount(notUniqueReq as any, res as any);
    visitorCount(notUniqueReq as any, res as any);
    visitorCount(uniqueReq as any, res as any);

    // check the 10th response
    expect(res.json.mock.calls[9][0]).toEqual({ visitorCount: 7 });
    expect(res.status).toHaveBeenCalledWith(200);
    console.log(res.json.mock.calls);
  });

  it("should set a cookie if the user doesn't have one", () => {
    visitorCount(uniqueReq as any, res as any);

    expect(res.setHeader).toHaveBeenCalledWith(
      "Set-Cookie",
      "unique_visitor=true; Max-Age=86400"
    );
  });
});
