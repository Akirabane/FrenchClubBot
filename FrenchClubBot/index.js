"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const discord_js_1 = __importStar(require("discord.js"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const vrchat = __importStar(require("vrchat"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('FrenchBot is activated !');
    new wokcommands_1.default(client, {
        commandDir: path_1.default.join(__dirname, 'commands'),
        featureDir: path_1.default.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['your_id'],
        botOwners: ['your_id'],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true,
        }
    });
}));
const configuration = new vrchat.Configuration({
    username: "YourUsername",
    password: "YourPass",
    apiKey: "API",
    baseOptions: {
        headers: {
            Cookie: 'apiKey=API'
        }
    }
});
const authApi = new vrchat.AuthenticationApi(configuration);
const usersApi = new vrchat.UsersApi(configuration);
const worldsApi = new vrchat.WorldsApi(configuration);
let ready = false;
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Login VRChat API
        const { data } = yield authApi.getCurrentUser();
        // Verify VRChat 2FA
        if (!data.displayName) {
            if (process.env.VRC_2FACODE && process.env.VRC_2FACODE.length > 0) {
                const { data } = yield authApi.verify2FA({ code: process.env.VRC_2FACODE });
                if (!data.verified) {
                    throw new Error('2FA code is invalid');
                }
                else {
                    console.log('VRC API logged in.');
                    ready = true;
                }
            }
            else {
                throw new Error('VRC_2FACODE is required to login');
            }
        }
        else {
            console.log('VRC API logged in.');
            ready = true;
        }
    }
    catch (error) {
        console.log('VRC API login Error.');
        if (axios_1.default.isAxiosError(error)) {
            const err = error;
            console.log((_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
        }
        else {
            const err = error;
            console.log(err.message);
        }
    }
});
init();
client.login(process.env.TOKEN);
