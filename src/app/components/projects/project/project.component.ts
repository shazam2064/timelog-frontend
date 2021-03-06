import { Component, OnInit } from '@angular/core';
import { TimelogService } from '../../../services/timelog.service';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public companyList;
  public userList;
  public projectList;
  newProject: FormGroup;
  validMessage: string = "";

  constructor(private timelogService: TimelogService) { }

  ngOnInit() {
    this.getUserList();
    this.getCompanyList();
    this.getProjectList();
    this.newProject = new FormGroup({
      name: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required)
    });
  }

  getCompanyList() {
    this.timelogService.getCompanies().subscribe(
      data => {
        this.companyList = data;
      },
      err => console.error(err),
      () => console.log('companies loaded')
    );
  }

  getProjectList() {
    this.timelogService.getProjects().subscribe(
      data => {
        this.projectList = data;
      },
      err => console.error(err),
      () => console.log('projects loaded')
    );
  }

  getUserList() {
    this.timelogService.getUsers().subscribe(
      data => {
        this.userList = data;
      },
      err => console.error(err),
      () => console.log('members loaded')
    );
  }

  submitProject() {
    if (this.newProject.valid) {
      this.validMessage = "Your project has been created!";
      this.timelogService.createProject(this.newProject.value).subscribe(
        data => {
          this.newProject.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      )
    } else {
      this.validMessage = "Please fill out the form before submitting!";
    }
  }


}
