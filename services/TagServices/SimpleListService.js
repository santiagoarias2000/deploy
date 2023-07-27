"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Tag_1 = __importDefault(require("../../models/Tag"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const ListService = ({ searchParam }) => __awaiter(void 0, void 0, void 0, function* () {
    let whereCondition = {};
    if (searchParam) {
        whereCondition = {
            [sequelize_1.Op.or]: [
                { name: { [sequelize_1.Op.like]: `%${searchParam}%` } },
                { color: { [sequelize_1.Op.like]: `%${searchParam}%` } }
            ]
        };
    }
    const tags = yield Tag_1.default.findAll({
        where: whereCondition,
        order: [["name", "ASC"]],
        include: [{
                model: Ticket_1.default,
                as: 'tickets',
            }],
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
            include: [[sequelize_1.Sequelize.fn("COUNT", sequelize_1.Sequelize.col("tickets.id")), "ticketsCount"]]
        },
        group: [
            "Tag.id",
            "tickets.TicketTag.tagId",
            "tickets.TicketTag.ticketId",
            "tickets.TicketTag.createdAt",
            "tickets.TicketTag.updatedAt",
            "tickets.id"
        ]
    });
    return tags;
});
exports.default = ListService;
