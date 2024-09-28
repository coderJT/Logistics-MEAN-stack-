import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListDriversByDepartmentComponent } from './list-drivers-by-department/list-drivers-by-department.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authenticationGuard } from './guards/authentication.guard';  
import { TranslateDescriptionComponent } from './translate-description/translate-description.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';
import { DistanceComponent } from './distance/distance.component';

export const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: 'add-driver', component: AddDriverComponent, canActivate: [authenticationGuard] },
    { path: 'list-drivers', component: ListDriversComponent, canActivate: [authenticationGuard] },
    { path: 'list-drivers-by-department', component: ListDriversByDepartmentComponent, canActivate: [authenticationGuard] },
    { path: 'delete-driver', component: DeleteDriverComponent, canActivate: [authenticationGuard] },
    { path: 'update-driver', component: UpdateDriverComponent, canActivate: [authenticationGuard] },
    { path: 'add-package', component: AddPackageComponent, canActivate: [authenticationGuard] },
    { path: 'list-packages', component: ListPackagesComponent, canActivate: [authenticationGuard] },
    { path: 'delete-package', component: DeletePackageComponent, canActivate: [authenticationGuard] },
    { path: 'update-package', component: UpdatePackageComponent, canActivate: [authenticationGuard] },
    { path: 'statistics', component: StatisticsComponent, canActivate: [authenticationGuard] },
    { path: 'invalid-data', component: InvalidDataComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },  
    { path: 'translate-description', component: TranslateDescriptionComponent },
    { path: 'text-to-speech', component: TextToSpeechComponent },
    { path: 'distance', component: DistanceComponent },
    { path: '**', component: PageNotFoundComponent },
];
