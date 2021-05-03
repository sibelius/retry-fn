import { retryFn } from '../retryFn';

jest.useFakeTimers();

it('should resolve first at first call when using retry', async () => {
  const fn = jest.fn(async () => ({}));

  const p = retryFn(fn);

  jest.runAllTimers();

  await p;

  expect(fn.mock.calls.length).toBe(1);
});

it('should resolve on second call', async () => {
  const fn = jest.fn();

  fn
    .mockImplementationOnce(async () => {
    throw new Error('something failed');
  })
    .mockImplementationOnce(async () => {
    });

  const p = retryFn(fn);

  jest.runAllTimers();
  await p;

  expect(fn.mock.calls.length).toBe(2);
});
