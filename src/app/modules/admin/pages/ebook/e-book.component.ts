import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Book } from 'src/app/core/interfaces/book';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-e-book',
  templateUrl: './e-book.component.html',
  styleUrls: ['./e-book.component.css'],
})
export class EBookComponent implements OnInit {
  saveImg: string = '';

  AddBook: FormGroup = new FormGroup({
    bookName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    authorName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    price: new FormControl(null, [Validators.required]),
    delivaryPrice: new FormControl(null),
    publisherName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64),
    ]),
    publicationDate: new FormControl(null, [Validators.required]),
    editionOfBook: new FormControl(null, [Validators.required]),
    numberOfCovers: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    bookSize: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    pdf: new FormControl(null, [Validators.required]),
  });

  constructor(
    private booksService: BooksService,
    private categoryService: CategoryService
  ) {}

  // get image added
  image: any;
  getImage(event: any) {
    this.image = event.target.files[0];
  }



   submitImageData() {
    let formData = new FormData();
    formData.set('image', this.image);

    this.booksService.uploadBookImage(formData).subscribe({
      next: (res) => {
        this.saveImg = res.filename;
        
        this.AddBook.patchValue({
          image: this.saveImg,
        });
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }


  // get file that added
  file: any;
  getFile(event: any) {
    this.file = event.target.files[0];
  }

  // send file data to database ,, save file name in variable to use

  fileName: string = '';
  submitData() {
    let formData = new FormData();
    formData.set('pdf', this.file);
    this.booksService.uploadBookPfd(formData).subscribe({
      next: (res) => {
        this.fileName = res.filename;
        this.AddBook.patchValue({
          pdf: this.fileName,
        });
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }



  handelAddBook(addBookForm: FormGroup) {
    if (addBookForm.valid) {
      this.booksService.addBook(addBookForm.value).subscribe({        
        next: () => {
          alert('تم اضافه الكتاب');
          this.ngOnInit(); // Refresh the list of categories
          addBookForm.reset(); // Reset the form
          this.fileName = '';
        },
        error: (err) => {
          console.log('Error adding category:', err);
        },
      });
    }
  }

  // get all Book

  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';

  ngOnInit(): void {
    this.checkData();
    this.get_category();
  }

  // delete one Book
  onDeleteProdect(id: string) {
    this.booksService.deleteBook(id).subscribe({
      next: (res) => {
        alert('تم حذف الكتاب بنجاح');
        this.checkData();
      },
      error: (err) => {
        console.log('Error fetching Book data:', err);
      },
    });
  }

  // get all books after doing any change
  Book: Book[] = [];

  checkData() {
    this.booksService.getAllBooks().subscribe({
      next: (res) => {
        this.Book = res.data;
        // console.log(res.data[0]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  category: any[] = [];

  get_category() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
