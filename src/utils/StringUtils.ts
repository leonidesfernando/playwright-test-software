
export class StringUtils {

  public static async containsText(variables:(string|null|undefined)[], text:string):Promise<boolean> {
    return variables.some(variable => variable?.includes(text));
  }

  public static async parseCurrencyBR(value: string): Promise<number> {
    return parseFloat(
      value
      .replace('R$', '')   // remove currency symbol
      .replace(/\./g, '') // remove thousand separators
      .replace(',', '.') // convert decimal comma to dot
      .trim()
    );
  }

  public static async normalizeCategory(category:string):Promise<string>{
    return category.toUpperCase().replace(/\./g, '_');
  }
}
