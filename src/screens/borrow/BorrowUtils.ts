/**
 * Validates if the amount falls within any of the valid ranges.
 * Returns true if valid, or an error message string if not.
 *
 * @param {Array<{min: string, max: string}>} ranges
 * @param {string | number} amount
 * @returns {true | string}
 */
export const validateAmountWithRanges = (ranges, amount) => {
  if (!Array.isArray(ranges) || ranges.length === 0) {
    return 'No ranges are available.';
  }

  try {
    const amountBigInt = BigInt(amount);

    const isInRange = ranges.some(({ min, max }) => {
      const minVal = BigInt(min);
      const maxVal = BigInt(max);
      return amountBigInt >= minVal && amountBigInt <= maxVal;
    });

    if (isInRange) return true;

    // Sort ranges by min value
    const sortedRanges = ranges
      .map(({ min, max }) => ({
        min: BigInt(min),
        max: BigInt(max),
      }))
      .sort((a, b) => (a.min < b.min ? -1 : 1));

    // Find nearest range min > input
    const nearestMin = sortedRanges.find(r => amountBigInt < r.min)?.min;

    // Format all available ranges
    const rangeText = sortedRanges
      .map(r => `${r.min.toString()} to ${r.max.toString()}`)
      .join(', ');

    const nearestText = nearestMin
      ? ` Nearest available offer from ${nearestMin.toString()}.`
      : '';

    return `No offers available for this amount.${nearestText} Available ranges: ${rangeText}`;
  } catch (err) {
    console.error('Invalid input or range format:', err);
    return 'Invalid input.';
  }
};

export const getFiateValue = async (value, symbol = 'BTC') => {
  try {
    const response = await fetch(
      `https://api.orangemarketcap.com/coins/fiat?symbol=${symbol}&fiat_currency=USD`
    );
    const data = await response.json();
    const price = data?.[symbol];
    if (price) {
      return value * price;
    }
    return null;
  } catch (error) {
    console.error('Error fetching fiat value:', error);
    return null;
  }
};

export function formatDueDate(isoString : string) {
  const date = new Date(isoString);

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const time = `${hours}:${minutes}${ampm}`;

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); //
  const year = date.getFullYear();

  return `${time} • ${day}/${month}/${year}`;
}

export function getRawRuneAmount(amount: number, divisibility: number): string {
  const factor = Math.pow(10, divisibility);
  const rawAmount = amount * factor;

  // Optional: validate that rawAmount is an integer
  if (!Number.isInteger(rawAmount)) {
    throw new Error("Amount must be a valid number for given divisibility");
  }

  return rawAmount.toString();
}

