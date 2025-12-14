const buildRoute = (
  route: string,
  params: {
    [key: string]: string;
  },
): string => {
  if (!route && !params) {
    return route;
  }

  let outputRoute = route;
  Object.entries(params).forEach(([param, value]) => {
    if (value) {
      outputRoute = outputRoute.replaceAll(`:${param}`, value.toString());
    } else if (outputRoute.includes(param)) {
      // eslint-disable-next-line no-console
      console.error(`required route param ${param} not found.`);
    }
  });
  return outputRoute;
};

export default buildRoute;
