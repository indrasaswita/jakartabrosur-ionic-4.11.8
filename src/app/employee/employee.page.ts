import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import {GlobalsService} from "../globals.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  constructor(
  	private router: Router,
	  private global: GlobalsService
  ) { }

  ngOnInit() {
  	console.log(this.global.employees);
  }

}
