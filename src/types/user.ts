export interface User {
  id: string;
  name: string;
  email: string;
  gender?: "MALE" | "FEMALE" | "OTHER"; // Optional
  address?: string; // Optional
}
