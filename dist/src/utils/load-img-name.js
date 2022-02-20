var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
export function loadImgName(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const filesName = yield readdir(path);
        const imgName = yield Promise.all(filesName.map((e) => __awaiter(this, void 0, void 0, function* () {
            const fileStat = yield stat(join(path, e));
            if (fileStat.isFile()) {
                const fileExtname = extname(e).toLowerCase();
                if (fileExtname === '.jpg' || fileExtname === '.webp' || fileExtname === '.jpeg' || fileExtname === '.png') {
                    return e;
                }
            }
            return '';
        })));
        return imgName.filter((e) => e);
    });
}
//# sourceMappingURL=load-img-name.js.map