import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/core/interfaces/book';
import { PublisherServiceService } from 'src/app/core/Publisher/publisher-service.service';
import { CategoryService } from 'src/app/core/services/category/category.service';


@Component({
  selector: 'app-publisher-book',
  templateUrl: './publisher-book.component.html',
  styleUrls: ['./publisher-book.component.css']
})
export class PublisherBookComponent implements OnInit {

   
  constructor(
    private PublisherService :PublisherServiceService,
    private categoryService: CategoryService
    ) {}
  publisher_Name: string=''; // Define a variable to store the retrieved data

  ngOnInit(): void {
    const userDataJson = sessionStorage.getItem('authUser');
      if (userDataJson) {
      this.publisher_Name = JSON.parse(userDataJson).name;
      console.log(this.publisher_Name);
    } else {
      console.log('User data not found in sessionStorage');
    }

    this.checkData();
    this.get_category();
  }

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
    // publisherName: new FormControl(null, [
    //   Validators.required,
    //   Validators.minLength(2),
    //   Validators.maxLength(64),
    // ]),
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

  // get image added
  image: any;
  getImage(event: any) {
    this.image = event.target.files[0];
  }



   submitImageData() {
    let formData = new FormData();
    formData.set('image', this.image);

    this.PublisherService.uploadBookImage(formData).subscribe({
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
    this.PublisherService.uploadBookPfd(formData).subscribe({
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
      const formData = {
        ...this.AddBook.value,
        publisherName: this.publisher_Name
      };
      this.PublisherService.addBook(formData).subscribe({        
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


  // delete one Book
  onDeleteProdect(id: string) {
    this.PublisherService.deleteBook(id).subscribe({
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
    this.PublisherService.getAllBooks().subscribe({
      next: (res) => {
        this.Book=[];
        let Copy_book = res.data;
        
        for (let index = 0; index < Copy_book.length ; index++) {
          if(Copy_book[index].publisherName == this.publisher_Name){
            this.Book.push(Copy_book[index])              
          }
        }
        console.log(this.Book.length);
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
