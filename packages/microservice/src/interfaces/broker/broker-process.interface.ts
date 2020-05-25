
export interface IBrokerProcess {
    [key: string]: {
        handle<T>(data: T): void;
    };
}