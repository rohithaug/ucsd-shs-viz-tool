const services = require('../../../src/app/services/index');

describe('services', () => {
  test('should export analyticsService', () => {
    expect(services.analyticsService).toBeDefined();
  });

  test('should export blogService', () => {
    expect(services.blogService).toBeDefined();
  });

  test('should export trackerService', () => {
    expect(services.trackerService).toBeDefined();
  });

  test('should export adminService', () => {
    expect(services.adminService).toBeDefined();
  });
});