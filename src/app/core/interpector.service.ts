import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import { Router } from "@angular/router";
import { LocalstorageService } from "../shared/services/localstorage/localstorage.service";

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return new Observable(observer => {
      const token = this.localStorageService.get(LocalstorageService.KEY_STORAGE.token);
      //const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZlZmRjMjY2LTE3YzEtNDE2Yy04MWQxLTY1ZjZlYjA4MWI4MCIsIm5hbWUiOiJEYW5pZWwiLCJlbWFpbCI6ImRhbmllbC5odWViZXNAZ21haWwuY29tIiwidXNlcm5hbWUiOiJkYW5pZWxAdGVzdCIsImVuYWJsZSI6dHJ1ZSwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsInNjaGVtYSI6InRlc3QiLCJpYXQiOjE2NzA4ODYzNTcsImV4cCI6MTY3MDk1ODM1N30.Y0xm0Ak49-s038T75m3odqPh2lOSq9byPl2zAk7VKms`;
      if (token) {
        req = req.clone({
          setHeaders: {
            'x-api-key': token as any
          }
        });
      }
      const subscription = next.handle(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            observer.next(event);
          }
        },
        err => {
          if (err.status === 403) {
            localStorage.clear();
            this.router.navigate(['/auth']);
          }
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
