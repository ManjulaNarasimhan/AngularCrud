import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';  //, OnChanges, SimpleChanges
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service'; 

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit { //onChanges

  private _employee: Employee;
  @Input() employee: Employee;
  @Output() notify: EventEmitter<string>;
  @Output() notifyDelete: EventEmitter<number>;
  confirmDelete = false;
  @Input() searchTerm:string;
  selectedEmployeeId: number;
  // @Input()
  // set employee(val: Employee){
  //   console.log('Previous' + (this._employee?.name));
  //   this._employee = val;
  //   console.log('Current' + val.name)
  // }
  // get employee(): Employee{
  //   return this._employee;
  // }
  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService ) { 
    this.notify = new EventEmitter<string>();
    this.notifyDelete = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  // ngOnChanges(changes: SimpleChanges){
  //   console.log(changes);
  // }

  @HostListener('click',['$events'])
  handleClick(){
    console.log("display component" + this.employee.name);
   // this.notify.emit(this.employee.name);
  }  
  
  viewEmployee(){
    this._router.navigate(['/employees',this.employee.id],
    {queryParams: {'searchTerm': this.searchTerm}})
  }

  editEmployee(){
    this._router.navigate(['/edit',this.employee.id]);
  }

  deleteEmployee(){
    // this._employeeService.delete(this.employee.id);

    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`The employee ${this.employee.id} was deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(+this.employee.id);
  }
}
