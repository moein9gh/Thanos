import swaggerJsdoc from "swagger-jsdoc";
import { CONFIG } from "@config";
import { inject, injectable } from "inversify";
import { TYPES } from "@types";

@injectable()
export class DocGenerator {
  public doc: object;

  constructor(@inject(TYPES.APP_CONFIG) private cfg: CONFIG) {
    this.doc = swaggerJsdoc(cfg.jsDocOptions);
  }
}
