import { EventEmitter } from 'events';
import { Subject } from 'rxjs';
import { ITransferData } from '../../../src/interfaces/transfer-data';
import { TransferDataDto } from '../../../src/interfaces/transfer-data-dto.interface';
import { filter, tap } from 'rxjs/operators';

export class Nats extends EventEmitter {

    private bus: Subject<ITransferData<TransferDataDto>> = new Subject();

    connect() {
        setTimeout(() => {
            this.emit('connect');
        }, 100);
        return this;
    }

    publish(topic: string, data: string) {
        this.bus.next(JSON.parse(data));
    }

    subscribe(topic: string, callback) {
        this.bus.asObservable().pipe(
            filter(filter => `${filter.context}-${filter.action}` === topic),
            tap((result) => callback(JSON.stringify(result)))
        ).subscribe();
    }

    close() {
        this.bus.complete();
    }

}
