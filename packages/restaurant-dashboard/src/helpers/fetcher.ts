const fetcher = async (...args: any) => {
  const data = await fetch(args);
  return await data.json();
};

export default fetcher;
