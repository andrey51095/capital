// backup.test.js
const backup = require('../backup');

// Мокируем модели и схемы
const mockModel = {
  find: jest.fn(),
};

describe('Backup function', () => {
  it('should create a backup of the data from all schemas', async () => {
    // Мокируем контекст с двумя схемами
    const context = {
      schemas: {
        User: mockModel,
        Product: mockModel,
      },
    };

    // Мокируем данные, которые возвращает метод find
    mockModel.find.mockResolvedValueOnce([{ id: 1, name: 'John Doe' }]); // Для User
    mockModel.find.mockResolvedValueOnce([{ id: 1, name: 'Laptop' }]); // Для Product

    const result = await backup(null, null, context, null);

    // Преобразуем строку JSON обратно в объект для проверки
    const parsedResult = JSON.parse(result);

    // Проверяем, что результат содержит данные для обеих схем
    expect(parsedResult.User).toEqual([{ id: 1, name: 'John Doe' }]);
    expect(parsedResult.Product).toEqual([{ id: 1, name: 'Laptop' }]);

    // Проверяем, что метод find был вызван для обеих моделей
    expect(mockModel.find).toHaveBeenCalledTimes(2);
    expect(mockModel.find).toHaveBeenCalledWith({});
  });

  it('should handle empty data from schemas', async () => {
    // Мокируем схемы с пустыми результатами
    const context = {
      schemas: {
        User: mockModel,
        Product: mockModel,
      },
    };

    mockModel.find.mockResolvedValueOnce([]); // Пустой массив для User
    mockModel.find.mockResolvedValueOnce([]); // Пустой массив для Product

    const result = await backup(null, null, context, null);
    const parsedResult = JSON.parse(result);

    // Проверяем, что результат пустой для обеих схем
    expect(parsedResult.User).toEqual([]);
    expect(parsedResult.Product).toEqual([]);
  });

  it('should return an empty object when no schemas are provided', async () => {
    // Мокируем контекст без схем
    const context = {
      schemas: {},
    };

    const result = await backup(null, null, context, null);

    // Ожидаем, что результат будет пустым объектом
    expect(result).toBe('{}');
  });
});
