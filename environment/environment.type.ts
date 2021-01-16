export interface Environment {
  autoInstance: boolean;
  api: {
    port: number;
  };
  crypto: {
    algorithm: string;
    secret: string;
  };
}
