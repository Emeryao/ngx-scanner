import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export class HoneyScannerService {

    private keyEventSubscription?: Subscription;

    private chunk: string = '';

    private lastTimestamp: number = 0;

    private result: Subject<string> = new Subject<string>();

    public onScan(): Observable<string> {
        this.keyEventSubscription = fromEvent<KeyboardEvent>(document, 'keypress').subscribe({
            next: e => {
                if (this.lastTimestamp == 0 || e.timeStamp - this.lastTimestamp < 9) {
                    if (e.key != 'Enter') {
                        this.chunk += e.key;
                        this.lastTimestamp = e.timeStamp;
                    } else {
                        this.result.next(this.chunk);
                        this.chunk = '';
                        this.lastTimestamp = 0;
                    }
                } else if (e.timeStamp - this.lastTimestamp > 9) {
                    this.chunk = e.key;
                    this.lastTimestamp = e.timeStamp;
                }
            },
        });
        return this.result.asObservable();
    }

    public dispose(): void {
        this.chunk = '';
        this.lastTimestamp = 0;
        if (this.keyEventSubscription) {
            this.keyEventSubscription.unsubscribe();
        }
    }

}
