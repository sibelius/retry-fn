export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// TODO - prefer an expotential backoff strategy
export const delays = [
  2 * 10 * 1000, // 20 seconds
  4 * 10 * 1000, // 40 seconds
  8 * 10 * 1000, // 80 seconds
];

export const retryFn = async (fn) => {
  let currentDelay = 0;

  while (true) {
    try {
      const val = await fn();

      return val;
    } catch (err) {
      console.log('retrying');
    }

    if (currentDelay > delays.length) {
      break;
    }

    const timeToWait = delays[currentDelay++];

    await delay(timeToWait);
  }
}
