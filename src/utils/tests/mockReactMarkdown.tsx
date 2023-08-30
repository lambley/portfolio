import React from "react";

const MockReactMarkdown = ({ children }: { children: string }) => {
  return <div data-testid="mock-markdown">{children}</div>;
};

export default MockReactMarkdown;
