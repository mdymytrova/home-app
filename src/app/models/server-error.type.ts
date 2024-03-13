export type ServerErrorType = object & { errorMessage: string };

export type ServerErrorObjectType = {
  [key: string]: object & {
    errors: ServerErrorType[];
  };
};
