
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { AppStorage } from './../providers/storage/app';
import { LabelProvider } from './../providers/label/label';
import { JournalProvider } from './../providers/journal/journal';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthPage } from './../pages/auth/auth';
import { JournalPage } from './../pages/journal/journal';
import { JournalCreatePage } from './../pages/journal/create/journal-create';
import { LabelPopoverPage } from './../pages/journal/create/label/label';
import { JournalViewPage } from './../pages/journal/view/journal-view';
import { OptionPopoverPage } from './../pages/home/option/option';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    JournalPage,
    JournalCreatePage,
    LabelPopoverPage,
    JournalViewPage,
    OptionPopoverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    JournalPage,
    JournalCreatePage,
    LabelPopoverPage,
    JournalViewPage,
    OptionPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppStorage,
    JournalProvider,
    LabelProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
