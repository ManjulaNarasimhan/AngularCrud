import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// import { of } from 'rxjs/add/observable/of';

@Injectable()

export class EmployeeService{

    baseUrl:string = 'http://localhost:3000/employees';
    // private listEmployees: Employee[] = [
    //     {
    //     id:1,
    //     name:'Beautiful Lady',
    //     gender:'Female',
    //     contactPreference:'Email',
    //     phoneNumber:34562764,
    //     email:'lady@abc.com',
    //     dateOfBirth:new Date('10/26/1988'),
    //     department:'2',
    //     isActive:true,
    //     photoPath:'assets/images/sharu.jpg'
    //   },
    //   {
    //     id:2,
    //     name:'Handsome Boy',
    //     gender:'Male',
    //     contactPreference:'Email',
    //     phoneNumber:978465323,
    //     email:'boy@abc.com',
    //     dateOfBirth:new Date('1/2/1999'),
    //     department:'3',
    //     isActive:true,
    //     photoPath:'assets/images/shan.jpg'
    //   }
    // ];

    constructor(private _httpClient: HttpClient){

    }

    getEmployees(): Observable<Employee[]>{
     // return of(this.listEmployees).pipe(delay(2000));
     return this._httpClient.get<Employee[]>(this.baseUrl)
              .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse){
      if(errorResponse.error instanceof ErrorEvent){
        console.error('CientSide', errorResponse.error.message);
      }else{
        console.log('Server side', errorResponse);
      }
      return throwError('There is a problem with  a service');
    }

    // getEmployee(): Employee[]{
    //     return this.listEmployees;
    // }

    getEmployeeById(employeeId: number): Observable<Employee>{
      return this._httpClient.get<Employee>(`${this.baseUrl}/${employeeId}`)
              .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee):Observable<Employee>{
        return this._httpClient.post<Employee>(this.baseUrl,
                                employee, {
                                headers: new HttpHeaders({
                                  'content-Type':'application/json'
                                })
        })
        .pipe(catchError(this.handleError));
        // const maxId = Math.max(...this.listEmployees.map(a=>a.id));
        // employee.id = maxId+1;
        // this.listEmployees.push(employee);
      // }else{
      //   const findIndex = this.listEmployees.findIndex(e=> e.id === employee.id);
      //   this.listEmployees[findIndex] = employee;
      // }
    }

    updateEmployee(employee: Employee):Observable<void>{
      console.log('update method');
        return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`,
                                employee, {
                                headers: new HttpHeaders({
                                  'content-Type':'application/json'
                                })
        })
        .pipe(catchError(this.handleError));      
    }

    deleteEmployee(id:number): Observable<void>{
      // const index = this.listEmployees.findIndex(e=> e.id === id);
      // if(index !== -1){
      //   this.listEmployees.splice(index, 1)
      // }
      return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));

    }
};