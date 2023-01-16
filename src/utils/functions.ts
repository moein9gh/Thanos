export const getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

export const getRandomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const updateQueryBuilder = (tableName, entity, condition): string => {
  let query = "UPDATE users";

  delete entity.id;
  Object.keys(entity).forEach((key, index, total) => {
    if (index === 0) {
      query += " SET ";
    }
    if (typeof entity[key] === "number" || entity[key] === null) {
      query += `${key} = ${entity[key]} `;
    } else {
      query += `${key} = '${entity[key]}' `;
    }

    if (index !== total.length - 1) {
      query += ", ";
    }
  });
  query += condition + ";";
  return query;
};
