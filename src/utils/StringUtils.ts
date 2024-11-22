
export class StringUtils {

  public static async containsText(variables:(string|null|undefined)[], text:string):Promise<boolean> {
    return variables.some(variable => variable?.includes(text));
  }
}
