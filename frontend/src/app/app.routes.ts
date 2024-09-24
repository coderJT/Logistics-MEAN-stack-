import { Routes } from '@angular/router';
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

export const routes: Routes = [
    { path: 'add-driver', component: AddDriverComponent },
    { path: 'list-drivers', component: ListDriversComponent },
    { path: 'delete-driver', component: DeleteDriverComponent },
    { path: 'update-driver', component: UpdateDriverComponent },
    { path: 'add-package', component: AddPackageComponent },
    { path: 'list-packages', component: ListPackagesComponent },
    { path: 'delete-package', component: DeletePackageComponent },
    { path: 'update-package', component: UpdatePackageComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'invalid-data', component: InvalidDataComponent },
    { path: '**', component: PageNotFoundComponent },
];
