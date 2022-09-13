import { FooterComponent } from './library/shared-components/footer/footer.component';
import { cvReducer } from './state/CV-State/cv.reducer';
import { SharedComponentsModule } from './library/shared-components/shared-components.module';
import { NavbarComponent } from './library/shared-components/navbar/navbar.component';
import { PagesModule } from './pages/pages.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppErrorHandlerService } from 'src/app-error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    PagesModule,
    SharedComponentsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      easing: 'ease-in',
      maxOpened: 1,
      autoDismiss: true,
    }),
    BrowserAnimationsModule,
    StoreModule.forRoot({
      cvState: cvReducer,
    }),
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandlerService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
