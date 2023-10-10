export const truncateStr = (str: string, left: number, right: number) => {
  const leftStr = str.slice(0, left);
  const rightStr = str.slice(-right);
  return `${leftStr}...${rightStr}`;
};

export const truncatePubkey = (pubkey: string) => {
  return truncateStr(pubkey, 6, 6);
};
