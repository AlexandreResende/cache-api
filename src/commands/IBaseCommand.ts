export interface IBaseCommand {
  execute(payload?: object): Promise<void | boolean>;
}