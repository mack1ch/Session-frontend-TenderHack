export interface ISetting {
  id: number;
  title: string;
  description: string;
  value: boolean;
  type: "main" | "other";
}
