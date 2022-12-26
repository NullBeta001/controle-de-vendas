import { HttpParams, HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { PageModel } from "./page.model";


export class EntityService<T> {

  constructor(
    protected http: HttpClient,
    protected utilsService: UtilsService,
    public entityUrl: string
  ) {
    this.http = http;
    this.utilsService = utilsService;
    this.entityUrl = entityUrl;

    this.defaultCatch = this.defaultCatch.bind(this);
  }

  public getListQueryParams(listParams?: ListParams) {
    if (listParams) {
      let { page = 0, size = 10, sort = [], filterQuery = "", orderBy } = listParams;

      let params = new HttpParams();

      if (sort && sort.length) {
        params = params.append(
          "orderby",
          sort
            .map(s => {
              let order = "";
              if (s.order === 1) order = " asc";
              else if (s.order === -1) order = " desc";
              return `${s.field}${order}`;
            })
            .join(", ")
        );
      }
      if (filterQuery) params = params.append("filter", filterQuery);

      params = params.append("size", String(size));
      params = params.append("page", String(page));
      if (orderBy) {
        params = params.append("orderby", String(orderBy));
      }

      return params;
    } else {
      let filterQuery = '';
      const params = {} as any;
      params.filter = filterQuery;
      return params;
    }
  }

  public defaultCatch() {
    return catchError((err: any) => {
      if (err) {
        this.doError(err);
      }
      this.doError(err);
      return throwError(err);
    });
  }

  public doError(err: any) {
    debugger
    const genericError =
      "Erro no servidor, tente novamente em alguns minutos.";
    let detail = genericError;
    if (err.error && err.error.errors) {
      detail = err.error.errors.map((e: any) => e.message).join(', ');
    } else if (err.error && err.error.msg) {
      detail = err.error && err.error.msg;
    }
    this.utilsService.addMessage('error', detail, err.status);
  }

  public list(listParams?: ListParams): Observable<PageModel<T>> {
    return this.http
      .get<PageModel<T>>(this.entityUrl, {
        params: this.getListQueryParams(listParams)
      })
      .pipe(this.defaultCatch()) as any;
  }

  public get(id: any) {
    return this.http
      .get<T>(`${this.entityUrl}/${id}`)
      .pipe(this.defaultCatch());
  }

  public insert(entity: T) {
    return this.http
      .post<T>(`${this.entityUrl}`, entity)
      .pipe(this.defaultCatch());
  }

  public update(id: string, entity: T) {
    return this.http
      .put<T>(`${this.entityUrl}/${id}`, entity)
      .pipe(this.defaultCatch());
  }

  public delete(id: string) {
    return this.http
      .delete<T>(`${this.entityUrl}/${id}`)
      .pipe(this.defaultCatch());
  }

  public formatDatetime(date: Date) {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
}

export interface ListParams {
  page?: number;
  size?: number;
  sort?: any[];
  filterQuery?: string;
  orderBy?: string;
}

export interface BodyParams {
  offset?: number;
  size?: number;
  orderBy?: string;
  filter?: string;
}

export enum FilterType {
  STRING, DATETIME, SELECT, LOOKUP, PRICE, BOOLEAN, NUMBER
}

export interface FilterSelectOptions {
  key: string;
  name: string;
}

export interface FilterLookupOptions {
  service: any,
  searchField: string,
  field?: string;
  seccondaryField?: string;
  seccondaryLabel?: string;
  filter?: string;
}

export enum FilterSequence {
  LEFT = 'EQLESS', RIGHT = 'EQMORE', EQUALS = 'EQ'
}
