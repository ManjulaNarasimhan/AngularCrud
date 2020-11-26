import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { AccordionComponent } from './shared/accordion.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'edit/:id', component:CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService]},
  {path:'list', component:ListEmployeesComponent, resolve: {employeeList: EmployeeListResolverService}},
  {path:'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService]},
  {path:'notfound', component: PageNotFoundComponent},
  {path:'', redirectTo: '/list', pathMatch:'full'}
];

@NgModule({
  declarations: [
    ListEmployeesComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    PageNotFoundComponent,
    EmployeeFilterPipe,
    AccordionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) //, {enableTracing:true}
  ],
  providers: [
    CreateEmployeeCanDeactivateGuardService, 
    EmployeeListResolverService,
    EmployeeDetailsGuardService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
