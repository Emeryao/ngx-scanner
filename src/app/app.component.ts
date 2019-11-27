import { Component } from '@angular/core';
import { HoneyScannerService } from 'honey-scanner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HoneyScannerService],
})
export class AppComponent {
    public title: string = 'honey-scanner';

    public constructor(
        private scanner: HoneyScannerService,
    ) {
        this.scanner.onScan(90).subscribe({
            next: e => {
                // tslint:disable-next-line: no-console
                console.log('SCAN RESULT: ', e);
            },
        });
    }

    public ngOnDestroy(): void {
        this.scanner.dispose();
    }
}
