import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-zebra';


// ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');

 printBarcode = async (serial:any) => {
    try {

        // Create a new instance of the object
        const browserPrint =  new ZebraBrowserPrintWrapper();

        // Select default printer
        const defaultPrinter =  await browserPrint.getDefaultPrinter();
        console.log(defaultPrinter);
        // Set the printer
        browserPrint.setPrinter(defaultPrinter);

        // Check printer status
        const printerStatus = await browserPrint.checkPrinterStatus();

        // Check if the printer is ready
        if(printerStatus.isReadyToPrint) {

            // ZPL script to print a simple barcode
            const zpl = `^XA
                        ^BY2,2,100
                        ^FO20,20^BC^FD${serial}^FS
                        ^XZ`;

            browserPrint.print(zpl);
        } else {
        console.log("Error/s", printerStatus.errors);
        }

    } catch (error:any) {
        throw new Error(error);
    }
};


}
