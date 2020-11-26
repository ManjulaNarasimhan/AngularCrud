import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  previewPhoto: boolean = false;
  panelTitle: string;
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  departments : Department[] = [
    { id:1, name: 'Help Desk' },
    { id:2, name: 'HR'},
    { id:3, name: 'IT' },
    { id:4, name: 'Payroll' },
    { id:5, name: 'Admin' }
  ];

  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department: '-1',
    isActive: null,
    photoPath:null
  }

  constructor(private _employeeService:EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
   }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap =>{
      const empId = +parameterMap.get('id');
      this.getEmployee(empId);
    })
  }

  private getEmployee(id:number){
    if(id === 0){
        this.employee = {
          id: null,
          name: null,
          gender: null,
          contactPreference: null,
          phoneNumber: null,
          email: null,
          dateOfBirth: null,
          department: '-1',
          isActive: null,
          photoPath:null
        };
        this.panelTitle = "Create Employee";
        this.createEmployeeForm?.reset();
      }else{
        this.panelTitle = "Edit Employee";
       // this.employee = Object.assign({},this._employeeService.getEmployeeById(id));
       this._employeeService.getEmployeeById(id).subscribe(
        emp => this.employee = emp,
        err => console.log(err)      
       )
    }
  }

  saveEmployee(){
   // const newEmp: Employee = Object.assign({}, this.employee);
   if(this.employee.id === null){
    this._employeeService.addEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.createEmployeeForm?.reset();
        this._router.navigate(['list']);
      }
    ),
    error => {console.log(error)};  
   }else{
     console.log('update called');
    this._employeeService.updateEmployee(this.employee).subscribe(
      () => {
        this.createEmployeeForm?.reset();
        this._router.navigate(['list']);
      }
    ),
    error => {console.log(error)};  
   }
  }

  togglePreview() {
    this.previewPhoto = !this.previewPhoto;
  }
}
