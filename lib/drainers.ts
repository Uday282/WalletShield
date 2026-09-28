type Drainer = {
  address: string;
  name: string;
};

export const knownDrainers: Drainer[] = [];

export function isKnownDrainer(
  address: string
) {

  return knownDrainers.find(
    (d) =>
      d.address.toLowerCase() ===
      address.toLowerCase()
  );
}