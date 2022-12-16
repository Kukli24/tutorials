import { Component, Inject } from "@angular/core";
import { Button, EventData, ItemEventData } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { FlickService } from "~/app/core";
import { BarcodeScanner } from "nativescript-barcodescanner";

@Component({
  moduleId: module.id,
  selector: "ns-home",
  templateUrl: "home.component.html",
})
export class HomeComponent {
  flicks = this.flickService.getFlicks();
  barcodescanner = new BarcodeScanner();
  constructor(
    private routerExtensions: RouterExtensions,
    private flickService: FlickService
  ) {}

  onFlickTap(args: ItemEventData): void {
    this.routerExtensions.navigate(["details", this.flicks[args.index].id]);
  }
  scanBarCode() {
    this.barcodescanner
      .scan({
        formats: "QR_CODE,PDF_417", // Pass in of you want to restrict scanning to certain types
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        showFlipCameraButton: true, // default false
        preferFrontCamera: false, // default false
        showTorchButton: true, // default false
        beepOnScan: true, // Play or Suppress beep on scan (default true)
        fullScreen: true, // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
        torchOn: false, // launch with the flashlight on (default false)
        closeCallback: function () {
          console.log("Scanner closed");
        }, // invoked when the scanner was closed (success or abort)
        resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        orientation: "landscape", // Android only, optionally lock the orientation to either "portrait" or "landscape"
        openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
      })
      .then(
        function (result) {
          console.log("Scan format: " + result.format);
          console.log("Scan text:   " + result.text);
        },
        function (error) {
          console.log("No scan: " + error);
        }
      );
  }
  onTap(args: EventData) {
    const button = args.object as Button;
    this.scanBarCode();
    // execute your custom logic here...
  }

  onScanResult(args: EventData) {
    console.log(args)
  }
}
