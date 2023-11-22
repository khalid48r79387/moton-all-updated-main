import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category/category.service';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { Category } from 'src/app/core/interfaces/category';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Cart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  cart: Cart = {
    cartItems: [
      {
        _id: '',
        book: '',
        bookDetails: {
          bookName: '',
          image: '',
          type: '',
        },
        price: 0,
        quantity: 0,
      },
    ],
    totalCartPrice: 0,
    _id: '',
  };

  public categories: Category[] | undefined;
  public arabicCategories: Category[] | undefined;
  public englishCategories: Category[] | undefined;
  public arabicPaperCategories: Category[] | undefined;
  public arabicElectronicCategories: Category[] | undefined;
  public englishPaperCategories: Category[] | undefined;
  public englishElectronicCategories: Category[] | undefined;

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService,
    private cartService: CartService
  ) {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res.data;
      this.arabicCategories = this.categories?.filter(
        (c) => c.language === 'arabic'
      );
      this.arabicPaperCategories = this.arabicCategories?.filter(
        (ac) => ac.type === 'paper'
      );
      this.arabicElectronicCategories = this.arabicCategories?.filter(
        (ac) => ac.type === 'electronic'
      );
      this.englishCategories = this.categories?.filter(
        (c) => c.language === 'english'
      );
      this.englishPaperCategories = this.englishCategories?.filter(
        (ec) => ec.type === 'paper'
      );
      this.englishElectronicCategories =
        this.englishCategories?.filter(
          (ec) => ec.type === 'electronic'
        );
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  getUserCart(): void {
    this.cartService.getUserCart().subscribe((res) => {
      if (res && res.status == 'success') {
        this.cart = res.data;        
      }
    });
  }

  removeItemFromCart(bookId: string): void {
    this.cartService.removeFromCart(bookId).subscribe((res) => {
      if (res && res.status == 'success') {
        this.cart = res.data;        
      }
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe((res) => {
      this.cart = {
        cartItems: [
          {
            _id: '',
            book: '',
            bookDetails: {
              bookName: '',
              image: '',
              type: '',
            },
            price: 0,
            quantity: 0,
          },
        ],
        totalCartPrice: 0,
        _id: '',
      };
    });
  }

  increment(value: any, i: any, itemId: string) {
    const initValue = 0;
    let finalValue: number;
    if (value != null) {
      const afterClick = value + 1;

      finalValue = this.cart.cartItems[i].quantity = afterClick;
      this.cartService
        .updateUserCart(itemId, finalValue)
        .subscribe((response) => {
          this.cart = response.data;
        });
      return (this.cart.cartItems[i].quantity = afterClick);
    } else {
      finalValue = this.cart.cartItems[i].quantity = initValue + 1;
      this.cartService
        .updateUserCart(itemId, finalValue)
        .subscribe((response) => {
          this.cart = response.data;
        });
      return (this.cart.cartItems[i].quantity = initValue + 1);
    }
  }

  decrement(value: any, i: any, itemId: string) {
    const initValue = 1;
    let finalValue: number;

    if (value > 1) {
      const afterClick = value - 1;

      finalValue = this.cart.cartItems[i].quantity = afterClick;
      this.cartService
        .updateUserCart(itemId, finalValue)
        .subscribe((response) => {
          this.cart = response.data;
        });
      return (this.cart.cartItems[i].quantity = afterClick);
    } else {
      finalValue = this.cart.cartItems[i].quantity = initValue;
      this.cartService
        .updateUserCart(itemId, finalValue)
        .subscribe((response) => {
          this.cart = response.data;
        });
      return (this.cart.cartItems[i].quantity = initValue);
    }
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
