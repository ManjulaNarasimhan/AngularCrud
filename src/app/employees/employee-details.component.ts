import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id: number;
  constructor(private _router: ActivatedRoute, private _employeeService: EmployeeService, private _route:Router ) { }

  ngOnInit(): void {
    this._router.paramMap.subscribe(params=>{
      this._id = +params.get('id');
     // this.employee = this._employeeService.getEmployeeById(this._id);
     this._employeeService.getEmployeeById(this._id).subscribe(
       (emp) => this.employee = emp,
       (err) => {console.error(err);}
     );
    });
  }

    viewNextEmployee(){
      if(this._id < 2)
         this._id++;
      else
        this._id = 1;
        
      this._route.navigate(['/employees',this._id], {
        queryParamsHandling: 'preserve'
      });
    }

}
