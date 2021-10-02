
import { EventEmitter } from "events";
import { IBaseCommand } from "../commands/IBaseCommand";

export interface ICommandFactory {
  create(events: EventEmitter): Promise<IBaseCommand>;
}
