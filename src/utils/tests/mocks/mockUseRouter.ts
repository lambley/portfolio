export const mockPortfolioUseRouter = (props: Record<string, any> = {}) => ({
  query: { portfolioId: "1" },
  push: jest.fn(),
  back: jest.fn(),
  pathname: "",
  asPath: "",
  ...props,
});
