import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthPage } from './../pages/auth/auth';
import { JournalPage } from './../pages/journal/journal';
import { JournalCreatePage } from './../pages/journal/create/journal-create';
import { LabelPopoverPage } from './../pages/journal/create/label/label';
import { JournalViewPage } from './../pages/journal/view/journal-view';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    JournalPage,
    JournalCreatePage,
    LabelPopoverPage,
    JournalViewPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    JournalPage,
    JournalCreatePage,
    LabelPopoverPage,
    JournalViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
