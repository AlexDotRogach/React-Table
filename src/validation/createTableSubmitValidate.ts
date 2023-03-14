export const createTableSubmitValidate: (arrStr: string[]) => boolean = (
  arrStr: string[]
) => {
  for (const str of arrStr) {
    if (!(!str || !isNaN(+str))) return true;
  }

  return false;
};
