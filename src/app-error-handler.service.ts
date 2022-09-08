import { DefaultGlobalConfig, ToastrService } from 'ngx-toastr';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector, private ngZone: NgZone) {}

  handleError(error: any): void {
    if (
      error.error instanceof HttpErrorResponse ||
      (error['rejection'] && error['rejection'] instanceof HttpErrorResponse)
    ) {
      const httpError: HttpErrorResponse = error['rejection']
        ? error['rejection']
        : error;
      if (!navigator.onLine) {
        // Handle offline error
        // this.router.navigate(['noInternet']);
      } else {
        // Handle Http Error (error.status === 403, 404...)
        console.log(httpError);
        if (httpError.status === 404) {
          this.showToastr('Not Found')
        } else if(httpError.status === 400) {
          this.showToastr(httpError.error.message);
        } else if(httpError.status === 500) {
          this.showToastr('Something went wrong');
        } else {
          this.showToastr('Something went wrong!!');
        }
      }
    }

    console.error(error);
  }

  showToastr(msg: string) {
    this.ngZone.run(() => {
      const toastr = this.injector.get(ToastrService);
      toastr.error(msg, '', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        closeButton: true,
        easing: 'ease-in',
      });
    });
  }
}
