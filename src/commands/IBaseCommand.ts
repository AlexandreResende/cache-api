import EventEmitter from 'events';

export interface IBaseCommand {
  execute(events: EventEmitter, payload?: object): Promise<void | boolean>;
}