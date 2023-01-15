import swaggerJsdoc from "swagger-jsdoc";
import {CONFIG} from "@config";


export class DocGenerator {
    public doc : object;
    constructor(cfg: CONFIG) {
        this.doc = swaggerJsdoc(cfg.jsDocOptions);
    }
}