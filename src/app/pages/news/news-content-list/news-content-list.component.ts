import { Component, OnInit } from '@angular/core';
import {
  ErrorExcptionResult,
  FilterModel,
  NewsContentService,
} from 'ntk-cms-api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-content-list',
  templateUrl: './news-content-list.component.html',
  styleUrls: ['./news-content-list.component.css'],
})
export class NewsContentListComponent implements OnInit {
  filterModelContent = new FilterModel();
  dataModelResult: ErrorExcptionResult<any> = new ErrorExcptionResult<any>();

  constructor(private newsContentService: NewsContentService) {}

  ngOnInit(): void {
    this.getContentList();
  }
  getContentList(): void {
    this.filterModelContent.AccessLoad = true;
    this.newsContentService.baseUrl = environment.configApiServerPath;
    this.newsContentService
      .ServiceGetAll(this.filterModelContent)
      .subscribe((res) => {
        this.dataModelResult = res;
      });
  }
}
