import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employee-list.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
 
  dataFromChild: string;
  employees: Employee[];
  employeeDisplay: Employee;
  filteredEmployees: Employee[];

  private _searchTerm: string;
  private arrayIndex = 1;
  error: string;

  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(val:string){
    this._searchTerm = val;
    this.filteredEmployees = this.filterEmployees(val);
  }

  constructor(
              private _router: Router,
              private _route: ActivatedRoute) { 
                //this.employees = this._route.snapshot.data['employeeList'];
                const resolvedEmployeeList:ResolvedEmployeeList = this._route.snapshot.data['employeeList'];
            
                if(resolvedEmployeeList.error == null){
                  this.employees = resolvedEmployeeList.employeeList;
                }else{
                  this.error = resolvedEmployeeList.error;
                }
                if(this._route.snapshot.queryParamMap.has('searchTerm')){
                  this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
                } else{
                  this.filteredEmployees = this.employees??[];
                }   
                console.log("Error::::::::::::",this.error);
              }

  handleNotify(eventData: string):void{
    console.log(eventData);
    this.dataFromChild = eventData;
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(emp=>emp.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  ngOnInit(): void {
   // this.employees = this._employeeService.getEmployee();
   // this._employeeService.getEmployees().subscribe(empList=> this.employees = empList)
   // this.employeeDisplay = this.employees[0];
    
  }

  // onClick(employeeId: number){
  //   this._router.navigate(['/employees', employeeId], {
  //     queryParams: {
  //       searchTerm:this.searchTerm,testParam:'testValue'
  //     }
  //   });
  // }

  changeEmployeeName(){
    this.employees[0].name = "Hoody";
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
    // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    // newEmployeeArray[0].name = 'Jordan';
    // this.employees = newEmployeeArray;
  }

  nextEmployee():void{
    if(this.arrayIndex <= 1){
      this.employeeDisplay = this.employees[this.arrayIndex];
      this.arrayIndex++;
    } else{
      this.employeeDisplay = this.employees[0];
      this.arrayIndex = 1;
    }
  }

  onDeleteNotification(id:number){
    const index = this.filteredEmployees.findIndex(e=> e.id === id);
    if(index !== -1){
      this.filteredEmployees.splice(index, 1)
    }
  }
}
