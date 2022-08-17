import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularMat';

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor( private dialog:MatDialog, private api:ApiService){
   
}

ngOnInit(): void {
  this.getAllUser();
}

  openDialog() {
   this.dialog.open(DialogComponent ,{
    width:'30%'
   }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getAllUser();
    }
   })

   
  }

  getAllUser(){
this.api.getUser()
.subscribe({
  next:(res)=>{
   this.dataSource=new MatTableDataSource(res);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort
  },
  error:(err)=>{
    alert("error while fetching data")
  }
})
  }

  editUser(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='Updated'){
        this.getAllUser();
      }
    })
    
  }

  deleteUser(id:number){
    this.api.deleteUser(id)
  .subscribe({
    next:(res)=>{
      alert("Deleted successfully")
      this.getAllUser();
    },
    error:()=>{
      alert(" Error while Deleting")
    }
    
  })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


