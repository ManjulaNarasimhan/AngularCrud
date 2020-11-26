import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()

export class EmployeeDetailsGuardService implements CanActivate{
    constructor(private _employeeService: EmployeeService, private _router: Router){

    };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeService.getEmployeeById(+route.paramMap.get('id'))
                    .pipe(
                        map(
                            emp=>{
                                if(!!emp) {
                                    return true;
                                } else{
                                    this._router.navigate(['notfound']);
                                    return false;
                                }
                            }),
                        catchError(
                            err=> {console.error(err);
                            return of(false);
                            })
                        );
                       
        // const employeeExists =  !!this._employeeService.getEmployeeById(+route.paramMap.get('id'));
        // if(employeeExists)
        // return true;
        // else{
        //     this._router.navigate(['notfound']);
        //     return false;
        //}
      }
}