import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeeList } from './resolved-employee-list.model';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList>{
    
    constructor(private _employeeService: EmployeeService){};

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList>{
        return this._employeeService.getEmployees()
                .pipe(
                    map((empList) => new ResolvedEmployeeList(empList)),
                    catchError((err:any) => of(new ResolvedEmployeeList(null, err)))
                );
    }
}