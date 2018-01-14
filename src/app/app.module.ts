import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { AppStorage } from './../providers/storage/app';
import { AuthProvider } from './../providers/auth/auth';
import { LabelProvider } from './../providers/label/label';
import { JournalProvider } from './../providers/journal/journal';
import { UtilsProvider } from './../providers/utils';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthPage } from './../pages/auth/auth';
import { JournalPage } from './../pages/journal/journal';
import { JournalCreatePage } from './../pages/journal/create/journal-create';
import { LabelPopoverPage } from './../pages/journal/create/label/label';
import { JournalViewPage } from './../pages/journal/view/journal-view';
import { OptionPopoverPage } from './../pages/home/option/option';
import { LogoutPopoverPage } from './../pages/auth/logout/logout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    JournalPage,
    JournalCreatePage,
    LabelPopoverPage,
    JournalViewPage,
    OptionPopoverPage,
    LogoutPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    OptionPopoverPage,
    LogoutPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppStorage,
    JournalProvider,
    LabelProvider,
    AuthProvider,
    UtilsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
