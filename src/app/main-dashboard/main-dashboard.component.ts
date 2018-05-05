import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
declare var $: any;

var self: any;

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
  providers: [CookieService]
})
export class MainDashboardComponent implements OnInit {
  headers: any;
  options: RequestOptions;
  studentData: any;
  tbl:any;

  email: string = "";
  name: string = "";
  password: string = "";
  currentId: string = "";

  constructor(private cookie: CookieService, private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.cookie.get('token'));
    this.options = new RequestOptions({ headers: this.headers });

  }

  ngOnInit() {
    self = this;
    $('#btnAdd').click(function () {
      $('#addModal').modal("show");
    });

    this.tbl = $('#table').DataTable({
      responsive: true,
      ajax: {
        url: 'http://localhost/MyLaravel/public/api/userDetails',
        dataSrc: 'success',
        headers: {
          'Authorization': 'Bearer ' + self.cookie.get('token')
        }
      },
      rowId: "id",
      columns: [
        {
          data: null, render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { data: 'name' },
        { data: 'email' },
        {
          data: null, render: function (data, type, row) {
            return  '<i data-group="grpEdit" class="fa fa-edit text-success pointer" style = "cursor: pointer;"></i> ' +
            '<i data-group="grpDelete" class="fa fa-remove text-danger pointer" style = "cursor: pointer;"></i>';
          }, className: "text-center"
        }
      ],
      drawCallback: function (settings) {
        self.bindTableEvents();
      }
    });
  }

  private bindTableEvents() {
    $("i[data-group=grpEdit]").off('click').click(function () {
        var rowId = $(this).closest('tr').attr('id');
        self.initializeUpdateForm(rowId);
    });

    $("i[data-group=grpDelete]").off('click').click(function () {
      self.currentId = $(this).closest('tr').attr('id');
      $("#deleteModel").modal('show');
  });
  }

  getData() {
    this.http.get("http://localhost/MyLaravel/public/api/userDetails", this.options).map((res: Response) => res.json())
      .subscribe(data => {
        console.log(data);
        this.studentData = data.success;
      });
  }

  addStudent() {
    var data = {
      'email': this.email,
      'password': this.password,
      'name': this.name,
      'c_password': this.password
    }

    this.http.post("http://localhost/MyLaravel/public/api/userRegister", data, this.options).map((res: Response) => res.json())
      .subscribe(data => {
        setTimeout(() => {
          this.getData();
          $("#addModal").modal('hide');
          this.tbl.ajax.reload();
        }, 1000);
      });
  }

  initializeUpdateForm(id: string) {
    this.currentId = id;
    this.http.get("http://localhost/MyLaravel/public/api/userDetail/" + id, this.options).map((res: Response) => res.json())
      .subscribe(data => {
        this.email = data.success.email;
        this.name = data.success.name;
        $("#updateModel").modal('show');
      });
  }

  updateStudent() {
    var data = {
      'email': this.email,
      'name': this.name
    }
    this.http.post("http://localhost/MyLaravel/public/api/updateUser/" + this.currentId, data, this.options).map((res: Response) => res.json())
      .subscribe(data => {
        setTimeout(() => {
          this.getData();
          $("#updateModel").modal('hide');
          this.tbl.ajax.reload();
          this.email = "";
          this.name = "";
          this.password = "";
        }, 1000);
      });
  }

  deleteStudent(){
    this.http.get("http://localhost/MyLaravel/public/api/deleteUser/" + this.currentId, this.options).map((res: Response) => res.json())
      .subscribe(data => {
        setTimeout(() => {
          this.getData();
          $("#deleteModel").modal('hide');
          this.tbl.ajax.reload();
          this.email = "";
          this.name = "";
          this.password = "";
        }, 1000);
      });
  }

}
