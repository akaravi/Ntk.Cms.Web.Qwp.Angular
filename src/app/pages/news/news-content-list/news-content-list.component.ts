import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import {
  ErrorExceptionResult,
  FilterModel,
  NewsContentService,
} from 'ntk-cms-api';
import { NewsDialogComponent } from '../news-dialog/news-dialog.component';

@Component({
  selector: 'app-news-content-list',
  templateUrl: './news-content-list.component.html',
  styleUrls: ['./news-content-list.component.css'],
  standalone: false,
  animations: []
})
export class NewsContentListComponent implements OnInit {
  filterModelContent = new FilterModel();
  dataModelResult: ErrorExceptionResult<any> = new ErrorExceptionResult<any>();

  constructor(
    private newsContentService: NewsContentService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  sanitizeHtml(html: string): SafeHtml {
    if (!html) return '';
    // Sanitize HTML and return as SafeHtml
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getPlainText(html: string): string {
    if (!html) return '';
    // Remove HTML tags and decode entities
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

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

  viewFullNews(item: any): void {
    this.dialog.open(NewsDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: {
        title: item.title,
        body: this.sanitizeHtml(item.bodyHtml || item.body),
      },
    });
  }
}
