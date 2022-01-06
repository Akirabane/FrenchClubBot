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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const vrchat = __importStar(require("vrchat"));
exports.default = {
    category: 'Statistiques',
    description: 'Vous donne les statistiques du FrenchClub !',
    slash: true,
    testOnly: true,
    callback: ({}) => __awaiter(void 0, void 0, void 0, function* () {
        const configuration = new vrchat.Configuration({
            username: "your_username",
            password: "your_pass",
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
        const FrenchClub = yield worldsApi.getWorld("world_id");
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(FrenchClub.data.name)
            .setColor("RANDOM")
            .setDescription("Voici les statistiques actuelles de la map !")
            .setAuthor(`Gérant actuel : ${FrenchClub.data.authorName}`)
            .setThumbnail(FrenchClub.data.thumbnailImageUrl)
            .addFields([
            {
                name: 'Visites total :',
                value: `${FrenchClub.data.visits} joueurs.`,
                inline: true
            },
            {
                name: 'Tendance actuelle :',
                value: `${FrenchClub.data.heat}/5 flammes.`,
                inline: true
            },
            {
                name: 'Favoris totaux :',
                value: `${FrenchClub.data.favorites} favoris.`,
                inline: true
            }
        ])
            .setFooter("Les informations sont synchronisées avec VRChat.\n")
            .setTimestamp();
        return embed;
    }),
};
