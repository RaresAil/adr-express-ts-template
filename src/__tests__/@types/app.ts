export interface Response {
  success: boolean;
}

export interface GetDemoResponse extends Response {
  test: string;
  queryData: any;
}

export interface PostDemoResponse extends Response {
  data: string;
  someParameter: string;
  bodyFromPost: any;
}

export interface DeleteDemoResponse extends Response {
  id: string;
}
