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
exports.StartAllWhatsAppsSessions = void 0;
const queues_1 = require("../../queues");
const sendWork_1 = require("../../sendWork");
const ListWhatsAppsService_1 = __importDefault(require("../WhatsappService/ListWhatsAppsService"));
const StartWhatsAppSession_1 = require("./StartWhatsAppSession");
const StartAllWhatsAppsSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    const whatsapps = yield (0, ListWhatsAppsService_1.default)();
    if (whatsapps.length > 0) {
        whatsapps.forEach(whatsapp => {
            (0, StartWhatsAppSession_1.StartWhatsAppSession)(whatsapp);
        });
    }
    setTimeout(() => {
        (0, queues_1.startQueueProcess)();
    }, 5000);
    setTimeout(() => {
        (0, sendWork_1.runSendMessage)();
    }, 30000);
});
exports.StartAllWhatsAppsSessions = StartAllWhatsAppsSessions;
