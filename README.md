# HoneyScanner 🐝  
a service to get the string from the Honeywell scanner HH450  

## Installation

```sh
$ npm install @byzan-libs/honey-scanner
```

## Usage
```typescript
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [HoneyScannerService],
})
export class MainComponent implements OnDestroy {

    public constructor(
        private scanner: HoneyScannerService,
    ) {
        this.scanner.onScan().subscribe({
            next: e => {
                // scan result here
                console.log(e);
            },
        });
    }

    public ngOnDestroy(): void {
        this.scanner.dispose();
    }

}
```

## Tips
* the service will not working if a component is navigated by a `a[routerLink]` since the ***enter*** key from the scanner is missing after a `a[routerLink]` navigation so try to use a `div[routerLink]` instead  
* it is recommended to provide the service in a component instead of a module
* do not forget to `dispose`
