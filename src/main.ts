import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
  console.log("Outgoing request");
  console.log(request);  

  // const reqModify = request.clone({
  //   headers: request.headers.set('X-DEBUG','TESTING')
  // });
  // console.log(request);  
  // return next(reqModify);

  return next(request);
}

bootstrapApplication(AppComponent, { 
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
  )] 
}).catch(
  (err) => console.error(err)
);
