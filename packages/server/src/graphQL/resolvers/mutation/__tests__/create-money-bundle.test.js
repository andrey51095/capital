// createMoneyBundle.test.js
const createMoneyBundle = require('../createMoneyBundle');

describe('createMoneyBundle', () => {
  let mockMoneyBundle;
  let mockFeed;
  let context;

  beforeEach(() => {
    // Мокируем методы модели MoneyBundle и Feed
    mockMoneyBundle = {
      create: jest.fn(),
    };
    mockFeed = {
      create: jest.fn(),
    };

    // Мокируем контекст
    context = {
      schemas: {
        MoneyBundle: mockMoneyBundle,
        Feed: mockFeed,
      },
    };
  });

  it('should create a MoneyBundle and a Feed entry', async () => {
    // Мокируем создание объекта MoneyBundle
    const mockMoneyBundleData = { amount: 1000, currency: 'USD' };
    const mockCreatedDoc = { id: '12345', ...mockMoneyBundleData };

    mockMoneyBundle.create.mockResolvedValue(mockCreatedDoc); // Мокируем успешное создание

    // Аргументы для функции
    const args = { amount: 1000, currency: 'USD' };

    // Вызываем функцию
    const result = await createMoneyBundle(null, args, context, null);

    // Проверяем, что метод create был вызван для MoneyBundle с правильными аргументами
    expect(mockMoneyBundle.create).toHaveBeenCalledWith(args);
    expect(mockMoneyBundle.create).toHaveBeenCalledTimes(1);

    // Проверяем, что метод create был вызван для Feed с правильными данными
    expect(mockFeed.create).toHaveBeenCalledWith({
      to: JSON.stringify(mockCreatedDoc),
    });
    expect(mockFeed.create).toHaveBeenCalledTimes(1);

    // Проверяем, что результат функции соответствует создаваемому документу
    expect(result).toEqual(mockCreatedDoc);
  });

  it('should handle errors when creating MoneyBundle', async () => {
    // Мокируем ошибку при создании MoneyBundle
    const errorMessage = 'Error creating MoneyBundle';
    mockMoneyBundle.create.mockRejectedValue(new Error(errorMessage));

    // Аргументы для функции
    const args = { amount: 1000, currency: 'USD' };

    // Проверяем, что функция выбрасывает ошибку
    await expect(createMoneyBundle(null, args, context, null)).rejects.toThrow(errorMessage);

    // Проверяем, что Feed.create не был вызван в случае ошибки
    expect(mockFeed.create).not.toHaveBeenCalled();
  });

  it('should handle errors when creating Feed', async () => {
    // Мокируем создание MoneyBundle
    const mockMoneyBundleData = { amount: 1000, currency: 'USD' };
    const mockCreatedDoc = { id: '12345', ...mockMoneyBundleData };
    mockMoneyBundle.create.mockResolvedValue(mockCreatedDoc);

    // Мокируем ошибку при создании Feed
    const errorMessage = 'Error creating Feed';
    mockFeed.create.mockRejectedValue(new Error(errorMessage));

    // Аргументы для функции
    const args = { amount: 1000, currency: 'USD' };

    // Проверяем, что функция выбрасывает ошибку при ошибке в Feed.create
    await expect(createMoneyBundle(null, args, context, null)).rejects.toThrow(errorMessage);
  });
});
