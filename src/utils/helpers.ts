import IRequestOptions from '../models/IRequestOptions';
import IResponseAPI from '../models/IResponseAPI';

export async function fetchCreateItem(
  url: string,
  options: IRequestOptions
): Promise<IResponseAPI> {
  const response = await fetch(url, options);
  const body = await response.json();
  return body;
}
