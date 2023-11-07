export function isValidCnpj(value: string | undefined): boolean {
  const convertToArray = (cnpj: string) => {
    const arrayString = cnpj?.split("");

    const tempValues: Array<number> = [];
    arrayString?.forEach((item) => {
      tempValues.push(parseInt(item));
    });

    return tempValues;
  };

  if (value) {
    const cnpj = value?.replace(/[^\d]+/g, "");

    const numbers = convertToArray(cnpj);

    if (numbers.length !== 14) return false;

    const removeEqual = numbers.filter(function (ele: number, pos: number) {
      return numbers.indexOf(ele) === pos;
    });

    if (removeEqual.length === 1) return false;

    const calc = (x: any) => {
      const slice = numbers.slice(0, x);
      let factor = x - 7;
      let sum = 0;

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i];
        sum += n * factor--;
        if (factor < 2) factor = 9;
      }

      const result = 11 - (sum % 11);

      return result > 9 ? 0 : result;
    };

    const digits = numbers.slice(12);

    const digit0 = calc(12);
    if (digit0 !== digits[0]) return false;

    const digit1 = calc(13);
    return digit1 === digits[1];
  }
  return false;
}
