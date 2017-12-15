import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {BlogService} from "../../shared/services/blog.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-blog-post-edit',
  templateUrl: './blog-post-edit.component.html',
  styleUrls: ['./blog-post-edit.component.scss']
})
export class BlogPostEditComponent implements OnInit {


  text: string;
  returnUrl: string;
  bsDatePickercolorTheme = 'theme-red';
  bsDatePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private blogService: BlogService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.bsDatePickerConfig = Object.assign({}, { containerClass: this.bsDatePickercolorTheme });
  }

  onFormSubmit(passedForm: FormGroup) {
    if(passedForm.valid){
      const date = new Date(passedForm.value.publish);
      const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.blogService.createPost(passedForm.value.title,
                                  passedForm.value.content,
                                  dateStr).subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
          this.alertService.success('You have successfully created a new post')
        },
        (err) => {
          const alerts = this.alertService.jsonToHtmlList(err);
          this.alertService.error(alerts);
        }

      );

    }
  }

}
