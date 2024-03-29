"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var environment_1 = require("../global/environment");
var http_1 = __importDefault(require("http"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = require("socket.io")(this.httpServer), {
            cors: {
                origin: true,
                credentials: true
            },
        };
        this.escucharSockets();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this);
        },
        enumerable: false,
        configurable: true
    });
    Server.prototype.escucharSockets = function () {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', function (cliente) {
            console.log('Cliente conectado');
        });
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback());
    };
    return Server;
}());
exports.default = Server;
