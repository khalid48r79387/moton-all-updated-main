import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/core/interfaces/category';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  saveImg: string = '';

  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
  });

  constructor(private categoryService: CategoryService) {}

  // get image added
  image: any;
  getImage(event: any) {
    this.image = event.target.files[0];
  }

  submitImageData() {
    let formData = new FormData();
    formData.set('image', this.image);

    this.categoryService.uploadImage(formData).subscribe({
      next: (res) => {
        console.log(res);
        
        this.saveImg = res.filename;
        
        this.addCategoryForm.patchValue({
          image: this.saveImg,
        });
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }

  handelAddCategory(addCategoryForm: FormGroup) {
    if (addCategoryForm.valid) {
      this.categoryService
        .addCategory(addCategoryForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            
            alert('تم اضافة الفئة بنجاح');
            this.ngOnInit(); // Refresh the list of categories
            this.addCategoryForm.reset(); // Reset the form
          },
          error: (err) => {
            // Handle the error
            console.log('Error adding category:', err);
          },
        });
    }
  }

  // get all category

  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.checkData();
  }

  // delete one category
  onDeleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('تم حذف الفئة بنجاح');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Error fetching category data:', err);
      },
    });
  }

  // get all category after doing any change
  categories: Category[] = [];
  checkData() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
