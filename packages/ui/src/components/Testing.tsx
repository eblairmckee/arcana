import React from "react";

export type TestingProps = {
  name: string;
};

export const Testing = ({ name }: TestingProps) => {
  return <div>Testing {name}</div>;
};
