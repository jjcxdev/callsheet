export const walkieChanelPlaceholers: { [key: string]: string } = {
  production: "1",
  transport: "3",
  props: "4",
  open: "2",
  camera: "6",
  electric: "7",
  grip: "8",
  fx: "9",
  stunts: "13",
};

export function getWalkieChannelPlaceholder(department: string): string {
  const normalizedDept = department.toLowerCase();
  return walkieChanelPlaceholers[normalizedDept] || "Enter channel";
}
