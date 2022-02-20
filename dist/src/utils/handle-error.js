var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable max-classes-per-file */
export class CreateWarriorValidationError extends Error {
}
export class ArenaValidationError extends Error {
}
export class NotFoundError extends Error {
}
export function handleError(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (err instanceof CreateWarriorValidationError) {
            res
                .status(400)
                .render('warrior/error', {
                error: err.message,
            });
        }
        else if (err instanceof ArenaValidationError) {
            res
                .status(400)
                .render('arena/error', {
                error: err.message,
            });
        }
        else if (err instanceof NotFoundError) {
            res
                .status(404)
                .render('arena/error');
        }
        else {
            res
                .status(500)
                .render('error');
        }
    });
}
//# sourceMappingURL=handle-error.js.map