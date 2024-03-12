const adminService = require('../../../src/app/services/admin.service');
const adminModel = require('../../../src/app/models/admin.model');
const httpStatus = require('http-status');
const apiError = require('../../../src/app/utils/apiError');

describe('Admin Service', () => {
    describe('createAdmin', () => {
        it('should throw an error if email is already taken', async () => {
            const adminBody = {
                email: 'test@example.com',
                password: 'password',
                name: 'Test Admin'
            };

            adminModel.isEmailTaken = jest.fn().mockResolvedValue(true);

            await expect(adminService.createAdmin(adminBody)).rejects.toThrow(apiError);
            expect(adminModel.isEmailTaken).toHaveBeenCalledWith(adminBody.email);
        });

        it('should throw an error if there is an issue creating the admin', async () => {
            const adminBody = {
                email: 'test@example.com',
                password: 'password',
                name: 'Test Admin'
            };

            adminModel.isEmailTaken = jest.fn().mockResolvedValue(false);
            adminModel.create = jest.fn().mockRejectedValue(new Error('Database error'));

            await expect(adminService.createAdmin(adminBody)).rejects.toThrow(apiError);
            expect(adminModel.isEmailTaken).toHaveBeenCalledWith(adminBody.email);
            expect(adminModel.create).toHaveBeenCalledWith(adminBody);
        });
    });

    describe('validateAdmin', () => {
        it('should validate an existing admin', async () => {
            const adminBody = {
                email: 'test@example.com',
                password: 'password'
            };

            const admin = {
                email: 'test@example.com',
                password: 'password',
                name: 'Test Admin'
            };

            adminModel.findOne = jest.fn().mockResolvedValue(admin);

            const result = await adminService.validateAdmin(adminBody);

            expect(adminModel.findOne).toHaveBeenCalledWith({ email: adminBody.email, password: adminBody.password });
            expect(result).toEqual(admin);
        });

        it('should throw an error if admin is not found', async () => {
            const adminBody = {
                email: 'test@example.com',
                password: 'password'
            };

            adminModel.findOne = jest.fn().mockResolvedValue(null);

            await expect(adminService.validateAdmin(adminBody)).rejects.toThrow(apiError);
            expect(adminModel.findOne).toHaveBeenCalledWith({ email: adminBody.email, password: adminBody.password });
        });

        it('should throw an error if there is an issue validating the admin', async () => {
            const adminBody = {
                email: 'test@example.com',
                password: 'password'
            };

            adminModel.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

            await expect(adminService.validateAdmin(adminBody)).rejects.toThrow(apiError);
            expect(adminModel.findOne).toHaveBeenCalledWith({ email: adminBody.email, password: adminBody.password });
        });
    });
});