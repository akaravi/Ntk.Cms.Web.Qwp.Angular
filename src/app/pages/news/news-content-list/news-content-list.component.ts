import { Component, OnInit } from '@angular/core';
import {
  ErrorExceptionResult,
  FilterModel,
  NewsContentService,
} from 'ntk-cms-api';

@Component({
    selector: 'app-news-content-list',
    templateUrl: './news-content-list.component.html',
    styleUrls: ['./news-content-list.component.css'],
    standalone: false
})
export class NewsContentListComponent implements OnInit {
  filterModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<any> = new ErrorExceptionResult<any>();

  constructor(private newsContentService: NewsContentService) {}

  ngOnInit(): void {
    this.getContentList();
  }
  getContentList(): void {
    this.filterModelContent.accessLoad = true;
    this.newsContentService
      .ServiceGetAll(this.filterModelContent)
      .subscribe((res) => {
        this.dataModelResult = res;
      });
  }
}
