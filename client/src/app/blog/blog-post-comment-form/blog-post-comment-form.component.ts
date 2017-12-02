import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-blog-post-comment-form',
  templateUrl: './blog-post-comment-form.component.html',
  styleUrls: ['./blog-post-comment-form.component.scss']
})
export class BlogPostCommentFormComponent implements OnInit {

  @Input() showCancelButton = true;
  @Output() content = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<boolean>();
  myForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      reply : [null, Validators.required],
    });
  }

  onFormSubmit() {
    if(this.myForm.valid){
      this.content.emit(this.myForm.value.reply);
      this.myForm.controls['reply'].setValue(null);
    }
  }

  onCancelReply(){
    this.cancel.emit(true);
    this.myForm.controls['reply'].setValue(null);
  }

}
