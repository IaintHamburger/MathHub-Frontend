import queryString from "query-string";

export const buildQueryString = (params: object) => {
  // 過濾掉空物件 {}
  const filteredParams: any = {};
  Object.keys(params).forEach((key) => {
    const value = params[key as keyof typeof params];
    // 跳過 null、undefined、空字串和空物件
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(typeof value === "object" && Object.keys(value).length === 0)
    ) {
      // 如果是物件類型（但不是陣列），轉換為 JSON 字串
      if (typeof value === "object" && !Array.isArray(value)) {
        filteredParams[key] = JSON.stringify(value);
      } else {
        filteredParams[key] = value;
      }
    }
  });

  return queryString.stringify(filteredParams, {
    skipNull: true,
    skipEmptyString: true,
  });
};
